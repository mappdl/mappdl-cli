"use strict";
// Function to query and persist telemetry enabling settings
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveTelemetryOption = exports.telemetryIsEnabled = void 0;
const fs = require("fs");
// import * as os from "os";
const path = require("path");
const mkdirp = require("mkdirp");
const misc_1 = require("../misc");
const interaction_1 = require("../interaction");
// import { out, prompt, terminal, isQuiet } from "../interaction";
// import * as wrap from "wordwrap";
const telemetryOptionFile = "telemetryEnabled.json";
const telemetryDisableEnvironmentVar = "MOBILE_CENTER_TELEMETRY";
// const telemetryPromptText =
//   os.EOL +
//   "MappDL CLI would like to collect data about how users use CLI commands " +
//   "and some problems they encounter. Participation is voluntary and when you choose to participate your " +
//   "device automatically sends information to MappDL about how you use MappDL CLI." +
//   os.EOL +
//   "For more information, please see our privacy policy at https://aka.ms/mobilecenterprivacy" +
//   os.EOL;
// function promptForTelemetryEnable(): Promise<boolean> {
//   const width = terminal.columns() - 2;
//   const promptText = wrap(width)(telemetryPromptText);
//   if (!isQuiet()) {
//     out.text(promptText);
//   }
//   return prompt.confirmWithTimeout("Enable telemetry? ", 30000, true);
// }
function telemetryIsEnabled(disableTelemetrySwitch) {
    if (disableTelemetrySwitch) {
        return Promise.resolve(false);
    }
    if (process.env[telemetryDisableEnvironmentVar]) {
        return Promise.resolve(process.env[telemetryDisableEnvironmentVar].toLowerCase() === "on");
    }
    if (hasTelemetryOptionSaved()) {
        return getSavedTelemetryOption();
    }
    if (!interaction_1.terminal.isInteractive()) {
        return Promise.resolve(false);
    }
    // return promptForTelemetryEnable().then((enabled: boolean) => {
    const enabled = false;
    saveTelemetryOption(enabled);
    return Promise.resolve(enabled);
    // return enabled;
    // });
}
exports.telemetryIsEnabled = telemetryIsEnabled;
function telemetryFileName() {
    return path.join(misc_1.getProfileDir(), telemetryOptionFile);
}
function hasTelemetryOptionSaved() {
    return misc_1.fileExistsSync(telemetryFileName());
}
function getSavedTelemetryOption() {
    const fileContents = fs.readFileSync(telemetryFileName(), "utf8");
    const enabled = JSON.parse(fileContents);
    return Promise.resolve(!!enabled);
}
function saveTelemetryOption(enabled) {
    mkdirp.sync(misc_1.getProfileDir());
    fs.writeFileSync(telemetryFileName(), JSON.stringify(enabled), { encoding: "utf8" });
}
exports.saveTelemetryOption = saveTelemetryOption;
