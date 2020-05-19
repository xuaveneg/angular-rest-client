var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var method_param_map_1 = require('./method-param-map');
var MultipleParamByMethodSingleValueMap = (function (_super) {
    __extends(MultipleParamByMethodSingleValueMap, _super);
    function MultipleParamByMethodSingleValueMap(name) {
        _super.call(this);
        this.name = name;
    }
    MultipleParamByMethodSingleValueMap.prototype.handleExistingParameter = function (parameterName) {
        throw new Error(this.name + " " + parameterName + " was set multiple times");
    };
    return MultipleParamByMethodSingleValueMap;
})(method_param_map_1.MethodParamMap);
exports.MultipleParamByMethodSingleValueMap = MultipleParamByMethodSingleValueMap;
