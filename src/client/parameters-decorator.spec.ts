import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs';
import {RestClientService} from './rest-client-service';
import {RestClient} from './rest-client.decorator';
import {Body, Header, PathParam, QueryParam} from './parameters-decorator';
import {DELETE, GET, POST, PUT} from './request-decorator';

type TestType = { test: string };

describe('Parameters decorators', (): void => {

  it('should call HttpClientModule GET on GET call with Path params', async (): Promise<void> => {
    @RestClient({
      apiUrl: 'http://test',
      basePath: '/mock'
    })
    class ClientMockService extends RestClientService {
      @GET('/getUrl/{id}')
      public get(@PathParam('id') id: number): Observable<TestType> {
        return new Observable<TestType>();
      }
    }
    await TestBed.configureTestingModule({imports: [HttpClientTestingModule]})
      .compileComponents();
    const clientMock: ClientMockService = TestBed.inject(ClientMockService);
    const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);

    clientMock.get(10)
      .subscribe(({test}: TestType): void => {
        expect(test).toEqual('test');
      });

    const request: TestRequest = httpTestingController.expectOne('http://test/mock/getUrl/10');
    expect(request.request.method).toBe('GET');
    request.flush({test: 'test'});
  });

  it('should call HttpClientModule POST on POST call with body', async (): Promise<void> => {
    @RestClient({
      apiUrl: 'http://test',
      basePath: '/mock'
    })
    class ClientMockService extends RestClientService {
      @POST('/postUrl')
      public post(@Body param: TestType): Observable<TestType> {
        return new Observable<TestType>();
      }
    }
    await TestBed.configureTestingModule({imports: [HttpClientTestingModule]})
      .compileComponents();
    const clientMock: ClientMockService = TestBed.inject(ClientMockService);
    const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);

    clientMock.post({test: 'param'})
      .subscribe(({test}: TestType): void => {
        expect(test).toEqual('post');
      });

    const request: TestRequest = httpTestingController.expectOne('http://test/mock/postUrl');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({test: 'param'});
    request.flush({test: 'post'});
  });

  it('should call HttpClientModule PUT on PUT call with query param', async (): Promise<void> => {
    @RestClient({
      apiUrl: 'http://test',
      basePath: '/mock'
    })
    class ClientMockService extends RestClientService {
      @PUT('/putUrl')
      public put(@QueryParam('testQuery') value: string): Observable<TestType> {
        return new Observable<TestType>();
      }
    }
    await TestBed.configureTestingModule({imports: [HttpClientTestingModule]})
      .compileComponents();
    const clientMock: ClientMockService = TestBed.inject(ClientMockService);
    const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);

    clientMock.put('param')
      .subscribe(({test}: TestType): void => {
        expect(test).toEqual('put');
      });

    const request: TestRequest = httpTestingController.expectOne('http://test/mock/putUrl?testQuery=param');
    expect(request.request.method).toBe('PUT');
    expect(request.request.params.get('testQuery')).toEqual('param');
    request.flush({test: 'put'});
  });

  it('should call HttpClientModule DELETE on DELETE call with headers', async (): Promise<void> => {
    @RestClient({
      apiUrl: 'http://test',
      basePath: '/mock'
    })
    class ClientMockService extends RestClientService {
      @DELETE('/deleteUrl')
      public delete(@Header('headerTest') value: string): Observable<TestType> {
        return new Observable<TestType>();
      }
    }
    await TestBed.configureTestingModule({imports: [HttpClientTestingModule]})
      .compileComponents();
    const clientMock: ClientMockService = TestBed.inject(ClientMockService);
    const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);

    clientMock.delete('param')
      .subscribe(({test}: TestType): void => {
        expect(test).toEqual('delete');
      });

    const request: TestRequest = httpTestingController.expectOne('http://test/mock/deleteUrl');
    expect(request.request.method).toBe('DELETE');
    expect(request.request.headers.get('headerTest')).toEqual('param');
    request.flush({test: 'delete'});
  });

  it('should not fail when having unset header, body, query or path param', async (): Promise<void> => {
    @RestClient({
      apiUrl: 'http://test',
      basePath: '/mock'
    })
    class ClientMockService extends RestClientService {
      @POST('/testUrl/{pathTest}')
      public post(@Header('headerTest') header?: string, @Body body?: TestType,
                  @PathParam('pathTest') path?: string, @QueryParam('queryTest') query?: string
      ): Observable<TestType> {
        return new Observable<TestType>();
      }
    }
    await TestBed.configureTestingModule({imports: [HttpClientTestingModule]})
      .compileComponents();
    const clientMock: ClientMockService = TestBed.inject(ClientMockService);
    const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);

    clientMock.post()
      .subscribe(({test}: TestType): void => {
        expect(test).toEqual('post');
      });

    const request: TestRequest = httpTestingController.expectOne('http://test/mock/testUrl/{pathTest}');
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.has('headerTest')).toBe(false);
    expect(request.request.params.has('queryTest')).toBe(false);
    expect(request.request.body).toBeNull();
    request.flush({test: 'post'});
  });

  it('should set all params when having multiple header, body, multiple query and multiple path param', async (): Promise<void> => {
    @RestClient({
      apiUrl: 'http://test',
      basePath: '/mock'
    })
    class ClientMockService extends RestClientService {
      @PUT('/testUrl/{pathTest}/{pathTest2}')
      public put(@Header('headerTest') header: string, @Header('headerTest2') header2: string,
                 @Body body: TestType,
                 @PathParam('pathTest') path: string, @PathParam('pathTest2') path2: string,
                 @QueryParam('queryTest') query: string, @QueryParam('queryTest2') query2: string
      ): Observable<TestType> {
        return new Observable<TestType>();
      }
    }
    await TestBed.configureTestingModule({imports: [HttpClientTestingModule]})
      .compileComponents();
    const clientMock: ClientMockService = TestBed.inject(ClientMockService);
    const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);

    clientMock.put('headerValue', 'headerValue2',
      {test: 'body'},
      'pathValue', 'pathValue2', 'queryValue', 'queryValue2'
    )
      .subscribe(({test}: TestType): void => {
        expect(test).toEqual('put');
      });

    const request: TestRequest = httpTestingController.expectOne('http://test/mock/testUrl/pathValue/pathValue2?queryTest2=queryValue2&queryTest=queryValue');
    expect(request.request.method).toBe('PUT');
    expect(request.request.headers.get('headerTest')).toEqual('headerValue');
    expect(request.request.headers.get('headerTest2')).toEqual('headerValue2');
    expect(request.request.params.get('queryTest')).toEqual('queryValue');
    expect(request.request.params.get('queryTest2')).toEqual('queryValue2');
    expect(request.request.body).toEqual({test: 'body'});
    request.flush({test: 'put'});
  });

  it('should fail when same path param is set multiple times', async (done: DoneFn): Promise<void> => {
    try {
      @RestClient({
        apiUrl: 'http://test',
        basePath: '/mock'
      })
      class ClientMockService extends RestClientService {
        @PUT('/testUrl/{pathTest}')
        public put(@PathParam('pathTest') path: string, @PathParam('pathTest') path2: string): Observable<TestType> {
          return new Observable<TestType>();
        }
      }
      done.fail();
    } catch (exception) {
      expect(exception.message).toBe('Path param pathTest was set multiple times');
      done();
    }
  });

  it('should fail when body is set multiple times', async (done: DoneFn): Promise<void> => {
    try {
      @RestClient({
        apiUrl: 'http://test',
        basePath: '/mock'
      })
      class ClientMockService extends RestClientService {
        @PUT('/testUrl/{pathTest}')
        public put(@Body body: TestType, @Body body2: TestType): Observable<TestType> {
          return new Observable<TestType>();
        }
      }
      done.fail();
    } catch (exception) {
      expect(exception.message).toBe('Body was set multiple times');
      done();
    }
  });

  it('should append when same query param is set multiple times', async (): Promise<void> => {
    @RestClient({
      apiUrl: 'http://test',
      basePath: '/mock'
    })
    class ClientMockService extends RestClientService {
      @PUT('/testUrl')
      public put(@QueryParam('queryTest') path: string, @QueryParam('queryTest') path2: string): Observable<TestType> {
        return new Observable<TestType>();
      }
    }
    await TestBed.configureTestingModule({imports: [HttpClientTestingModule]})
      .compileComponents();
    const clientMock: ClientMockService = TestBed.inject(ClientMockService);
    const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);

    clientMock.put('queryValue', 'queryValue2')
      .subscribe(({test}: TestType): void => {
        expect(test).toEqual('put');
      });

    const request: TestRequest = httpTestingController.expectOne('http://test/mock/testUrl?queryTest=queryValue2&queryTest=queryValue');
    expect(request.request.method).toBe('PUT');
    expect(request.request.params.getAll('queryTest')).toEqual(['queryValue2', 'queryValue']);
    request.flush({test: 'put'});
  });

  it('should append when same header is set multiple times', async (): Promise<void> => {
    @RestClient({
      apiUrl: 'http://test',
      basePath: '/mock'
    })
    class ClientMockService extends RestClientService {
      @PUT('/testUrl')
      public put(@Header('headerTest') path: string, @Header('headerTest') path2: string): Observable<TestType> {
        return new Observable<TestType>();
      }
    }
    await TestBed.configureTestingModule({imports: [HttpClientTestingModule]})
      .compileComponents();
    const clientMock: ClientMockService = TestBed.inject(ClientMockService);
    const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);

    clientMock.put('headerValue', 'headerValue2')
      .subscribe(({test}: TestType): void => {
        expect(test).toEqual('put');
      });

    const request: TestRequest = httpTestingController.expectOne('http://test/mock/testUrl');
    expect(request.request.method).toBe('PUT');
    expect(request.request.headers.getAll('headerTest')).toEqual(['headerValue2', 'headerValue']);
    request.flush({test: 'put'});
  });
});
