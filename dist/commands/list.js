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
const commandline_1 = require("../util/commandline");
const interaction_1 = require("../util/interaction");
const debug = require("debug")("mappdl-cli:commands:apps:list");
const util_1 = require("util");
const _ = require("lodash");
let AppsListCommand = class AppsListCommand extends commandline_1.Command {
    constructor(args) {
        super(args);
    }
    formatApp(defaultApp, app) {
        let prefix = "  ";
        let suffix = "";
        if (defaultApp && defaultApp.appName === app.name && defaultApp.ownerName === app.owner.name) {
            prefix = "* ";
            suffix = " (current app)";
        }
        return `${prefix}${app.owner.name}/${app.name}${suffix}`;
    }
    run(client) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let appsResponse;
            try {
                appsResponse = yield interaction_1.out.progress("Getting app list ...", client.apps.list());
            }
            catch (error) {
                // out.text("error:" + (error?.message || ""));
                if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) >= 400) {
                    return commandline_1.failure(commandline_1.ErrorCodes.Exception, "Unknown error when loading apps");
                }
            }
            const defaultApp = commandline_1.getCurrentApp(null);
            debug(`Current app = ${util_1.inspect(defaultApp)}`);
            const sortedApps = _.sortBy(appsResponse, (app) => (app.owner.name + app.name).toLowerCase());
            interaction_1.out.list((app) => this.formatApp(defaultApp.value, app), sortedApps);
            return commandline_1.success();
        });
    }
};
AppsListCommand = __decorate([
    commandline_1.help("Get list of configured applications")
], AppsListCommand);
exports.default = AppsListCommand;
