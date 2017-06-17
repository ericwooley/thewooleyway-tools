import getPlugins from '../getPlugins'
import fs from 'fs'
import path from 'path'
const testData = fs.readFileSync(path.join(__dirname, './test-data.json'))

describe('getPlugins', () => {
  it('should get a list of plugins', () => {
    expect(getPlugins(JSON.parse(testData))).toEqual([
      '@tww/plugin-questions',
      'tww-plugin-questions'
    ])
  })
})
