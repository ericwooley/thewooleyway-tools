"use strict";
exports.__esModule = true;
var upResolve = require("@tww/up-resolve");
var shelljs = require("shelljs");
var blueprintFolders = upResolve([".blueprints"]);
var blueprints = blueprintFolders
    .map(function (blueprintFolder) { return shelljs.ls(blueprintFolder); })
    .reduce(function (total, folders) { return total.concat(folders); }, []);
console.log("available blueprints", blueprints, blueprintFolders);
//# sourceMappingURL=index.js.map