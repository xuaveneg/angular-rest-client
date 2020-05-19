var SingleParamByMethodMap = (function () {
    function SingleParamByMethodMap(name) {
        this.name = name;
        this.internalMap = new Map();
    }
    SingleParamByMethodMap.prototype.add = function (methodName, parameterIndex) {
        if (this.internalMap.has(methodName)) {
            throw new Error(this.name + " was set multiple times");
        }
        this.internalMap.set(methodName, parameterIndex);
    };
    SingleParamByMethodMap.prototype.get = function (methodName, args) {
        var methodIndex = this.internalMap.get(methodName);
        if (args[methodIndex]) {
            return args[methodIndex];
        }
    };
    return SingleParamByMethodMap;
})();
exports.SingleParamByMethodMap = SingleParamByMethodMap;
