import * as validate from './'

describe('composeValidations', () => {
  const emailValidation = validate.composeValidations(
    validate.isEmail,
    validate.minLength(9),
    validate.maxLength(15)
  )
  it('should pass email', () =>
    expect(emailValidation('email', 'bob@bob.com')).toMatchSnapshot('composeValidations - email: valid')
  )
  it('should fail for too long', () =>
    expect(emailValidation('email', 'bob@bob.comoTheDoggo')).toMatchSnapshot('composeValidations - email: invalid: too long')
  )
  it('should fail for too short', () =>
    expect(emailValidation('email', 'a@b.c')).toMatchSnapshot('composeValidations - email: invalid: too short')
  )
  it('should fail for invalid', () =>
    expect(emailValidation('email', 'abcd1234123')).toMatchSnapshot('composeValidations - email: invalid: invalid')
  )
  it('should fail for invalid and too short', () =>
    expect(emailValidation('email', 'a')).toMatchSnapshot('composeValidations - email: invalid: invalid & too short')
  )
})

describe('isEmail', () => {
  it('should validate an email', () =>
  expect(validate.isEmail('email', 'bob@bob.com')).toMatchSnapshot('email: valid'))
  it('should invalidate an invalid email', () =>
    expect(validate.isEmail('email', 'steve')).toMatchSnapshot('email: invalid'))
})

describe('noEmpty', () => {
  it('should validate a non-empty string', () =>
  expect(validate.noEmpty('noEmpty', 'random thing')).toMatchSnapshot('noEmpty: valid'))

  it('should invalidate an empty string', () =>
    expect(validate.noEmpty('string', '')).toMatchSnapshot('noEmpty: invalid'))
})

describe('minLength', () => {
  it('should validate a length 12 string', () =>
  expect(validate.minLength(12)('minLenVal', '123456789012')).toMatchSnapshot('minLength - 12: valid'))

  it('should validate a length 13 string', () =>
  expect(validate.minLength(12)('minLenVal', '1234567890123')).toMatchSnapshot('minLength - 13: valid'))

  it('should validate a length 11 string', () =>
  expect(validate.minLength(12)('minLenVal', '12345678901')).toMatchSnapshot('minLength - 11: invalid'))
})

describe('maxLength', () => {
  it('should validate a length 12 string', () =>
  expect(validate.maxLength(12)('maxLenVal', '123456789012')).toMatchSnapshot('maxLength - 12: valid'))

  it('should validate a length 11 string', () =>
  expect(validate.maxLength(12)('maxLenVal', '123456789011')).toMatchSnapshot('maxLength - 11: valid'))

  it('should invalidate a length 13 string', () =>
  expect(validate.maxLength(12)('maxLenVal', '1234567890123')).toMatchSnapshot('maxLength - 13: invalid'))
})

describe('isNumber', () => {
  it('should validate a number', () =>
    expect(validate.isNumber('number', 12)).toMatchSnapshot('number: valid'))

  it('should invalidate an invalid Number', () =>
    expect(validate.isNumber('number', 'steve' as any)).toMatchSnapshot('number: invalid'))
})

describe('mustMatchRegex', () => {
  it('should validate passing regexes',
    () => expect(
      validate.mustMatchRegex(/^[abcd]$/, 'must be a, b, c, or d')('alphabet', 'a')
    ).toMatchSnapshot('mustMatchRegex: valid')
  )
  it('should invalidate passing regexes',
    () => expect(
      validate.mustMatchRegex(/^[abcd]$/, 'must be a, b, c, or d')('alphabet', 'f')
    ).toMatchSnapshot('mustMatchRegex: invalid')
  )
})

describe('mustBeOfType', () => {
  it('should validate passing regexes',
    () => expect(
      validate.mustBeOfType('string')('mustBeofType', 'asdfasdf')
    ).toMatchSnapshot('mustBeOfType: valid')
  )
  it('should invalidate passing regexes',
    () => expect(
      validate.mustBeOfType('string')('mustBeofType', 12)
    ).toMatchSnapshot('mustBeOfType: invalid')
  )
})

describe('lessThan', () => {
  it('should validate a length 12 string', () =>
  expect(validate.lessThan(12)('number', 10)).toMatchSnapshot('lessThan - 12: valid'))

  it('should validate a length 13 string', () =>
  expect(validate.lessThan(12)('number', -13)).toMatchSnapshot('lessThan - -13: valid'))

  it('should validate a length 11 string', () =>
  expect(validate.lessThan(12)('number', 47)).toMatchSnapshot('lessThan - 47: invalid'))
})

describe('moreThan', () => {
  it('should validate a length 25 string', () =>
  expect(validate.moreThan(-12)('number', 25)).toMatchSnapshot('moreThan - 25: valid'))

  it('should validate a length 13 string', () =>
  expect(validate.moreThan(-12)('number', -5)).toMatchSnapshot('moreThan - -5: valid'))

  it('should validate a length 11 string', () =>
  expect(validate.moreThan(12)('number', 0)).toMatchSnapshot('moreThan - 0: invalid'))
})
