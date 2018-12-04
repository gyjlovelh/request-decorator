/**
 * Created by guanyj on  2018/12/3
 */

export class DecoratorModule {

    static forRoot(http: any, httpUrl: string = '') {
        window['__decorator_http__client'] = http;
        window['__decorator_http__url'] = httpUrl;
    }
}
