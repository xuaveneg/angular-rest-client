import {MethodParamMap} from './method-param-map';
import {SingleParamByMethodMap} from './single-param-by-method-map';
import {MultipleParamByMethodSingleValueMap} from './multiple-param-by-method-single-value-map';
import {MultipleParamByMethodMultipleValueMap} from './multiple-param-by-method-multiple-value-map';
import {MethodName} from '../client-types';

export type MultipleParamMap = Map<string, number[]>;

export enum ParamType {
  PATH,
  QUERY,
  HEADER
}

export class ParamMap {
  private paramTypeMap: Map<ParamType, MethodParamMap> = new Map<ParamType, MethodParamMap>();
  private bodies: SingleParamByMethodMap = new SingleParamByMethodMap('Body');

  constructor() {
    this.paramTypeMap.set(ParamType.PATH, new MultipleParamByMethodSingleValueMap('Path param'));
    this.paramTypeMap.set(ParamType.QUERY, new MultipleParamByMethodMultipleValueMap());
    this.paramTypeMap.set(ParamType.HEADER, new MultipleParamByMethodMultipleValueMap());
    this.bodies = new SingleParamByMethodMap('Body');
  }

  public addBody(methodName: MethodName, parameterIndex: number): void {
    this.bodies.add(methodName, parameterIndex);
  }

  public findBody(methodName: MethodName, args: any[]): any {
    return this.bodies.get(methodName, args);
  }

  public add(paramType: ParamType, methodName: MethodName, parameterIndex: number, name: string): void {
    this.paramTypeMap.get(paramType).add(methodName, parameterIndex, name);
  }

  public build(paramType: ParamType, methodName: string, args: any[],
               doSingleBuild: (value: any, parameterName: string) => void): void {
    this.paramTypeMap.get(paramType).build(methodName, args, doSingleBuild);
  }
}
