var blessed = require('blessed')
var defaultOptions = {
  replaceScreenOnNewData: false,
  textWrapper: text => text,
  killButton: true,
  restartButton: true
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
    top: (options.killButton || options.restartButton) ? 1 : 0,
    width: '100%',
    mouse: true,
    bottom: 0,
    tags: true
  })
  let restartLabel
  let restartButton
  if (options.restartButton) {
    restartLabel = ' ↻ '
    restartButton = blessed.button({
      parent: container,
      width: restartLabel.length,
      height: 1,
      content: restartLabel,
      style: {
        bg: 'green'
      }
    })
  }
  let killLabel
  let killButton
  if (options.killButton) {
    killLabel = ' ✗ '
    killButton = blessed.button({
      parent: container,
      width: killLabel.length,
      height: 1,
      left: restartLabel.length + 2,
      content: killLabel,
      style: {
        bg: 'red'
      }
    })
  }

  inputBuffer.on('data', function (data) {
    if (options.replaceScreenOnNewData) {
      streamer.setContent(data + '')
    } else {
      streamer.pushLine(options.textWrapper(data + ''))
    }
    streamer.scroll(Number.MAX_VALUE)
    screen.render()
  })
  return {
    killButton,
    container,
    streamer,
    restartButton
  }
}
module.exports.createScreenBufferStreamer = createScreenBufferStreamer
