export interface RestClientConfig {
  basePath: string;
  apiUrl: string;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum ParamType {
  PATH,
  QUERY,
  HEADER
}

export type MethodName = string;

export type MultipleParamMap = Map<string, number[]>;
