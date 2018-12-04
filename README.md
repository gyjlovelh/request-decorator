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
```
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
    @Path('/:id')
    findUserById(@PathParam('id') id: any): any {}
    
    @POST
    @Path('/insert')
    insertUser(@BodyParam() user: User): any {}
}

```
