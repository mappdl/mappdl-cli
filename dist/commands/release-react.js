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
const codepush_release_command_base_1 = require("./lib/codepush-release-command-base");
const interaction_1 = require("../util/interaction");
const util_1 = require("util");
const pfs = require("../util/misc/promisfied-fs");
const path = require("path");
const mkdirp = require("mkdirp");
const file_utils_1 = require("./lib/file-utils");
// import { isValidDeployment, isValidNumber, isValidVersion } from "./lib/validation-utils";
// import { isValidDeployment, isValidVersion } from "./lib/validation-utils";
const validation_utils_1 = require("./lib/validation-utils");
const react_native_utils_1 = require("./lib/react-native-utils");
const lodash_1 = require("lodash");
// import * as chalk from "chalk";
const debug = require("debug")("mappdl-cli:commands:release-react");
let CodePushReleaseReactCommand = class CodePushReleaseReactCommand extends codepush_release_command_base_1.default {
    run(client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!react_native_utils_1.getReactNativeVersion()) {
                return commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, "The project in the CWD is not a React Native project.");
            }
            // if (!(await isValidDeployment(client, this.app, this.specifiedDeploymentName))) {
            //   return failure(ErrorCodes.InvalidParameter, `Deployment "${this.specifiedDeploymentName}" does not exist.`);
            // } else {
            //   this.deploymentName = this.specifiedDeploymentName;
            // }
            // this.deploymentName = "";
            const appInfo = yield interaction_1.out.progress("Getting app info...", client.apps.get(this.app.ownerName, this.app.appName));
            this.os = appInfo.os.toLowerCase();
            this.platform = appInfo.platform.toLowerCase();
            this.updateContentsPath = this.outputDir || (yield pfs.mkTempDir("code-push"));
            // we have to add "CodePush" root folder to make update contents file structure
            // to be compatible with React Native client SDK
            this.updateContentsPath = path.join(this.updateContentsPath, "CodePush");
            mkdirp.sync(this.updateContentsPath);
            if (!react_native_utils_1.isValidOS(this.os)) {
                return commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, `OS must be "android", "ios", or "windows".`);
            }
            if (!react_native_utils_1.isValidPlatform(this.platform)) {
                return commandline_1.failure(commandline_1.ErrorCodes.Exception, `Platform must be "React Native".`);
            }
            if (!this.bundleName) {
                this.bundleName = this.os === "ios" ? "main.jsbundle" : `index.${this.os}.bundle`;
            }
            if (!this.entryFile) {
                this.entryFile = `index.${this.os}.js`;
                if (file_utils_1.fileDoesNotExistOrIsDirectory(this.entryFile)) {
                    this.entryFile = "index.js";
                }
                if (file_utils_1.fileDoesNotExistOrIsDirectory(this.entryFile)) {
                    return commandline_1.failure(commandline_1.ErrorCodes.NotFound, `Entry file "index.${this.os}.js" or "index.js" does not exist.`);
                }
            }
            else {
                if (file_utils_1.fileDoesNotExistOrIsDirectory(this.entryFile)) {
                    return commandline_1.failure(commandline_1.ErrorCodes.NotFound, `Entry file "${this.entryFile}" does not exist.`);
                }
            }
            if (this.sourcemapOutputDir && this.sourcemapOutput) {
                interaction_1.out.text('\n"sourcemap-output-dir" argument will be ignored as "sourcemap-output" argument is provided.\n');
            }
            if (this.sourcemapOutputDir && !this.sourcemapOutput) {
                this.sourcemapOutput = path.join(this.sourcemapOutputDir, this.bundleName + ".map");
            }
            if (lodash_1.isArray(this.specifiedTargetBinaryVersion)) {
                console.log(this.specifiedTargetBinaryVersion);
            }
            this.targetBinaryVersion = this.specifiedTargetBinaryVersion;
            if (this.targetBinaryVersion && !validation_utils_1.isValidVersion(this.targetBinaryVersion)) {
                return commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, "Invalid binary version(s) for a release.");
            }
            else if (!this.targetBinaryVersion) {
                const versionSearchParams = {
                    os: this.os,
                    plistFile: this.plistFile,
                    plistFilePrefix: this.plistFilePrefix,
                    gradleFile: this.gradleFile,
                    buildConfigurationName: this.buildConfigurationName,
                    xcodeTargetName: this.xcodeTargetName,
                    projectFile: this.xcodeProjectFile,
                };
                this.targetBinaryVersion = yield react_native_utils_1.getReactNativeProjectAppVersion(versionSearchParams);
            }
            else {
                // if (!this.specifiedTargetBinaryVersionCode || !isValidNumber(this.specifiedTargetBinaryVersionCode)) {
                //   return failure(
                //     ErrorCodes.InvalidParameter,
                //     `Using the --number-build-version or -n option valid binary ${this.os === "android" ? "versionCode" : "build number"
                //     } for a release.`
                //   );
                // }
            }
            // if (this.specifiedTargetBinaryVersionCode && !isValidNumber(this.specifiedTargetBinaryVersionCode)) {
            //   return failure(
            //     ErrorCodes.InvalidParameter,
            //     `Invalid binary ${this.os === "android" ? "versionCode" : "build number"} for a release.`
            //   );
            // } else {
            //   if (this.specifiedTargetBinaryVersionCode) {
            //     this.targetBinaryVersionCode = parseInt(this.specifiedTargetBinaryVersionCode, 10);
            //   } else {
            //     const versionSearchParams: VersionSearchParams = {
            //       os: this.os,
            //       plistFile: this.plistFile,
            //       plistFilePrefix: this.plistFilePrefix,
            //       gradleFile: this.gradleFile,
            //       buildConfigurationName: this.buildConfigurationName,
            //       xcodeTargetName: this.xcodeTargetName,
            //       projectFile: this.xcodeProjectFile,
            //     } as VersionSearchParams;
            //     this.targetBinaryVersionCode = await getReactNativeProjectAppVersionCode(versionSearchParams);
            //     // return failure(
            //     //   ErrorCodes.InvalidParameter,
            //     //   `Invalid binary ${this.os === "android" ? "versionCode" : "build number"} for a release.`
            //     // );
            //   }
            // }
            if (typeof this.extraBundlerOptions === "string") {
                this.extraBundlerOptions = [this.extraBundlerOptions];
            }
            if (typeof this.extraHermesFlags === "string") {
                this.extraHermesFlags = [this.extraHermesFlags];
            }
            try {
                file_utils_1.createEmptyTmpReleaseFolder(this.updateContentsPath);
                file_utils_1.removeReactTmpDir();
                yield react_native_utils_1.runReactNativeBundleCommand(this.bundleName, this.development, this.entryFile, this.updateContentsPath, this.os, this.sourcemapOutput, this.extraBundlerOptions);
                const isHermesEnabled = this.useHermes ||
                    (this.os === "android" && (yield react_native_utils_1.getAndroidHermesEnabled(this.gradleFile))) || // Check if we have to run hermes to compile JS to Byte Code if Hermes is enabled in build.gradle and we're releasing an Android build
                    (this.os === "ios" && (yield react_native_utils_1.getiOSHermesEnabled(this.podFile))); // Check if we have to run hermes to compile JS to Byte Code if Hermes is enabled in Podfile and we're releasing an iOS build
                if (isHermesEnabled) {
                    yield react_native_utils_1.runHermesEmitBinaryCommand(this.bundleName, this.updateContentsPath, this.sourcemapOutput, this.extraHermesFlags, this.gradleFile);
                }
                // out.text(chalk.cyan("DEBUG LOG \nReleasing update contents to CodePush 2:\n"));
                // out.text(chalk.cyan("DEBUG LOG \nReleasing update contents to CodePush:\n"));
                return yield this.release(client);
            }
            catch (error) {
                // out.text(chalk.red(`DEBUG LOG Failed to release a CodePush update - ${inspect(error)}`));
                debug(`Failed to release a CodePush update - ${util_1.inspect(error)}`);
                return commandline_1.failure(commandline_1.ErrorCodes.Exception, "Failed to release a CodePush update.");
            }
            finally {
                if (!this.outputDir) {
                    yield pfs.rmDir(this.updateContentsPath);
                }
            }
        });
    }
};
__decorate([
    commandline_1.help('Name of the generated JS bundle file. If unspecified, the standard bundle name will be used, depending on the specified platform: "main.jsbundle" (iOS), "index.android.bundle" (Android) or "index.windows.bundle" (Windows)'),
    commandline_1.shortName("b"),
    commandline_1.longName("bundle-name"),
    commandline_1.hasArg
], CodePushReleaseReactCommand.prototype, "bundleName", void 0);
__decorate([
    commandline_1.help("Specifies whether to generate a dev or release build"),
    commandline_1.longName("development")
], CodePushReleaseReactCommand.prototype, "development", void 0);
__decorate([
    commandline_1.help('Path to the app\'s entry JavaScript file. If omitted, "index.<platform>.js" and then "index.js" will be used (if they exist)'),
    commandline_1.shortName("e"),
    commandline_1.longName("entry-file"),
    commandline_1.hasArg
], CodePushReleaseReactCommand.prototype, "entryFile", void 0);
__decorate([
    commandline_1.help("Path to the gradle file which specifies the binary version you want to target this release at (android only)"),
    commandline_1.shortName("g"),
    commandline_1.longName("gradle-file"),
    commandline_1.hasArg
], CodePushReleaseReactCommand.prototype, "gradleFile", void 0);
__decorate([
    commandline_1.help("Path to the cocopods config file (iOS only)"),
    commandline_1.longName("pod-file"),
    commandline_1.hasArg
], CodePushReleaseReactCommand.prototype, "podFile", void 0);
__decorate([
    commandline_1.help("Path to the plist file which specifies the binary version you want to target this release at (iOS only)"),
    commandline_1.shortName("p"),
    commandline_1.hasArg,
    commandline_1.longName("plist-file")
], CodePushReleaseReactCommand.prototype, "plistFile", void 0);
__decorate([
    commandline_1.help("Path to the Xcode project or project.pbxproj file"),
    commandline_1.shortName("xp"),
    commandline_1.longName("xcode-project-file"),
    commandline_1.hasArg
], CodePushReleaseReactCommand.prototype, "xcodeProjectFile", void 0);
__decorate([
    commandline_1.help("Prefix to append to the file name when attempting to find your app's Info.plist file (iOS only)"),
    commandline_1.longName("plist-file-prefix"),
    commandline_1.hasArg
], CodePushReleaseReactCommand.prototype, "plistFilePrefix", void 0);
__decorate([
    commandline_1.help('Name of build configuration which specifies the binary version you want to target this release at. For example, "Debug" or "Release" (iOS only)'),
    commandline_1.shortName("c"),
    commandline_1.hasArg,
    commandline_1.longName("build-configuration-name"),
    commandline_1.defaultValue("Release")
], CodePushReleaseReactCommand.prototype, "buildConfigurationName", void 0);
__decorate([
    commandline_1.help("Name of target (PBXNativeTarget) which specifies the binary version you want to target this release at (iOS only)"),
    commandline_1.shortName("xt"),
    commandline_1.longName("xcode-target-name"),
    commandline_1.hasArg
], CodePushReleaseReactCommand.prototype, "xcodeTargetName", void 0);
__decorate([
    commandline_1.help("Path to where the sourcemap for the resulting bundle should be written. If omitted, a sourcemap will not be generated"),
    commandline_1.shortName("s"),
    commandline_1.longName("sourcemap-output"),
    commandline_1.hasArg
], CodePushReleaseReactCommand.prototype, "sourcemapOutput", void 0);
__decorate([
    commandline_1.help('Path to folder where the sourcemap for the resulting bundle should be written. Name of sourcemap file will be generated automatically. This argument will be ignored if "sourcemap-output" argument is provided. If omitted, a sourcemap will not be generated'),
    commandline_1.longName("sourcemap-output-dir"),
    commandline_1.hasArg
], CodePushReleaseReactCommand.prototype, "sourcemapOutputDir", void 0);
__decorate([
    commandline_1.help("Path to where the bundle should be written. If omitted, the bundle will not be saved on your machine"),
    commandline_1.shortName("o"),
    commandline_1.longName("output-dir"),
    commandline_1.hasArg
], CodePushReleaseReactCommand.prototype, "outputDir", void 0);
__decorate([
    commandline_1.help("Semver expression that specifies the binary app version(s) this release is targeting (e.g. 1.1.0, ~1.2.3)"),
    commandline_1.shortName("t"),
    commandline_1.longName("target-binary-version"),
    commandline_1.hasArg
], CodePushReleaseReactCommand.prototype, "specifiedTargetBinaryVersion", void 0);
__decorate([
    commandline_1.help("Option that gets passed to react-native bundler. Can be specified multiple times"),
    commandline_1.longName("extra-bundler-option"),
    commandline_1.defaultValue([]),
    commandline_1.hasArg
], CodePushReleaseReactCommand.prototype, "extraBundlerOptions", void 0);
__decorate([
    commandline_1.help("Flag that gets passed to Hermes, JavaScript to bytecode compiler. Can be specified multiple times"),
    commandline_1.longName("extra-hermes-flag"),
    commandline_1.defaultValue([]),
    commandline_1.hasArg
], CodePushReleaseReactCommand.prototype, "extraHermesFlags", void 0);
__decorate([
    commandline_1.help("Enable hermes and bypass automatic checks"),
    commandline_1.longName("use-hermes")
], CodePushReleaseReactCommand.prototype, "useHermes", void 0);
CodePushReleaseReactCommand = __decorate([
    commandline_1.help("Release a React Native update to an app deployment")
], CodePushReleaseReactCommand);
exports.default = CodePushReleaseReactCommand;
