# @tww/up-resolve [![npm version](https://badge.fury.io/js/%40tww%2Fup-resolve.svg)](https://badge.fury.io/js/%40tww%2Fup-resolve)

> Search up the directory tree from your cwd for specific files.

## Installation

```sh
$ npm install --save tww
```

## Usage

Up resolve starts at the current working directory, and walks up the tree, looking for files/directories that match the string, or the regex patten. 

returns an array of files that match your file pattern.
```js
var upResolve = require('@tww/up-resolve');
console.log(upResolve(['package.json']))
// [ '/Users/ericwooley/Dropbox/projects/appgen/packages/up-resolve/package.json',
//  '/Users/ericwooley/Dropbox/projects/appgen/package.json' ]
```

## API
<a name="resolveFS"></a>

### module.exports.resolveFS(fileNames, opts)
**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| fileNames | <code>Array.&lt;(String\|Regex)&gt;</code> | An array of file names or regex patterns to search for |
| opts | <code>Object</code> | does nothing yet, reserved. |


## License

MIT © [Eric Wooley](github.com/ericwooley)
