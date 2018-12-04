/**
 * Created by guanyj on  2018/11/21
 */
import 'reflect-metadata';

export const httpMethodSymbolKey = Symbol.for('common:httpMethod');

const [GET, POST, PUT, DELETE] = ['get', 'post', 'put', 'delete'].map(method => {
    return (target: any, propertyKey: string) => {
        Reflect.defineMetadata(httpMethodSymbolKey, method, target, propertyKey);
    };
});

export {GET, POST, PUT, DELETE};
