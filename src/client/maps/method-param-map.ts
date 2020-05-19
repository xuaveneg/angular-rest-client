import {MethodName, MultipleParamMap} from '../client-types';

export abstract class MethodParamMap {
  protected internalMap: Map<MethodName, MultipleParamMap> = new Map<MethodName, MultipleParamMap>();

  protected abstract handleExistingParameter(parameterName: string): void;

  public add(methodName: MethodName, parameterIndex: number, parameterName: string): void {
    if (!this.internalMap.has(methodName)) {
      this.internalMap.set(methodName, new Map<string, number[]>());
    }
    const methodParamMap: MultipleParamMap = this.internalMap.get(methodName);
    const parameterIndexes: number[] = methodParamMap.get(parameterName) || [];
    if (parameterIndexes.length > 0) {
      this.handleExistingParameter(parameterName);
    }
    parameterIndexes.push(parameterIndex);
    methodParamMap.set(parameterName, parameterIndexes);
  }

  public build(methodName: MethodName, args: any[],
               doSingleBuild: (value: any, parameterName?: string, parameterIndex?: number) => void): void {
    const methodQueryParams: MultipleParamMap = this.internalMap.get(methodName) || new Map<string, number[]>();
    methodQueryParams.forEach((parameterIndex: number[], parameterName: string): void => {
      parameterIndex.forEach((value: number): void => {
        if (args[value]) {
          doSingleBuild(args[value], parameterName, value);
        }
      });
    });
  }
}
