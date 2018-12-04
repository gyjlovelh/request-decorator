/**
 * Created by guanyj on  2018/11/21
 */
export const pathParamSymbolKey = Symbol.for('common:pathParam');
export const queryParamSymbolKey = Symbol.for('common:queryParam');
export const bodyParamSymbolKey = Symbol.for('common:bodyParam');

const Param = (symbolKey: symbol): Function => {
    return (paramName: string): Function => {
        return (target: any, propertyKey: string, paramIndex: number) => {
            const params = Reflect.getMetadata(symbolKey, target, propertyKey) || {};
            if (paramName) {
                params[paramName] = paramIndex;
            } else {
                if (symbolKey !== bodyParamSymbolKey) {
                    throw new Error(`注解参数为必填`);
                } else {
                    console.log('__body__', params);
                    params['__body__'] = paramIndex;
                }
            }
            Reflect.defineMetadata(symbolKey, params, target, propertyKey);
        };
    };
};

export const PathParam = Param(pathParamSymbolKey);
export const QueryParam = Param(queryParamSymbolKey);
export const BodyParam = Param(bodyParamSymbolKey);
