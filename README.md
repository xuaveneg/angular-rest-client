# angular-rest-client

Rest client annotation for angular

## Usage
```typescript
@RestClient({
    apiUrl: 'http://api-url',
    basePath: '/api'
})
class RestClient extends RestClientService {
    @GET('/get') // will call GET http://api-url/api/get
    public get(): Observable<AnyReturnType> {
        return new Observable<AnyReturnType>();
    }

    @GET('/get/{id}') // will call GET http://api-url/api/get/<id>
    public getById(@PathParam('id') id: string): Observable<AnyReturnType> {
        return new Observable<AnyReturnType>();
    }
    
    @POST('/post') // will call POST http://api-url/api/post with body <body>
    public post(@Body body: PostBodyType): Observable<PostReturnType> {
        return new Observable<PostReturnType>();
    }
    
    @PUT('/put') // will call PUT http://api-url/api/put?query=<query>&page=<page>
    public put(@QueryParam('query') query: string, @QueryParam('page') page: number): Observable<PutReturnType> {
        return new Observable<PutReturnType>();
    }
    
    @DELETE('/delete') // will call DELETE http://api-url/api/delete with header X-defined-header: <header>
    public delete(@Header('X-defined-header') header: string): Observable<void> {
        return new Observable<void>();
    }
}
```

You also need to import `RestClientModule` in main project in order to provider `HttpClient`.

As `RestClientModule` does not have its own mocking module, testing and mocking this module goes through `HttpClientTestingModule`.

See https://angular.io/guide/http#testing-requests

See https://medium.com/better-programming/testing-http-requests-in-angular-with-httpclienttestingmodule-3880ceac74cf

## Informations

`@RestClient` is mandatory (to add `HttpClient` to the class)

- `apiUrl` and `basePath` are mandatory

`RestClientService` implementation is mandatory (to ensure util functions definitions and implementations)

The implementations of all Http method annotated functions are ignored (typescript doesn't allow annotations on
 interface methods), only the return type is important (`Observable` from `HttpClient`, parameterized with the return
 type of the remote call)

- `@GET` defines a `GET` endpoint
- `@POST` defines a `POST` endpoint
- `@PUT` defines a `PUT` endpoint
- `@DELETE` defines a `DELETE` endpoint

Endpoints can be parameterized with the following annotations

- `@Body` defines the parameter that will be the call body (only one by method)
- `@PathParam('name')` defines the parameter that will be the `name` parameter of the url (defined as `{name}` in the
 url), only one by parameter name by method
- `@QueryParam('name')` defines the query parameter `name`, there can be any number for a name in a method (there can
 be `?name=value1&name=value2`)
 - `@Header('name')` defines the header `name`, there can be any number for a name in a method (there can be
 `name: value1, value2`)