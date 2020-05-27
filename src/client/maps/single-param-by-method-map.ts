import {MethodName} from '../client-types';

export class SingleParamByMethodMap {
    private internalMap: Map<MethodName, number> = new Map<string, number>();

    constructor(private name: string) { }

    public add(methodName: MethodName, parameterIndex: number): void {
        if (this.internalMap.has(methodName)) {
          throw new Error(`${this.name} was set multiple times`);
        }
        this.internalMap.set(methodName, parameterIndex);
    }

    public get(methodName: MethodName, args: any[]): any {
        const methodIndex: number = this.internalMap.get(methodName);
        return args[methodIndex];
    }
}
