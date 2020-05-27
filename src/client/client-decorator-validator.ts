import {RestClientService} from './rest-client-service';

export function throwRestClientAnnotationError(className: string): void {
  throw new Error(`Class ${className} should be a RestClient`);
}

export function checkBaseConstructor(restClientService: new () => RestClientService): void {
    if (!restClientService.prototype.checkRestClient) {
        throw new Error(`Class ${(restClientService.name)} should extend RestClientService`);
    }
}
