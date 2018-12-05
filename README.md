## request-decorator 是一个简化angular的HttpClient服务的库


#### 以前需要这样编写服务
```
//user.service.ts

@Injectable()
export class UserService {
    constructor(
        private http: HttpClient
    ) {}
    
    
    findUserById(id: string) {
        return this.http.get(`localhost:3000/api/user/${id}`);
    }
    
    insertUser(user: User) {
        return this.http.post('localhost:3000/api/user/insert', user);
    }
}

```
#### 使用 @hibiscus/request-decorator 
```typescript
import {DecoratorModule} from '@hibiscus/request-decorator';

// AppModule
export class AppModule {
    constructor(
        @Inject(HttpClient) private http: HttpClient
    ) {
        DecoratorModule.forRoot(http, environment.httpUrl);
    }
}


// user.service.ts
@Path('/api/user')
@Injectable()
export class UrlDemoService {

    constructor() {}
    
    @GET
    @After(res => {
        res.map(item => {
            item.name += '(*^▽^*)';
            return item;
        });
        return res;
    })
    @Path('/:id')
    findUserById(@PathParam('id') id: any): any {}
    
    @POST
    @Path('/insert')
    insertUser(@BodyParam() user: User): any {}
}

```

#### API简介
```
@GET @POST @DELETE @PUT 设置请求的方式
@Path 作为类装饰器时，定义请求URL的前缀，作为方式装饰器时，与前缀进行拼接
@PathParam url中参数装饰器 如 /find/:name 
@QueryParam url后以问号拼接的参数 
@BodyParam post与put请求的请求体
@Before 发出请求前执行， todo 
@After 请求完成后执行，接受参数为函数，形参为请求结果
```
