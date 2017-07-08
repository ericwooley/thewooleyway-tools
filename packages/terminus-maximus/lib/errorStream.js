var stream = require('stream')
var { red } = require('chalk')
var { createScreenBufferStreamer } = require('./bufferDispay')

function createErrorStream (config, screen, forceRender) {
  const errorStream = new stream.PassThrough()
  const blessedConfig = {
    left: 0,
    bottom: 0,
    label: 'Errors',
    width: '100%',
    height: config.errorHeight + '%'
  }
  const errorDisplay = createScreenBufferStreamer(
    screen,
    errorStream,
    blessedConfig,
    { textWrapper: red, restartButton: false, killButton: false, clearButton: false, forceRender }
  )
  return {errorStream, errorDisplay, blessedConfig}
}

module.exports = createErrorStream
