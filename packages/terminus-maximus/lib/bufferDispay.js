var blessed = require('blessed')
var defaultOptions = {
  replaceScreenOnNewData: false,
  textWrapper: text => text
}
function createScreenBufferStreamer (
  screen,
  inputBuffer,
  containerOptions,
  options = defaultOptions
) {
  const containerScreenOptions = Object.assign(
    {
      parent: screen,
      mouse: true,
      border: {
        type: 'line'
      }
    },
    containerOptions
  )
  options = Object.assign({}, defaultOptions, options)
  const container = blessed.box(containerScreenOptions)
  const streamer = blessed.box({
    parent: container,
    scrollable: true,
    alwaysScroll: true,
    top: 1,
    width: '100%',
    mouse: true,
    bottom: 0,
    tags: true
  })
  const restartLabel = ' ↻ '
  const restartButton = blessed.button({
    parent: container,
    width: restartLabel.length,
    height: 1,
    content: restartLabel,
    style: {
      bg: 'green'
    }
  })
  const killLabel = ' ✗ '
  const killButton = blessed.button({
    parent: container,
    width: killLabel.length,
    height: 1,
    left: restartLabel.length,
    content: killLabel,
    style: {
      bg: 'red'
    }
  })

  inputBuffer.on('data', function (data) {
    if (options.replaceScreenOnNewData) {
      streamer.setContent(data + '')
    } else {
      streamer.pushLine(Date.now() + options.textWrapper(data + ''))
    }
    streamer.scroll(Number.MAX_VALUE)
    screen.render()
  })
  // streamer.on('click')
  return {
    killButton,
    container,
    streamer,
    restartButton
  }
}
module.exports.createScreenBufferStreamer = createScreenBufferStreamer
