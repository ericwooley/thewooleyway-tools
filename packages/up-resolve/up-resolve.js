var fs = require('fs')
var path = require('path')
function resolveFS (fileNames, opts) {
  var currentPath = process.cwd().split(path.sep)
  return recursiveCheck(fileNames, currentPath)
}

function recursiveCheck (fileNames, pathArr) {
  if (pathArr.length < 2) {
    return []
  }
  const pathStr = pathArr.join(path.sep)
  const foundFiles = fileNames
    .map(checkFilePath(pathStr))
    .filter(i => !!i)
    .reduce((a, b) => a.concat(b), [])
  // console.log(fileNames, pathStr, '=> foundFiles', foundFiles)
  return foundFiles.concat(
    recursiveCheck(fileNames, pathArr.slice(0, pathArr.length - 1))
  )
}

function checkFilePath (pathStr) {
  return file => {
    if (typeof file === 'string') {
      const filePath = path.join(pathStr, file)
      if (fs.existsSync(filePath)) {
        return [filePath]
      } else {
        return false
      }
    } else if (file instanceof RegExp) {
      return fs
        .readdirSync(pathStr)
        .filter(potentialFile => potentialFile.match(file))
        .map(f => path.join(pathStr, f))
    }
  }
}

module.exports = resolveFS
