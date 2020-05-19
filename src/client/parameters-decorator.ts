import {MethodName, ParamType} from './client-types';
import {RestClientService} from './rest-client-service';

export function Body(target: RestClientService, methodName: MethodName, parameterIndex: number): void {
    target.addBody(methodName, parameterIndex);
}

export function PathParam(name: string): (target: RestClientService, methodName: MethodName, parameterIndex: number) => void {
  return (target: RestClientService, methodName: MethodName, parameterIndex: number): void => {
    target.add(ParamType.PATH, methodName, parameterIndex, name);
  };
}

export function QueryParam(name: string): (target: RestClientService, methodName: MethodName, parameterIndex: number) => void {
  return (target: RestClientService, methodName: MethodName, parameterIndex: number): void => {
    target.add(ParamType.QUERY, methodName, parameterIndex, name);
  };
}

export function Header(name: string): (target: RestClientService, methodName: MethodName, parameterIndex: number) => void {
  return (target: RestClientService, methodName: MethodName, parameterIndex: number): void => {
    target.add(ParamType.HEADER, methodName, parameterIndex, name);
  };
}
