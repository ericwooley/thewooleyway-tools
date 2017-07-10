var Worker = require('tiny-worker')
function spawnCommand (cmd, {onStdout, onStderr}) {
  const worker = new Worker(function () {
    var parse = require('parse-spawn-args').parse
    var kill = require('tree-kill')
    var {spawn} = require('child_process')
    const w = this
    w.onmessage = (event) => {
      const {type, command} = JSON.parse(event.data)
      let p
      switch (type) {
        case 'kill':
          if (p) {
            p.kill('SIGINT')
            kill(p.pid)
          }
          break

        case 'command':
          const arr = command.split(' ')
          const bin = arr[0]
          const args = arr.slice(1).join(' ')
          let parsedArgs = []
          if (args) {
            parsedArgs = parse(args)
          }
          p = spawn(bin, parsedArgs, {shell: true})
          w.postMessage(JSON.stringify({pid: p.pid, type: 'init'}))

          p.stdout.on('data', data => {
            w.postMessage(JSON.stringify({type: 'stdout', data: data + ''}))
          })
          p.stderr.on('data', data => {
            w.postMessage(JSON.stringify({type: 'stderr', data: data + ''}))
          })
          p.on('close', (code) => {
            w.postMessage(JSON.stringify({type: 'stdout', data: 'exited with code: ' + code}))
            p = null
          })
          break
      }
    }
  })
  worker.postMessage(JSON.stringify({type: 'command', command: cmd}))
  worker.onmessage = function (e) {
    const {data, type} = JSON.parse(e.data)
    switch (type) {
      case 'stdout':
        onStdout(data)
        break
      case 'stderr':
        onStderr(data)
    }
  }
  return {
    worker,
    restart: () => {
      worker.postMessage(JSON.stringify({type: 'kill', command: ''}))
      worker.postMessage(JSON.stringify({type: 'command', command: cmd}))
    },
    kill: () => {
      worker.postMessage(JSON.stringify({type: 'kill', command: ''}))
    }
  }
}
module.exports = spawnCommand
