var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var method_param_map_1 = require('./method-param-map');
var MultipleParamByMethodMultipleValueMap = (function (_super) {
    __extends(MultipleParamByMethodMultipleValueMap, _super);
    function MultipleParamByMethodMultipleValueMap() {
        _super.call(this);
    }
    MultipleParamByMethodMultipleValueMap.prototype.handleExistingParameter = function (parameterName) {
    };
    return MultipleParamByMethodMultipleValueMap;
})(method_param_map_1.MethodParamMap);
exports.MultipleParamByMethodMultipleValueMap = MultipleParamByMethodMultipleValueMap;
