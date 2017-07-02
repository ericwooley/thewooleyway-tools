var shelljs = require('shelljs')
var { red } = require('chalk')
var { createScreenBufferStreamer } = require('./bufferDispay')

function createErrorStream (config, screen, userScreens) {
  const pids = '(' + userScreens.map(p => p.pid).join('|') + ')'
  const topCommand = 'top | grep ' + pids
  var p = shelljs.exec(topCommand, { async: true, silent: true })
  var screenWriter = createScreenBufferStreamer(
    screen,
    p.stdout,
    {
      right: 0,
      bottom: 0,
      label: 'Stats "' + topCommand + '"',
      width: '50%',
      height: config.errorHeight + '%'
    },
    red,
    { replaceScreenOnNewData: true }
  )
  return {
    screenWriter,
    pid: p.pid,
    p
  }
}

module.exports = createErrorStream
