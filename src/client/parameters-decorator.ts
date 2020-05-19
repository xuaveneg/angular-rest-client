import {MethodName} from './client-types';
import {RestClientService} from './rest-client-service';
import {ParamType} from './maps/param-map';

export function Body(target: RestClientService, methodName: MethodName, parameterIndex: number): void {
    target.addBody(methodName, parameterIndex);
}

export function PathParam(name: string): any {
  return (target: RestClientService, methodName: MethodName, parameterIndex: number): void => {
    target.add(ParamType.PATH, methodName, parameterIndex, name);
  };
}

export function QueryParam(name: string): any {
  return (target: RestClientService, methodName: MethodName, parameterIndex: number): void => {
    target.add(ParamType.QUERY, methodName, parameterIndex, name);
  };
}

export function Header(name: string): any {
  return (target: RestClientService, methodName: MethodName, parameterIndex: number): void => {
    target.add(ParamType.HEADER, methodName, parameterIndex, name);
  };
}
