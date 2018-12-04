/**
 * Created by guanyj on  2018/11/21
 */
import {bodyParamSymbolKey, pathParamSymbolKey, queryParamSymbolKey} from './param';
import {httpMethodSymbolKey} from './http-method';


export const rootPathSymbolKey = Symbol.for('common:rootPath');
export const pathSymbolKey = Symbol.for('common:path');
export const methodsSymbolKey = Symbol.for('common:methods');

export const Path = (path: string): Function => {
    // const

    return (target: any, propertyKey: string, decorator: TypedPropertyDescriptor<Function>) => {
        if (!propertyKey && !decorator) {
            Reflect.defineMetadata(rootPathSymbolKey, path, target.prototype);
        } else {
            let methods = Reflect.getMetadata(methodsSymbolKey, target) || [];
            methods.push(propertyKey);
            Reflect.defineMetadata(methodsSymbolKey, methods, target);
            Reflect.defineMetadata(pathSymbolKey, path, target, propertyKey);

            decorator.value = function() {
                let url = Reflect.getMetadata(rootPathSymbolKey, target), arg = arguments;
                const pathParams = Reflect.getMetadata(pathParamSymbolKey, target, propertyKey);
                const queryParams = Reflect.getMetadata(queryParamSymbolKey, target, propertyKey);
                const bodyParams = Reflect.getMetadata(bodyParamSymbolKey, target, propertyKey);

                const httpUrl = window['__decorator_http__url'];
                const httpClient = window['__decorator_http__client'];

                if (pathParams) {
                    let paths = path.split('/').map(function(key) {
                        if (key.includes(':')) {
                            return arg[pathParams[key.replace(':', '')]];
                        }
                        return key;
                    }).join('/');
                    url += paths;
                } else {
                    url += path;
                }
                if (queryParams) {
                    let query = '?';
                    const params = Object.keys(queryParams);
                    params.forEach((key, index) => {
                        query += (key + '=' + arg[queryParams[key]]);
                        if (index !== params.length - 1) {
                            query += '&';
                        }
                    });
                    url += query;
                }
                let body;
                if (bodyParams) {
                    if (Object.keys(bodyParams).includes('__body__')) {
                        body = Object.assign({}, arg[bodyParams['__body__']])
                    } else {
                        body = {};
                        Object.keys(bodyParams).forEach(key => {
                            body[key] = arg[bodyParams[key]];
                        });
                    }
                }
                const httpMethod = Reflect.getMetadata(httpMethodSymbolKey, target, propertyKey);
                url = httpUrl + url;
                return httpClient[httpMethod](url, body);
            };
        }
    };
}
