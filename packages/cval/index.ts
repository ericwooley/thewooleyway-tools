import * as _ from 'lodash'
type validation = _.CurriedFunction2<string, any, string>

export const composeValidations = (...validations: Array<validation>) =>
_.curry((name: string, input: any) =>
  validations
    .map(validation => validation(name, input))
    // remove empty errors
    .filter(error => error)
)

export const mustMatchRegex = (regularExp: RegExp, error: string) => _.curry((name: string, input: string) =>
  (input + '').match(regularExp) ? '' : [name, error].join(' '))

export const mustBeOfType = (expectedType: string) => _.curry((name: string, input: any) =>
typeof input === expectedType ? '' : name + ' must be a ' + expectedType)

export const noEmpty = _.curry((name: string, input: string) =>
  input ? '' : name + ' cannot be empty')

export const isNumber = mustBeOfType('number')

export const isEmail = mustMatchRegex(/^.*@.*\..*$/, 'must be a valid email')

export const minLength = _.curry((minLength: number, name: string, input: string) =>
  input.length >= minLength ? '' : name + ' must be at least ' + minLength + ' characters')

export const maxLength = (maxLength: number) => _.curry((name: string, input: string) =>
  input.length <= maxLength ? '' : name + ' must be at most ' + maxLength + ' characters')

export const lessThan = (size: number) => _.curry((name: string, input: number) =>
  input < size ? '' : name + ' must be at less than ' + size )

export const moreThan = (size: number) => _.curry((name: string, input: number) =>
  input > size ? '' : name + ' must be at more than ' + size )
