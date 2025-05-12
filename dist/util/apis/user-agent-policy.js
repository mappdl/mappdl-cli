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
exports.userAgentPolicy = void 0;
const os_1 = require("os");
const { version: cliVersion } = require("../../../package.json");
const misc_1 = require("../misc");
function userAgentPolicy() {
    return {
        name: "mappdlUserAgentPolicy",
        sendRequest: (request, next) => __awaiter(this, void 0, void 0, function* () {
            const userAgentValue = `${misc_1.scriptName}Cli/${cliVersion} NodeJS/${process.version} ${os_1.platform()}/${os_1.release()}`;
            request.headers.set("user-agent", userAgentValue);
            return next(request);
        }),
    };
}
exports.userAgentPolicy = userAgentPolicy;
