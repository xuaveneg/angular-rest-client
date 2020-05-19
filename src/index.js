var rest_client_service_1 = require("./client/rest-client-service");
var parameters_decorator_1 = require("./client/parameters-decorator");
var request_decorator_1 = require("./client/request-decorator");
exports["default"] = {
    RestClientService: rest_client_service_1.RestClientService,
    Body: parameters_decorator_1.Body, PathParam: parameters_decorator_1.PathParam, QueryParam: parameters_decorator_1.QueryParam, Header: parameters_decorator_1.Header,
    GET: request_decorator_1.GET, POST: request_decorator_1.POST, PUT: request_decorator_1.PUT, DELETE: request_decorator_1.DELETE
};
