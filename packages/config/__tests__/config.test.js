var resolveConfig = require('../config')
var mock = require('mock-fs')
describe('resolve config', () => {
  describe('basic reading', () => {
    beforeEach(() => {
      const oneUpConfig = { overwriteConfig: 'oneUp', oneUpOnly: true }
      const twoUpConfig = { overwriteConfig: 'twoUp', twoUpOnly: true }
      const threeUpConfig = { overwriteConfig: 'threeUp', threeUpOnly: true }
      mock(
        {
          './.test': JSON.stringify(oneUpConfig),
          '../.test': JSON.stringify(twoUpConfig),
          '../../.test': JSON.stringify(threeUpConfig)
        },
        {
          createCwd: true
        }
      )
    })
    afterEach(() => {
      mock.restore()
    })
    it('should read test config with priority given to closest file', () => {
      return resolveConfig('.test').then(result => {
        expect(result).toEqual({
          overwriteConfig: 'oneUp',
          oneUpOnly: true,
          twoUpOnly: true,
          threeUpOnly: true
        })
      })
    })
  })
  describe('package.json config', () => {
    beforeEach(() => {
      const oneUpConfig = { overwriteConfig: 'oneUp', oneUpOnly: true }
      const twoUpConfig = { overwriteConfig: 'twoUp', twoUpOnly: true }
      const threeUpConfig = { overwriteConfig: 'threeUp', threeUpOnly: true }
      mock(
        {
          './.test': JSON.stringify(oneUpConfig),
          '../package.json': JSON.stringify({ myConfig: twoUpConfig }),
          '../../package.json': JSON.stringify({ myConfig: threeUpConfig })
        },
        {
          createCwd: true
        }
      )
    })
    afterEach(() => {
      mock.restore()
    })
    it('should read package.json config with priority given to closest file', () => {
      return resolveConfig('.test', {
        resolvePackageJson: true,
        packageJsonKey: 'myConfig'
      }).then(result => {
        expect(result).toEqual({
          overwriteConfig: 'oneUp',
          oneUpOnly: true,
          twoUpOnly: true,
          threeUpOnly: true
        })
      })
    })
  })
  describe('no config', () => {
    beforeEach(() => {
      mock(
        {},
        {
          createCwd: true
        }
      )
    })
    afterEach(() => {
      mock.restore()
    })
    it('should return an empty object', () => {
      return resolveConfig('.test').then(result => {
        expect(result).toEqual({})
      })
    })
  })
  describe('malformed config', () => {
    const originalWarn = console.warn
    beforeEach(() => {
      const twoUpConfig = { overwriteConfig: 'twoUp', twoUpOnly: true }
      const threeUpConfig = { overwriteConfig: 'threeUp', threeUpOnly: true }
      mock(
        {
          './.test': 'asdfasdfasdf',
          '../.test': JSON.stringify(twoUpConfig),
          '../../.test': JSON.stringify(threeUpConfig)
        },
        {
          createCwd: true
        }
      )
    })
    afterEach(() => {
      mock.restore()
      console.warn = originalWarn
    })
    it('should ignore a malformed config', () => {
      console.warn = jest.fn()
      return resolveConfig('.test').then(result => {
        expect(result).toEqual({
          overwriteConfig: 'twoUp',
          threeUpOnly: true,
          twoUpOnly: true
        })
        expect(console.warn).toHaveBeenCalledTimes(1)
      })
    })
  })
  describe('schema validation', () => {
    const originalWarn = console.warn
    const originalError = console.originalError
    beforeEach(() => {
      mock(
        {
          './.test': JSON.stringify({ num: 127 })
        },
        {
          createCwd: true
        }
      )
    })
    afterEach(() => {
      mock.restore()
      console.warn = originalWarn
      console.error = originalError
    })
    it('should pass with a valid schema', () => {
      console.warn = jest.fn()
      console.error = jest.fn()
      return resolveConfig('.test', {
        schema: {
          type: 'object',
          properties: {
            num: {
              type: 'number'
            }
          }
        }
      }).then(result => {
        expect(result).toEqual({
          num: 127
        })
      })
    })
    it('should fail pass with an invalid schema', () => {
      console.warn = jest.fn()
      console.error = jest.fn()
      return resolveConfig('.test', {
        schema: {
          type: 'object',
          properties: {
            num: {
              type: 'string'
            }
          }
        }
      }).then(result => {
        expect(console.warn).toHaveBeenCalled()
        expect(console.error).toHaveBeenCalled()
        expect(result).toEqual({
          num: 127
        })
      })
    })
  })
})
