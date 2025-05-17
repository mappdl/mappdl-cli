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
const os = require("os");
const opener = require("opener");
const qs = require("qs");
const commandline_1 = require("../util/commandline");
const profile_1 = require("../util/profile");
const interaction_1 = require("../util/interaction");
let LoginCommand = class LoginCommand extends commandline_1.Command {
    constructor(args) {
        super(args);
    }
    runNoClient() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = this.validateArguments();
            try {
                const loginUrl = profile_1.environments(undefined).loginEndpoint + "?" + qs.stringify({ hostname: os.hostname() });
                interaction_1.out.text(`Opening your browser... ${os.EOL}? Visit ${loginUrl} and copy the code`);
                opener(loginUrl);
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
LoginCommand = __decorate([
    commandline_1.help("Get token for login")
], LoginCommand);
exports.default = LoginCommand;
