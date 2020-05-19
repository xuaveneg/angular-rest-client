var single_param_by_method_map_1 = require('./single-param-by-method-map');
var multiple_param_by_method_single_value_map_1 = require('./multiple-param-by-method-single-value-map');
var multiple_param_by_method_multiple_value_map_1 = require('./multiple-param-by-method-multiple-value-map');
(function (ParamType) {
    ParamType[ParamType["PATH"] = 0] = "PATH";
    ParamType[ParamType["QUERY"] = 1] = "QUERY";
    ParamType[ParamType["HEADER"] = 2] = "HEADER";
})(exports.ParamType || (exports.ParamType = {}));
var ParamType = exports.ParamType;
var ParamMap = (function () {
    function ParamMap() {
        this.paramTypeMap = new Map();
        this.bodies = new single_param_by_method_map_1.SingleParamByMethodMap('Body');
        this.paramTypeMap.set(ParamType.PATH, new multiple_param_by_method_single_value_map_1.MultipleParamByMethodSingleValueMap('Path param'));
        this.paramTypeMap.set(ParamType.QUERY, new multiple_param_by_method_multiple_value_map_1.MultipleParamByMethodMultipleValueMap());
        this.paramTypeMap.set(ParamType.HEADER, new multiple_param_by_method_multiple_value_map_1.MultipleParamByMethodMultipleValueMap());
        this.bodies = new single_param_by_method_map_1.SingleParamByMethodMap('Body');
    }
    ParamMap.prototype.addBody = function (methodName, parameterIndex) {
        this.bodies.add(methodName, parameterIndex);
    };
    ParamMap.prototype.findBody = function (methodName, args) {
        return this.bodies.get(methodName, args);
    };
    ParamMap.prototype.add = function (paramType, methodName, parameterIndex, name) {
        this.paramTypeMap.get(paramType).add(methodName, parameterIndex, name);
    };
    ParamMap.prototype.build = function (paramType, methodName, args, doSingleBuild) {
        this.paramTypeMap.get(paramType).build(methodName, args, doSingleBuild);
    };
    return ParamMap;
})();
exports.ParamMap = ParamMap;
