import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {checkBaseConstructor} from './client-decorator-validator';
import {RestClientConfig} from './client-types';
import {RestClientService} from './rest-client-service';

export function RestClient(param: RestClientConfig): any {
  return (restClientService: new () => RestClientService): any => {
    checkBaseConstructor(restClientService);
    @Injectable({providedIn: 'root'})
    class DecoratedRestClientService extends restClientService {
      constructor(http: HttpClient) {
        super();
        this.basePath = param.basePath;
        this.apiUrl = param.apiUrl;
        this.http = http;
        this.isRestClient = true;
      }
    }
    return DecoratedRestClientService;
  };
}
