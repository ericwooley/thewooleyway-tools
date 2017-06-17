// @flow
import shelljs from 'shelljs'
import mockfs from 'mock-fs'
import path from 'path'
describe('cli', () => {
  describe('arguments', () => {
    it('should print help', () => {
      expect(() => executeCLI(['--help'], { silent: true })).toThrow()
    })
  })
  describe('plugins', () => {
    beforeEach(() => {
      mockfs()
    })
    afterEach(() => {
      mockfs.restore()
    })
  })
})

function execCommand (command, options) {
  const commandResult = shelljs.exec(command, { silent: true })
  if (shelljs.code !== 0) {
    if (!options.silent) {
      console.error(commandResult.stdout)
    }
    throw new Error(`'${command}' failed`)
  }
  return commandResult.stdout
}

function executeCLI (args: string[]) {
  return execCommand(
    'babel-node ' + path.join(__dirname, '../cli.js') + ' ' + args.join(' ')
  )
}
