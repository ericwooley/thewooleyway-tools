"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validate = require("./");
describe('composeValidations', function () {
    var emailValidation = validate.composeValidations(validate.isEmail, validate.minLength(9), validate.maxLength(15));
    it('should pass email', function () {
        return expect(emailValidation('email', 'bob@bob.com')).toMatchSnapshot("composeValidations - email: valid");
    });
    it('should fail for too long', function () {
        return expect(emailValidation('email', 'bob@bob.comoTheDoggo')).toMatchSnapshot("composeValidations - email: invalid: too long");
    });
    it('should fail for too short', function () {
        return expect(emailValidation('email', 'a@b.c')).toMatchSnapshot("composeValidations - email: invalid: too short");
    });
    it('should fail for invalid', function () {
        return expect(emailValidation('email', 'abcd1234123')).toMatchSnapshot("composeValidations - email: invalid: invalid");
    });
    it('should fail for invalid and too short', function () {
        return expect(emailValidation('email', 'a')).toMatchSnapshot("composeValidations - email: invalid: invalid & too short");
    });
});
describe('isEmail', function () {
    it('should validate an email', function () {
        return expect(validate.isEmail('email', 'bob@bob.com')).toMatchSnapshot('email: valid');
    });
    it('should invalidate an invalid email', function () {
        return expect(validate.isEmail('email', 'steve')).toMatchSnapshot('email: invalid');
    });
});
describe('noEmpty', function () {
    it('should validate a non-empty string', function () {
        return expect(validate.noEmpty('noEmpty', 'random thing')).toMatchSnapshot('noEmpty: valid');
    });
    it('should invalidate an empty string', function () {
        return expect(validate.noEmpty('string', '')).toMatchSnapshot('noEmpty: invalid');
    });
});
describe('minLength', function () {
    it('should validate a length 12 string', function () {
        return expect(validate.minLength(12)('minLenVal', '123456789012')).toMatchSnapshot('minLength - 12: valid');
    });
    it('should validate a length 13 string', function () {
        return expect(validate.minLength(12)('minLenVal', '1234567890123')).toMatchSnapshot('minLength - 13: valid');
    });
    it('should validate a length 11 string', function () {
        return expect(validate.minLength(12)('minLenVal', '12345678901')).toMatchSnapshot('minLength - 11: invalid');
    });
});
describe('maxLength', function () {
    it('should validate a length 12 string', function () {
        return expect(validate.maxLength(12)('maxLenVal', '123456789012')).toMatchSnapshot('maxLength - 12: valid');
    });
    it('should validate a length 11 string', function () {
        return expect(validate.maxLength(12)('maxLenVal', '123456789011')).toMatchSnapshot('maxLength - 11: valid');
    });
    it('should invalidate a length 13 string', function () {
        return expect(validate.maxLength(12)('maxLenVal', '1234567890123')).toMatchSnapshot('maxLength - 13: invalid');
    });
});
describe('isNumber', function () {
    it('should validate a number', function () {
        return expect(validate.isNumber('number', 12)).toMatchSnapshot('number: valid');
    });
    it('should invalidate an invalid Number', function () {
        return expect(validate.isNumber('number', 'steve')).toMatchSnapshot('number: invalid');
    });
});
describe('mustMatchRegex', function () {
    it('should validate passing regexes', function () { return expect(validate.mustMatchRegex(/^[abcd]$/, 'must be a, b, c, or d')('alphabet', 'a')).toMatchSnapshot('mustMatchRegex: valid'); });
    it('should invalidate passing regexes', function () { return expect(validate.mustMatchRegex(/^[abcd]$/, 'must be a, b, c, or d')('alphabet', 'f')).toMatchSnapshot('mustMatchRegex: invalid'); });
});
describe('mustBeOfType', function () {
    it('should validate passing regexes', function () { return expect(validate.mustBeOfType('string')('mustBeofType', 'asdfasdf')).toMatchSnapshot('mustBeOfType: valid'); });
    it('should invalidate passing regexes', function () { return expect(validate.mustBeOfType('string')('mustBeofType', 12)).toMatchSnapshot('mustBeOfType: invalid'); });
});
describe('lessThan', function () {
    it('should validate a length 12 string', function () {
        return expect(validate.lessThan(12)('number', 10)).toMatchSnapshot('lessThan - 12: valid');
    });
    it('should validate a length 13 string', function () {
        return expect(validate.lessThan(12)('number', -13)).toMatchSnapshot('lessThan - -13: valid');
    });
    it('should validate a length 11 string', function () {
        return expect(validate.lessThan(12)('number', 47)).toMatchSnapshot('lessThan - 47: invalid');
    });
});
describe('moreThan', function () {
    it('should validate a length 25 string', function () {
        return expect(validate.moreThan(-12)('number', 25)).toMatchSnapshot('moreThan - 25: valid');
    });
    it('should validate a length 13 string', function () {
        return expect(validate.moreThan(-12)('number', -5)).toMatchSnapshot('moreThan - -5: valid');
    });
    it('should validate a length 11 string', function () {
        return expect(validate.moreThan(12)('number', 0)).toMatchSnapshot('moreThan - 0: invalid');
    });
});
//# sourceMappingURL=index.test.js.map