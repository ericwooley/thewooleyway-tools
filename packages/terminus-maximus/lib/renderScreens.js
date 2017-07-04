var kill = require("tree-kill");
var { createScreenBufferStreamer } = require("./bufferDispay");
var { initScreen } = require("./screen");
var createErrorScreen = require("./errorStream");
var screen = initScreen();
var shelljs = require("shelljs");
var endOfLine = require("os").EOL;

/**
 * @typedef TerminusMaximusConfig
 * @property {Number} errorHeight - The height for the error console
 * @property {Object<string, Array.CommandConfig>} scripts - Config for each command group to run
 * @property {Number} screensPerRow - The number of screens per row
 */

/**
 * Config for a command.
 * @typedef {Object} CommandConfig
 * @property {String} label - The label to show in above your command
 * @property {String} command - Command to run
 * @property {Object} screenConfig - Blessed.Screen Config
 */

/**
 * Renders the screens and executes the script group
 * @param {TerminusMaximusConfig} config -- terminus maximus config object
 * @param {String} scriptToExecute - which script to execute from the config
 */

function renderScreens(config, scriptToExecute) {
  config = Object.assign(
    {
      errorHeight: 20,
      screensPerRow: 2
    },
    config
  );

  const errorStream = createErrorScreen(config, screen);
  const scriptDefinition = config.scripts[scriptToExecute];
  const screensPerRow = config.screensPerRow;
  const defaultHeight =
    (100 - config.errorHeight) /
    Math.ceil(scriptDefinition.length / screensPerRow);
  const defaultScreenConfig = {
    width: "50%",
    height: defaultHeight + "%"
  };

  const userScreens = scriptDefinition.map((scriptConfig, index) => {
    var p = shelljs.exec(scriptConfig.command, { async: true, silent: true });
    const row = Math.floor(index / screensPerRow);
    const top = defaultHeight * row;
    const width = Math.floor(100 / screensPerRow);
    const left = index % screensPerRow * width;
    p.stderr.on("data", data => {
      pushLines(scriptConfig.label || scriptConfig.command, data, line =>
        errorStream.push(line)
      );
    });
    const blessedOptions = Object.assign(
      {
        top: top + "%",
        width: width + "%",
        left: left + "%",
        label: scriptConfig.label || scriptConfig.command
      },
      defaultScreenConfig,
      scriptConfig.screenConfig
    );
    var screenWriter = createScreenBufferStreamer(
      screen,
      p.stdout,
      blessedOptions,
      {}
    );
    screenWriter.on("click", () => {
      if (!screenWriter.fullscreen) {
        screenWriter;
        userScreens
          .filter(screen => screen.screenWriter !== screenWriter)
          .forEach(s => {
            s.screenWriter.hide();
          });
        screenWriter.fullscreen = true;
        screenWriter.top = 0;
        screenWriter.left = 0;
        screenWriter.width = "100%";
        screenWriter.height = 100 - config.errorHeight + "%";
      } else {
        userScreens.filter(screen => screen !== screenWriter).forEach(s => {
          s.screenWriter.show();
        });
        screenWriter.fullscreen = false;
        screenWriter.top = blessedOptions.top;
        screenWriter.left = blessedOptions.left;
        screenWriter.width = blessedOptions.width;
        screenWriter.height = blessedOptions.height;
      }
    });
    return {
      fullscreen: false,
      screenWriter,
      pid: p.pid,
      p
    };
  });

  const childProcesses = [
    ...userScreens
    // createTopScreen(config, screen, userScreens) // Not stable yet
  ];

  function shutDown() {
    screen.destroy();
    childProcesses.map(p => p.pid).forEach(pid => kill(pid));
  }

  screen.key("C-q", shutDown);
  screen.key("C-c", shutDown);
  screen.key("C-d", shutDown);

  screen.render();
}
module.exports.renderScreens = renderScreens;

function pushLines(str, data, push) {
  const lines = data.split(endOfLine);
  const label = ("              " + str + ": ").slice(-25);
  lines.map(line => label + line).forEach(push);
}
