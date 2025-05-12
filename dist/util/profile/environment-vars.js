"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvFromEnvironmentVar = exports.getTelemetrySourceFromEnvironmentVar = exports.getTokenFromEnvironmentVar = exports.mappDLTelemetrySourceEnvVar = exports.mappDLAccessTokenEnvVar = void 0;
const process = require("process");
const environments_1 = require("./environments");
exports.mappDLAccessTokenEnvVar = "MAPPDL_ACCESS_TOKEN";
exports.mappDLTelemetrySourceEnvVar = "MAPPDL_TELEMETRY_SOURCE";
function getTokenFromEnvironmentVar() {
    return process.env[exports.mappDLAccessTokenEnvVar];
}
exports.getTokenFromEnvironmentVar = getTokenFromEnvironmentVar;
function getTelemetrySourceFromEnvironmentVar() {
    return process.env[exports.mappDLTelemetrySourceEnvVar];
}
exports.getTelemetrySourceFromEnvironmentVar = getTelemetrySourceFromEnvironmentVar;
function getEnvFromEnvironmentVar() {
    return process.env["MAPPDL_ENV"] || environments_1.defaultEnvironmentName();
}
exports.getEnvFromEnvironmentVar = getEnvFromEnvironmentVar;
