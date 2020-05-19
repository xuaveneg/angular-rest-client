import {RestClientService} from './client/rest-client-service';
import {Body, Header, PathParam, QueryParam} from './client/parameters-decorator';
import {DELETE, GET, POST, PUT} from './client/request-decorator';

export default {
    RestClientService,
    Body, PathParam, QueryParam, Header,
    GET, POST, PUT, DELETE
};
