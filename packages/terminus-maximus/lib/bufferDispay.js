var blessed = require('blessed')
var defaultOptions = {
  replaceScreenOnNewData: false,
  textWrapper: text => text,
  killButton: true,
  restartButton: true,
  clearButton: true
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
    containerOptions, {
      label: ' ✉ ' + containerOptions.label
    }
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
  let restartLabel = ''
  let restartlabelwidth = 0
  let restartButton
  if (options.restartButton) {
    restartLabel = ' ↻ '
    restartlabelwidth = restartLabel.length + 2
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
  let killLabel = ''
  let killLabelWidth = 0
  let killButton
  if (options.killButton) {
    killLabel = ' ✗ '
    killLabelWidth = killLabel.length + 2
    killButton = blessed.button({
      parent: container,
      width: killLabel.length,
      height: 1,
      left: restartlabelwidth,
      content: killLabel,
      style: {
        bg: 'red'
      }
    })
  }

  let clearLabel = ''
  let clearLabelWidth = 0
  let clearButton
  if (options.clearButton) {
    clearLabel = ' Ϫ '
    clearLabelWidth = clearLabel.length + 2
    clearButton = blessed.button({
      parent: container,
      width: clearLabel.length,
      height: 1,
      left: killLabelWidth + restartlabelwidth,
      content: clearLabel,
      style: {
        bg: 'blue'
      }
    })
    clearButton.on('click', () => {
      streamer.setContent('')
      screen.render()
    })
  }
  inputBuffer.on('data', function (data) {
    if (options.replaceScreenOnNewData) {
      streamer.setContent(data + '')
    } else {
      streamer.pushLine(options.textWrapper(data + '').replace("{", "\\{").replace("}", "\\}"))
    }
    streamer.scroll(Number.MAX_VALUE)
    options.forceRender()
  })
  return {
    killButton,
    container,
    streamer,
    restartButton
  }
}
module.exports.createScreenBufferStreamer = createScreenBufferStreamer
