var client_decorator_validator_1 = require('./client-decorator-validator');
var client_types_1 = require('./client-types');
function request(method, url, target, methodName, descriptor) {
    client_decorator_validator_1.checkBaseClass(target);
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return this.executeRequest(method, url, methodName, args);
    };
}
function GET(url) {
    return function (target, methodName, descriptor) {
        request(client_types_1.HttpMethod.GET, url, target, methodName, descriptor);
    };
}
exports.GET = GET;
function POST(url) {
    return function (target, methodName, descriptor) {
        request(client_types_1.HttpMethod.POST, url, target, methodName, descriptor);
    };
}
exports.POST = POST;
function PUT(url) {
    return function (target, methodName, descriptor) {
        request(client_types_1.HttpMethod.PUT, url, target, methodName, descriptor);
    };
}
exports.PUT = PUT;
function DELETE(url) {
    return function (target, methodName, descriptor) {
        request(client_types_1.HttpMethod.DELETE, url, target, methodName, descriptor);
    };
}
exports.DELETE = DELETE;
