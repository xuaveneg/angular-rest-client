(function (HttpMethod) {
    HttpMethod[HttpMethod["GET"] = 'GET'] = "GET";
    HttpMethod[HttpMethod["POST"] = 'POST'] = "POST";
    HttpMethod[HttpMethod["PUT"] = 'PUT'] = "PUT";
    HttpMethod[HttpMethod["DELETE"] = 'DELETE'] = "DELETE";
})(exports.HttpMethod || (exports.HttpMethod = {}));
var HttpMethod = exports.HttpMethod;
