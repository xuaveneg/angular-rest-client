import {MethodParamMap} from './method-param-map';

export class MultipleParamByMethodSingleValueMap extends MethodParamMap {

  constructor(private name: string) {
    super();
  }

  protected handleExistingParameter(parameterName: string): void {
    throw new Error(`${this.name} ${parameterName} was set multiple times`);
  }
}
