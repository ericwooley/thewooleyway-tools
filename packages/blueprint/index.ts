import * as upResolve from "@tww/up-resolve";
import * as inquirer from "inquirer";
import * as shelljs from "shelljs";
async function run() {
  const blueprintFolders = upResolve([".blueprints"]);
  const blueprints = blueprintFolders
    .map(blueprintFolder => shelljs.ls(blueprintFolder))
    .reduce((total, folders) => [...total, ...folders], []);
  const answer = await inquirer.prompt([
    {
      choices: blueprints,
      message: "select blueprint",
      name: "blueprint",
      type: "list"
    }
  ]);
  console.log("selected answer", answer.blueprint);
}

run();
