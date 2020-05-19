import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Observable} from 'rxjs';
import {RestClientService} from './rest-client-service';
import {RestClient} from './rest-client.decorator';
import {Body, Header, PathParam, QueryParam} from './parameters-decorator';
import {DELETE, GET, POST, PUT} from './request-decorator';

type TestType = { test: string };

describe('Request decorators', (): void => {

  it('should call HttpClientModule GET on GET call', async (): Promise<void> => {
    @RestClient({
      apiUrl: 'http://test',
      basePath: '/mock'
    })
    class ClientMockService extends RestClientService {
      @GET('/getUrl')
      public get(): Observable<TestType> {
        return new Observable<TestType>();
      }
    }
    await TestBed.configureTestingModule({imports: [HttpClientTestingModule]})
      .compileComponents();
    const clientMock: ClientMockService = TestBed.inject(ClientMockService);
    const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);

    clientMock.get()
      .subscribe(({test}: TestType): void => {
        expect(test).toEqual('test');
      });

    const request: TestRequest = httpTestingController.expectOne('http://test/mock/getUrl');
    expect(request.request.method).toBe('GET');
    request.flush({test: 'test'});
    httpTestingController.verify();
  });

  it('should call HttpClientModule POST on POST call', async (): Promise<void> => {
    @RestClient({
      apiUrl: 'http://test',
      basePath: '/mock'
    })
    class ClientMockService extends RestClientService {
      @POST('/postUrl')
      public post(): Observable<TestType> {
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

    const request: TestRequest = httpTestingController.expectOne('http://test/mock/postUrl');
    expect(request.request.method).toBe('POST');
    request.flush({test: 'post'});
  });

  it('should call HttpClientModule PUT on PUT call', async (): Promise<void> => {
    @RestClient({
      apiUrl: 'http://test',
      basePath: '/mock'
    })
    class ClientMockService extends RestClientService {
      @PUT('/putUrl')
      public put(): Observable<TestType> {
        return new Observable<TestType>();
      }
    }
    await TestBed.configureTestingModule({imports: [HttpClientTestingModule]})
      .compileComponents();
    const clientMock: ClientMockService = TestBed.inject(ClientMockService);
    const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);

    clientMock.put()
      .subscribe(({test}: TestType): void => {
        expect(test).toEqual('put');
      });

    const request: TestRequest = httpTestingController.expectOne('http://test/mock/putUrl');
    expect(request.request.method).toBe('PUT');
    request.flush({test: 'put'});
  });

  it('should call HttpClientModule DELETE on DELETE call', async (): Promise<void> => {
    @RestClient({
      apiUrl: 'http://test',
      basePath: '/mock'
    })
    class ClientMockService extends RestClientService {
      @DELETE('/deleteUrl')
      public delete(): Observable<TestType> {
        return new Observable<TestType>();
      }
    }
    await TestBed.configureTestingModule({imports: [HttpClientTestingModule]})
      .compileComponents();
    const clientMock: ClientMockService = TestBed.inject(ClientMockService);
    const httpTestingController: HttpTestingController = TestBed.inject(HttpTestingController);

    clientMock.delete()
      .subscribe(({test}: TestType): void => {
        expect(test).toEqual('delete');
      });

    const request: TestRequest = httpTestingController.expectOne('http://test/mock/deleteUrl');
    expect(request.request.method).toBe('DELETE');
    request.flush({test: 'delete'});
  });

  it('should not have GET method in non RestClient decorated class', (done: DoneFn): void => {
    class InvalidClientMockAnnotation extends RestClientService {
      @GET('/getUrl')
      public getCall(): Observable<void> {
        return new Observable<void>();
      }
    }
    try {
      const invalidClientMock: InvalidClientMockAnnotation = new InvalidClientMockAnnotation();
      invalidClientMock.getCall();
      done.fail();
    } catch (exception) {
      expect(exception.message).toBe('Class InvalidClientMockAnnotation should be a RestClient');
      done();
    }
  });

  it('should not have GET method in class not extending RestClientService', (done: DoneFn): void => {
    try {
      class InvalidClientMockImplementation {
        @GET('/getUrl')
        public getCall(): Observable<void> {
          return new Observable<void>();
        }
      }
      done.fail();
      const invalidClientMock: InvalidClientMockImplementation = new InvalidClientMockImplementation();
      invalidClientMock.getCall();
    } catch (exception) {
      expect(exception.message).toBe('Class InvalidClientMockImplementation should extend RestClientService');
      done();
    }
  });
});
