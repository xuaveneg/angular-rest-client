export interface RestClientConfig {
  basePath: string;
  apiUrl: string;
}

export type MethodName = string;

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
