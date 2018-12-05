/**
 * Created by guanyj on  12/5/18
 */

export const beforeSymbolKey = Symbol.for('common:before');
export const afterSymbolKey = Symbol.for('common:after');

const [Before, After] = ['before', 'after'].map(event => {
    return fn => {
        return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
            Reflect.defineMetadata(beforeSymbolKey, fn, target, propertyKey);
        }
    }
});

export {Before, After};
