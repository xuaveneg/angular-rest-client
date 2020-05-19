import {RestClientService} from './client/rest-client-service';
import {RestClient} from './client/rest-client.decorator';
import {Body, Header, PathParam, QueryParam} from './client/parameters-decorator';
import {DELETE, GET, POST, PUT} from './client/request-decorator';

export default {
    RestClientService, RestClient,
    Body, PathParam, QueryParam, Header,
    GET, POST, PUT, DELETE
};
