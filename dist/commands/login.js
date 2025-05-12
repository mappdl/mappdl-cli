"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
// Implementation of MappDL login command
const os = require("os");
const opener = require("opener");
const qs = require("qs");
const commandline_1 = require("../util/commandline");
const profile_1 = require("../util/profile");
const interaction_1 = require("../util/interaction");
const logout_1 = require("./lib/logout");
const debug = require("debug")("mappdl-cli:commands:login");
let LoginCommand = class LoginCommand extends commandline_1.Command {
    constructor(args) {
        super(args);
    }
    runNoClient() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = this.validateArguments();
            let userSuppliedToken = false;
            try {
                if (commandline_1.succeeded(result)) {
                    yield this.removeLoggedInUser();
                    let token;
                    // if (this.token) {
                    //   userSuppliedToken = true;
                    //   token = this.token;
                    // } else if (this.isInteractiveEnvironment) {
                    //   userSuppliedToken = false;
                    //   token = await this.doInteractiveLogin();
                    // }
                    if (this.isInteractiveEnvironment) {
                        userSuppliedToken = false;
                        token = yield this.doInteractiveLogin();
                    }
                    // const endpoint = environments(this.environmentName).endpoint;
                    const endpoint = profile_1.environments(undefined).endpoint;
                    const client = this.clientFactory.fromToken(token, endpoint);
                    const userResponse = yield interaction_1.out.progress("Getting user info ...", client.users.get());
                    // await saveUser(userResponse, { id: "UserToken", token: token }, this.environmentName, userSuppliedToken);
                    yield profile_1.saveUser(userResponse, { id: "UserToken", token: token }, undefined, userSuppliedToken);
                    interaction_1.out.text(`Logged in as ${userResponse.name}`);
                    // Force early exit to avoid long standing delays if token deletion is slow
                    process.exit(0);
                    result = commandline_1.success();
                }
            }
            catch (err) {
                result = commandline_1.failure(commandline_1.ErrorCodes.Exception, err.message);
            }
            return result;
        });
    }
    get isInteractiveEnvironment() {
        // return !!environments(this.environmentName).loginEndpoint;
        return !!profile_1.environments(undefined).loginEndpoint;
    }
    validateArguments() {
        // if (this.isInteractiveEnvironment && (this.userName || this.password) && !this.token) {
        if (this.isInteractiveEnvironment && (this.userName || this.password)) {
            return commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, "this environment requires interactive login, do not use the --user or --password switches");
        }
        // if (!this.isInteractiveEnvironment && (this.userName || this.password) && this.token) {
        //   return failure(ErrorCodes.InvalidParameter, "you must specify either a token or a user/password, not both");
        // }
        if (profile_1.getTokenFromEnvironmentVar()) {
            return commandline_1.failure(commandline_1.ErrorCodes.IllegalCommand, `can't login when token is set in environment variable ${profile_1.mappDLAccessTokenEnvVar}`);
        }
        return commandline_1.success();
    }
    doInteractiveLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            // const loginUrl = environments(this.environmentName).loginEndpoint + "?" + qs.stringify({ hostname: os.hostname() });
            const loginUrl = profile_1.environments(undefined).loginEndpoint + "?" + qs.stringify({ hostname: os.hostname() });
            interaction_1.out.text(`Opening your browser... ${os.EOL}? Visit ${loginUrl} and enter the code:`);
            opener(loginUrl);
            const token = yield interaction_1.prompt("Access code from browser: ");
            return token;
        });
    }
    removeLoggedInUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = profile_1.getUser();
            if (currentUser !== null) {
                debug(`Currently logged in as ${currentUser.userName}, removing token`);
                debug(`Creating client factory`);
                const client = this.clientFactory.fromProfile(currentUser);
                debug(`Removing existing token`);
                yield logout_1.logout(client, currentUser);
            }
        });
    }
};
__decorate([
    commandline_1.help("Username to log in as"),
    commandline_1.shortName("u"),
    commandline_1.longName("user"),
    commandline_1.hasArg
], LoginCommand.prototype, "userName", void 0);
__decorate([
    commandline_1.help("Password to log in with"),
    commandline_1.shortName("p"),
    commandline_1.longName("password"),
    commandline_1.hasArg
], LoginCommand.prototype, "password", void 0);
LoginCommand = __decorate([
    commandline_1.help("Log in")
], LoginCommand);
exports.default = LoginCommand;
