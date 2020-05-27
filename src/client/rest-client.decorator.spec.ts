import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {RestClientService} from './rest-client-service';
import {RestClient} from './rest-client.decorator';

describe('RestClient decorator', (): void => {

  it('should initialize class values in decorated class', async (): Promise<void> => {
    @RestClient({
      apiUrl: 'http://test',
      basePath: '/mock'
    })
    class ClientMockService extends RestClientService {
      apiUrl: string;
      basePath: string;
    }

    await TestBed.configureTestingModule({imports: [HttpClientTestingModule]})
      .compileComponents();
    const clientMock: ClientMockService = TestBed.inject(ClientMockService);

    expect(clientMock.apiUrl).toBe('http://test');
    expect(clientMock.basePath).toBe('/mock');
  });

  it('should not have RestClient annotation in class not extending RestClientService', (done: DoneFn): void => {
    try {
      @RestClient({apiUrl: 'test', basePath: 'test'})
      class InvalidClientMockAnnotationImplementation {
        public dummy(): void {
          return;
        }
      }
      done.fail();
      const invalidMock: InvalidClientMockAnnotationImplementation = new InvalidClientMockAnnotationImplementation();
      invalidMock.dummy();
    } catch (exception) {
      expect(exception.message).toBe('Class InvalidClientMockAnnotationImplementation should extend RestClientService');
      done();
    }
  });
});
