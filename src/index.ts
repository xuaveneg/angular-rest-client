import {RestClientService as _RestClientService} from './client/rest-client-service';
import {RestClient as _RestClient} from './client/rest-client.decorator';
import {
    Body as _Body,
    Header as _Header,
    PathParam as _PathParam,
    QueryParam as _QueryParam
} from './client/parameters-decorator';
import {
    GET as _GET,
    POST as _POST,
    PUT as _PUT,
    DELETE as _DELETE
} from './client/request-decorator';
import {MethodName, RestClientConfig} from './client/client-types';

export const RestClientService: new () => _RestClientService = _RestClientService;
export const RestClient: (param: RestClientConfig) => any = _RestClient;

export const Body: (target: _RestClientService, methodName: MethodName, parameterIndex: number) => void = _Body;
export const Header: (name: string) => (target: _RestClientService, methodName: MethodName, parameterIndex: number) => void
    = _Header;
export const PathParam: (name: string) => (target: _RestClientService, methodName: MethodName, parameterIndex: number) => void
    = _PathParam;
export const QueryParam: (name: string) => (target: _RestClientService, methodName: MethodName, parameterIndex: number) => void
    = _QueryParam;

export const GET: (url: string) => (target: _RestClientService, methodName: MethodName, descriptor: PropertyDescriptor) => void
    = _GET;
export const POST: (url: string) => (target: _RestClientService, methodName: MethodName, descriptor: PropertyDescriptor) => void
    = _POST;
export const PUT: (url: string) => (target: _RestClientService, methodName: MethodName, descriptor: PropertyDescriptor) => void
    = _PUT;
export const DELETE: (url: string) => (target: _RestClientService, methodName: MethodName, descriptor: PropertyDescriptor) => void
    = _DELETE;
