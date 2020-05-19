var rest_client_service_1 = require('./rest-client-service');
function throwRestClientAnnotationError(className) {
    throw new Error("Class " + className + " should be a RestClient");
}
exports.throwRestClientAnnotationError = throwRestClientAnnotationError;
function throwRestClientServiceExtensionError(className) {
    throw new Error("Class " + className + " should extend RestClientService");
}
function checkBaseClass(target) {
    if (!(target instanceof rest_client_service_1.RestClientService)) {
        throwRestClientServiceExtensionError(target.constructor.name);
    }
}
exports.checkBaseClass = checkBaseClass;
function checkBaseConstructor(restClientService) {
    if (!restClientService.prototype.checkRestClient) {
        throwRestClientServiceExtensionError(restClientService.name);
    }
}
exports.checkBaseConstructor = checkBaseConstructor;
