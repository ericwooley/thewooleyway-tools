#!/usr/bin/env node

process.title = 'nativish-dev.js'
var kill = require('tree-kill')
var { initScreen } = require('../lib/screen')
var { createScreenBufferStreamer } = require('../lib/bufferDispay')
var screen = initScreen()
var shelljs = require('shelljs')
var { resolveConfig } = require('@tww/config')
var createErrorScreen = require('../lib/errorStream')
// var createTopScreen = require('../lib/topStream')
var endOfLine = require('os').EOL
var path = require('path')
var fs = require('fs')

var [, , scriptToExecute] = process.argv

// example config

// {
//   "errorHeight": 20,
//   "scripts": {
//     "ping": [
//       {
//         "label": "ping",
//         "command": "ping www.google.com",
//         "screenConfig": {}
//       }
//     ]
//   }
// }

resolveConfig('.terminusMaximus', {
  schema: fs.readFileSync(path.join(__dirname, '../schema.json'))
}).then(config => {
  config = Object.assign(
    {
      errorHeight: 20,
      screensPerRow: 2
    },
    config
  )

  const errorStream = createErrorScreen(config, screen)
  const scriptDefinition = config.scripts[scriptToExecute]
  const screensPerRow = config.screensPerRow
  const defaultHeight =
    (100 - config.errorHeight) /
    Math.ceil(scriptDefinition.length / screensPerRow)
  const defaultScreenConfig = {
    width: '50%',
    height: defaultHeight + '%'
  }

  const userScreens = scriptDefinition.map((scriptConfig, index) => {
    var p = shelljs.exec(scriptConfig.command, { async: true, silent: true })
    const row = Math.floor(index / screensPerRow)
    const top = defaultHeight * row
    const width = Math.floor(100 / screensPerRow)
    const left = index % screensPerRow * width
    p.stderr.on('data', data => {
      pushLines(scriptConfig.label || scriptConfig.command, data, line =>
        errorStream.push(line)
      )
    })

    var screenWriter = createScreenBufferStreamer(
      screen,
      p.stdout,
      Object.assign(
        {
          top: top + '%',
          width: width + '%',
          left: left + '%',
          label: scriptConfig.label || scriptConfig.command
        },
        defaultScreenConfig,
        scriptConfig.screenConfig
      )
    )
    return {
      screenWriter,
      pid: p.pid,
      p
    }
  })

  const childProcesses = [
    ...userScreens
    // createTopScreen(config, screen, userScreens) // Not stable yet
  ]

  function shutDown () {
    screen.destroy()
    childProcesses.map(p => p.pid).forEach(pid => kill(pid))
  }

  screen.key('C-q', shutDown)
  screen.key('C-c', shutDown)
  screen.key('C-d', shutDown)

  screen.render()
})

function pushLines (str, data, push) {
  const lines = data.split(endOfLine)
  const label = ('              ' + str + ': ').slice(-25)
  lines.map(line => label + line).forEach(push)
}
