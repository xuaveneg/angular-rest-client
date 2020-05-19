var param_map_1 = require("./maps/param-map");
function Body(target, methodName, parameterIndex) {
    target.addBody(methodName, parameterIndex);
}
exports.Body = Body;
function PathParam(name) {
    return function (target, methodName, parameterIndex) {
        target.add(param_map_1.ParamType.PATH, methodName, parameterIndex, name);
    };
}
exports.PathParam = PathParam;
function QueryParam(name) {
    return function (target, methodName, parameterIndex) {
        target.add(param_map_1.ParamType.QUERY, methodName, parameterIndex, name);
    };
}
exports.QueryParam = QueryParam;
function Header(name) {
    return function (target, methodName, parameterIndex) {
        target.add(param_map_1.ParamType.HEADER, methodName, parameterIndex, name);
    };
}
exports.Header = Header;
