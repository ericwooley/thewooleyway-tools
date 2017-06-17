// @flow
import shelljs from 'shelljs'
export type NPMManifest = { dependencies: { version: String }, version: String }
let cachedManifest: ?NPMManifest = null
export default function npmls (): NPMManifest {
  if (cachedManifest) {
    return cachedManifest
  }
  cachedManifest = JSON.parse(
    shelljs.exec('npm ls --parseable --json', { silent: true }).stdout
  )
  return cachedManifest
}
