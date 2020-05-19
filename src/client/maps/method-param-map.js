abstract;
var MethodParamMap = (function () {
    function MethodParamMap() {
        this.internalMap = new Map();
        this.abstract = handleExistingParameter(parameterName, string);
    }
    MethodParamMap.prototype.add = function (methodName, parameterIndex, parameterName) {
        if (!this.internalMap.has(methodName)) {
            this.internalMap.set(methodName, new Map());
        }
        var methodParamMap = this.internalMap.get(methodName);
        var parameterIndexes = methodParamMap.get(parameterName) || [];
        if (parameterIndexes.length > 0) {
            this.handleExistingParameter(parameterName);
        }
        parameterIndexes.push(parameterIndex);
        methodParamMap.set(parameterName, parameterIndexes);
    };
    MethodParamMap.prototype.build = function (methodName, args, doSingleBuild) {
        var methodQueryParams = this.internalMap.get(methodName) || new Map();
        methodQueryParams.forEach(function (parameterIndex, parameterName) {
            parameterIndex.forEach(function (value) {
                if (args[value]) {
                    doSingleBuild(args[value], parameterName, value);
                }
            });
        });
    };
    return MethodParamMap;
})();
