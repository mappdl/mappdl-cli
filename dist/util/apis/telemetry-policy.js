"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.telemetryPolicy = void 0;
const uuid = require("uuid");
const profile_1 = require("../profile");
const sessionId = uuid.v4();
const sessionHeaderName = "diagnostic-context";
const commandNameHeaderName = "cli-command-name";
function telemetryPolicy(commandName, telemetryIsEnabled) {
    const telemetrySource = profile_1.getTelemetrySourceFromEnvironmentVar() || "cli";
    return {
        name: "telemetryPolicy",
        sendRequest: (request, next) => __awaiter(this, void 0, void 0, function* () {
            if (telemetryIsEnabled) {
                request.headers.set("internal-request-source", telemetrySource);
                request.headers.set(sessionHeaderName, sessionId);
                request.headers.set(commandNameHeaderName, commandName);
            }
            return next(request);
        }),
    };
}
exports.telemetryPolicy = telemetryPolicy;
