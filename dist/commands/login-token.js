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
const commandline_1 = require("../util/commandline");
const profile_1 = require("../util/profile");
const interaction_1 = require("../util/interaction");
const token_store_1 = require("../util/token-store");
const debug = require("debug")("mappdl-cli:commands:login");
let LoginCommand = class LoginCommand extends commandline_1.Command {
    constructor(args) {
        super(args);
    }
    runNoClient() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = this.validateArguments();
            try {
                if (!this.token || this.token.trim() === "") {
                    throw new Error(`Specify '--token' or '-t' to import token credentials..`);
                }
                const user = profile_1.getUser();
                console.log(user);
                const getter = token_store_1.tokenStore.get("anhtuan7692").catch((err) => {
                    debug(`Can't get token from tokenStore: ${err.message}`);
                    if (!err.message.includes("could not be found")) {
                        throw err;
                    }
                    debug(`Fallback to the old name in the keychain.`);
                    return token_store_1.tokenStore.get("anhtuan7692", true);
                });
                console.log(getter);
                const userSuppliedToken = true;
                if (commandline_1.succeeded(result)) {
                    const endpoint = profile_1.environments(undefined).endpoint;
                    const client = this.clientFactory.fromToken(this.token, endpoint);
                    const userResponse = yield interaction_1.out.progress("Getting user info ...", client.users.get());
                    yield profile_1.saveUser(userResponse, { id: "UserToken", token: this.token }, undefined, userSuppliedToken);
                    interaction_1.out.text(`Logged in as ${userResponse.name}`);
                    result = commandline_1.success();
                    process.exit(0);
                }
            }
            catch (err) {
                result = commandline_1.failure(commandline_1.ErrorCodes.Exception, err.message);
            }
            return result;
        });
    }
    validateArguments() {
        return commandline_1.success();
    }
};
__decorate([
    commandline_1.help("Token to log in to the mappdl-cli"),
    commandline_1.shortName("t"),
    commandline_1.longName("token"),
    commandline_1.hasArg
], LoginCommand.prototype, "token", void 0);
LoginCommand = __decorate([
    commandline_1.help("Login with token")
], LoginCommand);
exports.default = LoginCommand;
