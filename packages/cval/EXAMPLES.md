# @tww/cval Composable Validation!
_comes with typescript definitions_

`npm install --save @tww/cval`

Examples
```js
import cval from '@tww/cval'
  // using validations individually
  const validResultFromEmail = cval.isEmail('myEmailFeild', 'bob@bob.com')

  // '' because bob@bob.com is valid
  console.log('email error', validResultFromEmail)

  const invalidResultFromEmail = cval.isEmail('myEmailFeild', 'bob$bob.com')
  
  // 'myEmailField must be a valid email' because bob$bob.com is invalid
  console.log('email error', validResultFromEmail)


  const validateEmail = cval.composeValidations(
    cval.isEmail,
    cval.minLength(6),
    cval.maxLength(15)
  )

  // empty array is returned, no errors
  let errors = validateEmail('myEmailField', 'steve@bob.com')
  console.log(errors.length) // 0 
  
  // steve@bobcom is not a valid email
  errors = validateEmail('myEmailField', 'steve@bobcom')
  console.log(errors.length, errors) // 1 error returned
  // ['myEmailField must be a valid email'] 

  // a@bc is not a valid email, and it's too short!
  errors = validateEmail('myEmailField', 'a@bc')
  console.log(errors.length, errors) // 1 error returned
  // ['myEmailField must be a valid email', 'myEmailField must be at least 9 characters'] 

```
