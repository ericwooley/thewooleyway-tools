/// <reference types="lodash" />
import * as _ from 'lodash';
export declare const composeValidations: (...validations: _.CurriedFunction2<string, any, string>[]) => _.CurriedFunction2<string, any, string[]>;
export declare const mustMatchRegex: (regularExp: RegExp, error: string) => _.CurriedFunction2<string, string, string>;
export declare const mustBeOfType: (expectedType: string) => _.CurriedFunction2<string, any, string>;
export declare const noEmpty: _.CurriedFunction2<string, string, string>;
export declare const isNumber: _.CurriedFunction2<string, any, string>;
export declare const isEmail: _.CurriedFunction2<string, string, string>;
export declare const minLength: (minLength: number) => _.CurriedFunction2<string, string, string>;
export declare const maxLength: (maxLength: number) => _.CurriedFunction2<string, string, string>;
export declare const lessThan: (size: number) => _.CurriedFunction2<string, number, string>;
export declare const moreThan: (size: number) => _.CurriedFunction2<string, number, string>;
