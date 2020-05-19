import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {throwRestClientAnnotationError} from './client-decorator-validator';
import {HttpMethod, MethodName, ParamType} from './client-types';
import {ParamMap} from './maps/param-map';

export class RestClientService {
  protected basePath: string;
  protected apiUrl: string;

  protected isRestClient: boolean;

  private paramMap: ParamMap;
  protected http: HttpClient;

  private checkInitialisation(): void {
    if (!this.paramMap) {
      this.paramMap = new ParamMap();
    }
  }

  private checkRestClient(): void {
    if (!this.isRestClient) {
      throwRestClientAnnotationError(this.constructor.name);
    }
  }

  public addBody(methodName: MethodName, parameterIndex: number): void {
    this.checkInitialisation();
    this.paramMap.addBody(methodName, parameterIndex);
  }

  public add(paramType: ParamType, methodName: MethodName, parameterIndex: number, parameterName: string): void {
    this.checkInitialisation();
    this.paramMap.add(paramType, methodName, parameterIndex, parameterName);
  }

  private findBody(methodName: MethodName, args: any[]): any {
    return this.paramMap.findBody(methodName, args);
  }

  private buildTemplateUrl(url: string, methodName: MethodName, args: any[]): string {
    let fullTemplateUrl: string = this.apiUrl + this.basePath + url;
    this.paramMap.build(ParamType.PATH, methodName, args, (value: any, parameterName: string): void => {
      const encodedValue: string = encodeURI(value);
      const keyToReplace: string = `{${parameterName}}`;
      fullTemplateUrl = fullTemplateUrl.replace(keyToReplace, encodedValue);
    });
    return fullTemplateUrl;
  }

  private buildQueryParams(methodName: MethodName, args: any[]): HttpParams {
    let queryParams: HttpParams = new HttpParams();
    this.paramMap.build(ParamType.QUERY, methodName, args, (value: any, parameterName: string): void => {
      queryParams = queryParams.append(parameterName, value);
    });
    return queryParams;
  }

  private buildHeaders(methodName: string, args: any[]): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    this.paramMap.build(ParamType.HEADER, methodName, args, (value: any, parameterName: string): void => {
      headers = headers.append(parameterName, value);
    });
    return headers;
  }

  public executeRequest(method: HttpMethod, url: string, methodName: MethodName, args: any[]): any {
    this.checkInitialisation();
    this.checkRestClient();
    const fullUrl: string = this.buildTemplateUrl(url, methodName, args);
    const queryParams: HttpParams = this.buildQueryParams(methodName, args);
    const headers: HttpHeaders = this.buildHeaders(methodName, args);
    const body: any = this.findBody(methodName, args);
    return this.http.request(method, fullUrl, {body, params: queryParams, headers});
  }
}
