var mock = require('mock-fs')
var findConfig = require('../up-resolve')
var path = require('path')
describe('find-config', () => {
  describe('package.jsons', () => {
    beforeEach(() => {
      mock(
        {
          '../package.json': JSON.stringify({ name: 'upOne' }),
          '../../package.json': JSON.stringify({ name: 'upTwo' }),
          '../../packg.jsn': JSON.stringify({ name: 'mispelled package json' }),
          '../packageFolder': {}
        },
        {
          createCwd: true
        }
      )
    })
    afterEach(() => {
      mock.restore()
    })
    it('should find all the package.json files', () => {
      expect(findConfig(['package.json'])).toEqual([
        path.join(__dirname, '../../package.json'),
        path.join(__dirname, '../../../package.json')
      ])
    })
    it('should find files based on a pattern', () => {
      expect(findConfig([/pack.*\.j.*/])).toEqual([
        path.join(__dirname, '../../package.json'),
        path.join(__dirname, '../../../package.json'),
        path.join(__dirname, '../../../packg.jsn')
      ])
    })
    it('should find folders and files based on a pattern', () => {
      expect(findConfig([/package(Folder|.json)/])).toEqual([
        path.join(__dirname, '../../package.json'),
        path.join(__dirname, '../../packageFolder'),
        path.join(__dirname, '../../../package.json')
      ])
    })
  })
})
