import * as upResolve from "@tww/up-resolve";
import * as shelljs from "shelljs";
const blueprintFolders = upResolve([".blueprints"]);
const blueprints = blueprintFolders
  .map(blueprintFolder => shelljs.ls(blueprintFolder))
  .reduce((total, folders) => [...total, ...folders], []);
console.log("available blueprints", blueprints, blueprintFolders);
