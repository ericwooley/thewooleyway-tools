#!/usr/bin/env node

var { resolveConfig } = require('@tww/config')
// var createTopScreen = require('../lib/topStream')
var path = require('path')
var fs = require('fs')
var [, , scriptToExecute] = process.argv
var { renderScreens } = require('../lib/renderScreens')

resolveConfig('.terminusMaximus', {
  schema: fs.readFileSync(path.join(__dirname, '../schema.json'))
}).then(config => renderScreens(config, scriptToExecute))
