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
exports.clientRequest = exports.handleHttpError = exports.clientCall = exports.createMappDLClient = void 0;
// Helper function to create client objects
const debug = require("debug")("mappdl-cli:util:apis:create-client");
const util_1 = require("util");
const mappDLClient_1 = require("./generated/src/mappDLClient");
const user_agent_policy_1 = require("./user-agent-policy");
const telemetry_policy_1 = require("./telemetry-policy");
const command_result_1 = require("../../util/commandline/command-result");
const authorization_policy_1 = require("./authorization-policy");
function createMappDLClient(command, telemetryEnabled) {
    function createClientOptions(token) {
        const policies = [
            { policy: telemetry_policy_1.telemetryPolicy(command.join(" "), telemetryEnabled), position: "perCall" },
            { policy: user_agent_policy_1.userAgentPolicy(), position: "perCall" },
            { policy: authorization_policy_1.authorizationPolicy(token), position: "perCall" },
        ];
        const serviceClientOptions = {
            additionalPolicies: policies,
            allowInsecureConnection: true,
        };
        return serviceClientOptions;
    }
    return {
        fromToken(token, endpoint) {
            debug(`Creating client from token for endpoint ${endpoint}`);
            let tokenFunc;
            if (typeof token === "string") {
                debug("Creating from token as string");
                tokenFunc = () => Promise.resolve(token);
            }
            else if (typeof token === "object") {
                debug("Creating from token as promise");
                tokenFunc = () => token;
            }
            else {
                debug("Creating from token as function");
                tokenFunc = token;
            }
            return new mappDLClient_1.MappDLClient(Object.assign({ endpoint: endpoint }, createClientOptions(tokenFunc())));
        },
        fromProfile(user) {
            if (!user) {
                debug(`No current user, not creating client`);
                return null;
            }
            debug(`Creating client from user for user ${util_1.inspect(user)}`);
            return new mappDLClient_1.MappDLClient(Object.assign({ endpoint: user.endpoint }, createClientOptions(user.accessToken)));
        },
    };
}
exports.createMappDLClient = createMappDLClient;
// Helper function to wrap client calls into promises while maintaining some type safety.
function clientCall(action) {
    return new Promise((resolve, reject) => {
        action((err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}
exports.clientCall = clientCall;
function handleHttpError(error, check404, messageDefault, message404 = `404 Error received from api`, message401 = `401 Error received from api`) {
    return __awaiter(this, void 0, void 0, function* () {
        if (check404 && error.statusCode === 404) {
            throw command_result_1.failure(command_result_1.ErrorCodes.InvalidParameter, message404);
        }
        if (error.statusCode === 401) {
            throw command_result_1.failure(command_result_1.ErrorCodes.NotLoggedIn, message401);
        }
        else {
            debug(`${messageDefault}- ${util_1.inspect(error)}`);
            throw command_result_1.failure(command_result_1.ErrorCodes.Exception, messageDefault);
        }
    });
}
exports.handleHttpError = handleHttpError;
// Helper function to wrap client calls into pormises and returning both HTTP response and parsed result
function clientRequest(action) {
    return new Promise((resolve, reject) => {
        action((err, result, request, response) => {
            if (err) {
                reject(err);
            }
            else {
                resolve({ result, response });
            }
        });
    });
}
exports.clientRequest = clientRequest;
