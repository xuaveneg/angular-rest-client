import {Observable} from 'rxjs';
import {HttpMethod, MethodName} from './client-types';
import {RestClientService} from './rest-client-service';

function request(method: HttpMethod, url: string, target: RestClientService, methodName: string, descriptor: PropertyDescriptor): void {
    descriptor.value = function(...args: any[]): Observable<any> {
        return this.executeRequest(method, url, methodName, args);
    };
}

export function GET(url: string): (target: RestClientService, methodName: MethodName, descriptor: PropertyDescriptor) => void {
    return (target: RestClientService, methodName: MethodName, descriptor: PropertyDescriptor): void => {
        request(HttpMethod.GET, url, target, methodName, descriptor);
    };
}

export function POST(url: string): (target: RestClientService, methodName: MethodName, descriptor: PropertyDescriptor) => void {
    return (target: RestClientService, methodName: MethodName, descriptor: PropertyDescriptor): void => {
        request(HttpMethod.POST, url, target, methodName, descriptor);
    };
}

export function PUT(url: string): (target: RestClientService, methodName: MethodName, descriptor: PropertyDescriptor) => void {
    return (target: RestClientService, methodName: MethodName, descriptor: PropertyDescriptor): void => {
        request(HttpMethod.PUT, url, target, methodName, descriptor);
    };
}

export function DELETE(url: string): any {
    return (target: RestClientService, methodName: MethodName, descriptor: PropertyDescriptor): void => {
        request(HttpMethod.DELETE, url, target, methodName, descriptor);
    };
}
