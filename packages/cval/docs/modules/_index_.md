[@tww/cval](../README.md) > ["index"](../modules/_index_.md)



# External module: "index"

## Index

### Type aliases

* [validation](_index_.md#validation)


### Variables

* [isEmail](_index_.md#isemail)
* [isNumber](_index_.md#isnumber)
* [minLength](_index_.md#minlength)
* [noEmpty](_index_.md#noempty)


### Functions

* [composeValidations](_index_.md#composevalidations)
* [lessThan](_index_.md#lessthan)
* [maxLength](_index_.md#maxlength)
* [moreThan](_index_.md#morethan)
* [mustBeOfType](_index_.md#mustbeoftype)
* [mustMatchRegex](_index_.md#mustmatchregex)



---
## Type aliases
<a id="validation"></a>

###  validation

**Τ validation**:  *`CurriedFunction2`.<`string`>,.<`any`>,.<`string`>* 

*Defined in [index.ts:2](https://github.com/ericwooley/thewooleyway/blob/7b518d9/packages/cval/index.ts#L2)*





___


## Variables
<a id="isemail"></a>

###  isEmail

**●  isEmail**:  *`CurriedFunction2`.<`string`>,.<`string`>,.<`string`>*  =  mustMatchRegex(/^.*@.*\..*$/, 'must be a valid email')

*Defined in [index.ts:23](https://github.com/ericwooley/thewooleyway/blob/7b518d9/packages/cval/index.ts#L23)*





___

<a id="isnumber"></a>

###  isNumber

**●  isNumber**:  *`CurriedFunction2`.<`string`>,.<`any`>,.<`string`>*  =  mustBeOfType('number')

*Defined in [index.ts:21](https://github.com/ericwooley/thewooleyway/blob/7b518d9/packages/cval/index.ts#L21)*





___

<a id="minlength"></a>

###  minLength

**●  minLength**:  *`CurriedFunction3`.<`number`>,.<`string`>,.<`string`>,.<`string`>*  =  _.curry((minLength: number, name: string, input: string) =>
  input.length >= minLength ? '' : name + ' must be at least ' + minLength + ' characters')

*Defined in [index.ts:25](https://github.com/ericwooley/thewooleyway/blob/7b518d9/packages/cval/index.ts#L25)*





___

<a id="noempty"></a>

###  noEmpty

**●  noEmpty**:  *`CurriedFunction2`.<`string`>,.<`string`>,.<`string`>*  =  _.curry((name: string, input: string) =>
  input ? '' : name + ' cannot be empty')

*Defined in [index.ts:18](https://github.com/ericwooley/thewooleyway/blob/7b518d9/packages/cval/index.ts#L18)*





___


## Functions
<a id="composevalidations"></a>

###  composeValidations

► **composeValidations**(...validations: *`Array`.<[validation](_index_.md#validation)>*): `CurriedFunction2`.<`string`>,.<`any`>,.<`string`[]>




*Defined in [index.ts:4](https://github.com/ericwooley/thewooleyway/blob/7b518d9/packages/cval/index.ts#L4)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| validations | `Array`.<[validation](_index_.md#validation)>   |  - |





**Returns:** `CurriedFunction2`.<`string`>,.<`any`>,.<`string`[]>





___

<a id="lessthan"></a>

###  lessThan

► **lessThan**(size: *`number`*): `CurriedFunction2`.<`string`>,.<`number`>,.<`string`>




*Defined in [index.ts:31](https://github.com/ericwooley/thewooleyway/blob/7b518d9/packages/cval/index.ts#L31)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| size | `number`   |  - |





**Returns:** `CurriedFunction2`.<`string`>,.<`number`>,.<`string`>





___

<a id="maxlength"></a>

###  maxLength

► **maxLength**(maxLength: *`number`*): `CurriedFunction2`.<`string`>,.<`string`>,.<`string`>




*Defined in [index.ts:28](https://github.com/ericwooley/thewooleyway/blob/7b518d9/packages/cval/index.ts#L28)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| maxLength | `number`   |  - |





**Returns:** `CurriedFunction2`.<`string`>,.<`string`>,.<`string`>





___

<a id="morethan"></a>

###  moreThan

► **moreThan**(size: *`number`*): `CurriedFunction2`.<`string`>,.<`number`>,.<`string`>




*Defined in [index.ts:34](https://github.com/ericwooley/thewooleyway/blob/7b518d9/packages/cval/index.ts#L34)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| size | `number`   |  - |





**Returns:** `CurriedFunction2`.<`string`>,.<`number`>,.<`string`>





___

<a id="mustbeoftype"></a>

###  mustBeOfType

► **mustBeOfType**(expectedType: *`string`*): `CurriedFunction2`.<`string`>,.<`any`>,.<`string`>




*Defined in [index.ts:15](https://github.com/ericwooley/thewooleyway/blob/7b518d9/packages/cval/index.ts#L15)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| expectedType | `string`   |  - |





**Returns:** `CurriedFunction2`.<`string`>,.<`any`>,.<`string`>





___

<a id="mustmatchregex"></a>

###  mustMatchRegex

► **mustMatchRegex**(regularExp: *`RegExp`*, error: *`string`*): `CurriedFunction2`.<`string`>,.<`string`>,.<`string`>




*Defined in [index.ts:12](https://github.com/ericwooley/thewooleyway/blob/7b518d9/packages/cval/index.ts#L12)*



**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| regularExp | `RegExp`   |  - |
| error | `string`   |  - |





**Returns:** `CurriedFunction2`.<`string`>,.<`string`>,.<`string`>





___


