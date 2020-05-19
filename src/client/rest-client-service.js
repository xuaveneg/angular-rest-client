var http_1 = require('@angular/common/http');
var client_decorator_validator_1 = require('./client-decorator-validator');
var param_map_1 = require('./maps/param-map');
var RestClientService = (function () {
    function RestClientService() {
    }
    RestClientService.prototype.checkInitialisation = function () {
        if (!this.paramMap) {
            this.paramMap = new param_map_1.ParamMap();
        }
    };
    RestClientService.prototype.checkRestClient = function () {
        if (!this.isRestClient) {
            client_decorator_validator_1.throwRestClientAnnotationError(this.constructor.name);
        }
    };
    RestClientService.prototype.addBody = function (methodName, parameterIndex) {
        this.checkInitialisation();
        this.paramMap.addBody(methodName, parameterIndex);
    };
    RestClientService.prototype.add = function (paramType, methodName, parameterIndex, parameterName) {
        this.checkInitialisation();
        this.paramMap.add(paramType, methodName, parameterIndex, parameterName);
    };
    RestClientService.prototype.findBody = function (methodName, args) {
        return this.paramMap.findBody(methodName, args);
    };
    RestClientService.prototype.buildTemplateUrl = function (url, methodName, args) {
        var fullTemplateUrl = this.apiUrl + this.basePath + url;
        this.paramMap.build(param_map_1.ParamType.PATH, methodName, args, function (value, parameterName) {
            var encodedValue = encodeURI(value);
            var keyToReplace = "{" + parameterName + "}";
            fullTemplateUrl = fullTemplateUrl.replace(keyToReplace, encodedValue);
        });
        return fullTemplateUrl;
    };
    RestClientService.prototype.buildQueryParams = function (methodName, args) {
        var queryParams = new http_1.HttpParams();
        this.paramMap.build(param_map_1.ParamType.QUERY, methodName, args, function (value, parameterName) {
            queryParams = queryParams.append(parameterName, value);
        });
        return queryParams;
    };
    RestClientService.prototype.buildHeaders = function (methodName, args) {
        var headers = new http_1.HttpHeaders();
        this.paramMap.build(param_map_1.ParamType.HEADER, methodName, args, function (value, parameterName) {
            headers = headers.append(parameterName, value);
        });
        return headers;
    };
    RestClientService.prototype.executeRequest = function (method, url, methodName, args) {
        this.checkInitialisation();
        this.checkRestClient();
        var fullUrl = this.buildTemplateUrl(url, methodName, args);
        var queryParams = this.buildQueryParams(methodName, args);
        var headers = this.buildHeaders(methodName, args);
        var body = this.findBody(methodName, args);
        return this.http.request(method, fullUrl, { body: body, params: queryParams, headers: headers });
    };
    return RestClientService;
})();
exports.RestClientService = RestClientService;
