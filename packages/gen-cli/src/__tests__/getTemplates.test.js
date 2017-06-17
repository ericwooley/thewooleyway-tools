import getTemplates from '../getTemplates'
import fs from 'fs'
import path from 'path'
const testData = fs.readFileSync(path.join(__dirname, './test-data.json'))

describe('getTemplates', () => {
  it('should get a list of plugins', () => {
    expect(getTemplates(JSON.parse(testData))).toEqual([
      '@tww/template-api',
      '@tww/template-component',
      'tww-template-component',
      '@tww/template-layout',
      '@tww/template-reducer',
      '@tww/template-target'
    ])
  })
})
