"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
exports.composeValidations = function () {
    var validations = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        validations[_i] = arguments[_i];
    }
    return _.curry(function (name, input) {
        return validations
            .map(function (validation) { return validation(name, input); })
            .filter(function (error) { return error; });
    });
};
exports.mustMatchRegex = function (regularExp, error) { return _.curry(function (name, input) {
    return (input + '').match(regularExp) ? '' : [name, error].join(' ');
}); };
exports.mustBeOfType = function (expectedType) { return _.curry(function (name, input) {
    return typeof input === expectedType ? '' : name + ' must be a ' + expectedType;
}); };
exports.noEmpty = _.curry(function (name, input) {
    return input ? '' : name + ' cannot be empty';
});
exports.isNumber = exports.mustBeOfType('number');
exports.isEmail = exports.mustMatchRegex(/^.*@.*\..*$/, 'must be a valid email');
exports.minLength = function (minLength) { return _.curry(function (name, input) {
    return input.length >= minLength ? '' : name + ' must be at least ' + minLength + ' characters';
}); };
exports.maxLength = function (maxLength) { return _.curry(function (name, input) {
    return input.length <= maxLength ? '' : name + ' must be at most ' + maxLength + ' characters';
}); };
exports.lessThan = function (size) { return _.curry(function (name, input) {
    return input < size ? '' : name + ' must be at less than ' + size;
}); };
exports.moreThan = function (size) { return _.curry(function (name, input) {
    return input > size ? '' : name + ' must be at more than ' + size;
}); };
//# sourceMappingURL=index.js.map