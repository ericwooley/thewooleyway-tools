// @flow
import getManifest, { type NPMManifest } from './getManifest'
export default function findPlugins (manifest: NPMManifest = getManifest()) {
  const modules = Object.keys(manifest.dependencies)
  const plugins = modules.filter(
    moduleName => !!moduleName.match(/@?tww(\/|-)template-.*/)
  )
  return plugins
}
