import program from 'commander'
import path from 'path'
import fs from 'fs'
const packageInfo = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'))
)
console.log(path.dirname(require.main.filename))
program
  .version(packageInfo.version)
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option(
    '-c, --cheese [type]',
    'Add the specified type of cheese [marble]',
    'marble'
  )
  .parse(process.argv)

console.log('you ordered a pizza with:')
if (program.peppers) console.log('  - peppers')
if (program.pineapple) console.log('  - pineapple')
if (program.bbqSauce) console.log('  - bbq')
console.log('  - %s cheese', program.cheese)
