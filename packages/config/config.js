var upResolve = require('@tww/up-resolve')
var fs = require('fs')
var validate = require('jsonschema').validate
var chalk = require('chalk')

/**
 * Resolves config files, parses and combines them with priority to the nearest file
 * @param {String} fileName
 * @param {Object} options
 * @param {Object} options.schema - validation options, see https://www.npmjs.com/package/jsonschema
 * @param {boolean} options.resolvePackageJson - also include config from package.json
 * @param {String} options.packageJsonKey - key to extract config from package json. eg {version: "0.0.1", deps: {...}, myConfg: {...}} => myConfig
 */
function resolveConfig (fileName, options) {
  options = options || {}
  var schema = options.schema
  var resolvePackageJson = options.resolvePackageJson || false
  var fileNames = [fileName, resolvePackageJson ? 'package.json' : null].filter(
    item => !!item
  )
  const results = upResolve(fileNames)
  return Promise.all(results.map(readFileAsync))
    .then(parseFiles(options))
    .then(validateSchema(schema))
    .then(reduceConfigs)
}
module.exports = resolveConfig

function readFileAsync (file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve({ file, result })
      }
    })
  })
}

function validateSchema (schema) {
  return function (configs) {
    if (schema) {
      configs.forEach(config => {
        const validation = validate(config, schema)
        validation.errors.forEach(error => {
          console.warn(chalk.yellow(error))
        })
        if (!validation.valid) {
          console.error(
            chalk.red('config validation errors, see console output')
          )
        }
      })
    }

    return configs
  }
}

function parseFiles (options) {
  return filesContent =>
    filesContent
      .map(({ file, result }) => {
        try {
          const parsed = JSON.parse(result)
          if (file.match(/.*package\.json$/) && options.resolvePackageJson) {
            return parsed[options.packageJsonKey]
          }
          return parsed
        } catch (e) {
          console.warn(
            chalk.red('error parsing'),
            chalk.red(file),
            chalk.red(e.message)
          )
          return false
        }
      })
      .filter(content => !!content)
}

function reduceConfigs (parsedFiles) {
  return parsedFiles
    .reverse()
    .reduce((acc, item) => Object.assign(acc, item), {})
}
