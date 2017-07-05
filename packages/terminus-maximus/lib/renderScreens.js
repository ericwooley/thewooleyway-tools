var kill = require('tree-kill')
var { createScreenBufferStreamer } = require('./bufferDispay')
var { initScreen } = require('./screen')
var createErrorScreen = require('./errorStream')
var screen = initScreen()
var shelljs = require('shelljs')
var endOfLine = require('os').EOL
var stream = require('stream')
/**
 * @typedef TerminusMaximusConfig
 * @property {Number} errorHeight - The height for the error console
 * @property {Object<string, CommandConfig>} scripts - Config for each command group to run
 * @property {Number} screensPerRow - The number of screens per row
 */

/**
 * @typedef ScriptConfig
 * @property {Number} screensPerRow - Number of strings per row
 * @property {Array.CommandConfig} commands - Commands to run
 */

/**
 * Config for a command.
 * @typedef {Object} CommandConfig
 * @property {String} label - The label to show in above your command
 * @property {String} command - Command to run
 * @property {Object} screenConfig - Blessed.Screen Config
 */

/**
 * Renders the screens and executes the script group
 * @param {TerminusMaximusConfig} config -- terminus maximus config object
 * @param {String} scriptToExecute - which script to execute from the config
 */

function renderScreens (config, scriptToExecute) {
  config = Object.assign(
    {
      errorHeight: 20
    },
    config
  )

  const errorStream = createErrorScreen(config, screen)
  const scriptDefinition = Object.assign({screensPerRow: 2}, config.scripts[scriptToExecute])
  const screensPerRow = scriptDefinition.screensPerRow
  const defaultHeight = (100 - config.errorHeight) /
    Math.ceil(scriptDefinition.commands.length / screensPerRow)
  const defaultScreenConfig = {
    width: '50%',
    height: defaultHeight + '%'
  }
  const userScreens = scriptDefinition.commands.map((scriptConfig, index) => {
    const proc = createProcess(scriptConfig, errorStream)
    const row = Math.floor(index / screensPerRow)
    const top = defaultHeight * row
    const width = Math.floor(100 / screensPerRow)
    const left = index % screensPerRow * width
    const blessedOptions = Object.assign(
      {
        top: top + '%',
        width: width + '%',
        left: left + '%',
        label: scriptConfig.label || scriptConfig.command
      },
      defaultScreenConfig,
      scriptConfig.screenConfig
    )
    var {
      streamer: screenWriter,
      container,
      restartButton,
      killButton
    } = createScreenBufferStreamer(screen, proc.stdout, blessedOptions, {})
    killButton.on('click', proc.kill)
    restartButton.on('click', proc.restart)
    container.on('click', () =>
      fullScreenToggle({
        container,
        userScreens,
        config,
        blessedOptions
      })
    )
    return {
      fullscreen: false,
      screenWriter,
      container,
      proc
    }
  })

  errorStream.on('click', () => {
    fullScreenToggle({
      container: errorStream, config, userScreens, blessedOptions: {}
    })
  })

  const childProcesses = [
    ...userScreens
    // createTopScreen(config, screen, userScreens) // Not stable yet
  ]

  function shutDown (code) {
    return event => {
      screen.destroy()
      childProcesses.forEach(p => {
        p.proc.getProcess().stdin.pause()
        p.proc.getProcess().kill('SIGKILL')
        kill(p.pid, 'SIGKILL')
      })
      process.exit(code)
    }
  }

  screen.key('C-q', shutDown(0))
  screen.key('C-c', shutDown(0))
  screen.key('C-d', shutDown(0))

  screen.render()
}
module.exports.renderScreens = renderScreens

function pushLines (str, data, push) {
  const lines = data.split(endOfLine)
  const label = ('              ' + str + ': ').slice(-25)
  lines.map(line => label + line).forEach(push)
}

function fullScreenToggle ({ container, userScreens, config, blessedOptions }) {
  if (!container.fullscreen) {
    userScreens.filter(screen => screen.container !== container).forEach(s => {
      s.container.hide()
    })
    container.fullscreen = true
    container.top = 0
    container.left = 0
    container.width = '100%'
    container.height = 100 - config.errorHeight + '%'
  } else {
    userScreens.filter(screen => screen !== container).forEach(s => {
      s.container.show()
    })
    container.fullscreen = false
    container.top = blessedOptions.top
    container.left = blessedOptions.left
    container.width = blessedOptions.width
    container.height = blessedOptions.height
  }
}

function createProcess (processConfig, errorStream) {
  const stdout = new stream.PassThrough()
  const startStream = () => {
    const p = shelljs.exec(processConfig.command, {
      async: true,
      silent: true
    })
    p.stdout.on('data', data => {
      data.split(endOfLine).forEach(l => {
        stdout.push(l)
      })
    })
    p.stderr.on('data', data => {
      pushLines(processConfig.label || processConfig.command, data, line =>
        errorStream.push(line)
      )
    })
    return p
  }
  let proc = startStream()

  return {
    getProcess: () => proc,
    stdout,
    getPid: () => proc.pid,
    kill: () => {
      kill(proc.pid)
      stdout.push('')
      stdout.push('-------------- killed by user --------------')
      stdout.push('')
    },
    restart: () => {
      stdout.push('')
      stdout.push('-------------- restarting --------------')
      stdout.push('')
      kill(proc.pid)
      proc = startStream()
    }
  }
}
