var blessed = require('blessed')
var defaultOptions = {
  replaceScreenOnNewData: false,
  textWrapper: text => text
}
function createScreenBufferStreamer (
  screen,
  inputBuffer,
  textOptions,
  options = defaultOptions
) {
  options = Object.assign({}, defaultOptions, options)
  var streamer = blessed.text(
    Object.assign(
      {},
      {
        scrollable: true,
        alwaysScroll: true,
        parent: screen,
        // left: 0,
        // top: 0,
        // width: "50%",
        mouse: true,
        // height: "50%",
        tags: true,
        border: {
          type: 'line'
        }
      },
      textOptions
    )
  )

  inputBuffer.on('data', function (data) {
    if (options.replaceScreenOnNewData) {
      streamer.setContent(data + '')
    } else {
      streamer.pushLine(options.textWrapper(data + ''))
    }
    streamer.scroll(Number.MAX_VALUE)
  })
  streamer.on('click')
  return streamer
}
module.exports.createScreenBufferStreamer = createScreenBufferStreamer
