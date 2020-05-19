import {RestClientService} from './rest-client-service';

export function throwRestClientAnnotationError(className: string): void {
  throw new Error(`Class ${className} should be a RestClient`);
}

function throwRestClientServiceExtensionError(className: string): void {
    throw new Error(`Class ${className} should extend RestClientService`);
}

export function checkBaseClass(target: any): void {
    if (!(target instanceof RestClientService)) {
        throwRestClientServiceExtensionError(target.constructor.name);
    }
}

export function checkBaseConstructor(restClientService: new () => RestClientService): void {
    if (!restClientService.prototype.checkRestClient) {
        throwRestClientServiceExtensionError(restClientService.name);
    }
}
