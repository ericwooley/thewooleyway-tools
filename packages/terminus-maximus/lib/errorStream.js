var stream = require('stream')
var { red } = require('chalk')
var { createScreenBufferStreamer } = require('./bufferDispay')

function createErrorStream (config, screen) {
  const errorStream = new stream.PassThrough()
  createScreenBufferStreamer(
    screen,
    errorStream,
    {
      left: 0,
      bottom: 0,
      label: 'Errors',
      width: '100%',
      height: config.errorHeight + '%'
    },
    { textWrapper: red, restartButton: false, killButton: false }
  )
  return errorStream
}

module.exports = createErrorStream
