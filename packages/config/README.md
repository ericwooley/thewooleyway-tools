# tww [![NPM version](https://badge.fury.io/js/tww.svg)](https://npmjs.org/package/tww) [![Build Status](https://travis-ci.org/Eric%20Wooley/tww.svg?branch=master)](https://travis-ci.org/Eric%20Wooley/tww)

> Specify a config file name, and search up the directory tree for matching JSON files. Combining them into a config object.

## Installation

```sh
$ npm install --save @tww/config
```

## Usage

```js
var {resolveConfig} = require('@tww/config');
const config = resolveConfig('.my-project-config');
```

## API
<a name="resolveConfig"></a>

### module.exports.resolveConfig(fileName, options)
Resolves config files, parses and combines them with priority to the nearest file

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| fileName | <code>String</code> |  |
| options | <code>Object</code> |  |
| options.schema | <code>Object</code> | validation options, see https://www.npmjs.com/package/jsonschema |
| options.resolvePackageJson | <code>boolean</code> | also include config from package.json |
| options.packageJsonKey | <code>String</code> | key to extract config from package json. eg {version: "0.0.1", deps: {...}, myConfg: {...}} => myConfig |

## License

MIT © [Eric Wooley](github.com/ericwooley)

