Up Resolve
==========

Up resolve starts at the current working directory, and walks up the tree, looking for files/directories that match the string, or the regex patten.

```js
console.log(upResolve(['package.json']))
// [ '/Users/ericwooley/Dropbox/projects/appgen/packages/up-resolve/package.json',
//  '/Users/ericwooley/Dropbox/projects/appgen/package.json' ]

```
