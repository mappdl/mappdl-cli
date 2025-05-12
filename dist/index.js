"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandline_1 = require("./util/commandline");
const io_options_1 = require("./util/interaction/io-options");
const path = require("path");
const chalk = require("chalk");
const runner = commandline_1.runner(path.join(__dirname, "commands"));
runner(process.argv.slice(2)).then((result) => {
    if (commandline_1.failed(result)) {
        if (io_options_1.formatIsJson()) {
            console.error(`${chalk.red(JSON.stringify(result))}`);
        }
        else {
            console.error(`${chalk.bold.red("Error:")} ${result.errorMessage}`);
        }
        process.exit(result.errorCode);
    }
});
