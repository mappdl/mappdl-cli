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
const commandline_1 = require("../../util/commandline");
const interaction_1 = require("../../util/interaction");
const util_1 = require("util");
// import * as fs from "fs";
const pfs = require("../../util/misc/promisfied-fs");
// import { sign, zip } from "./update-contents-tasks";
// import { isBinaryOrZip, getLastFolderInPath, moveReleaseFilesInTmpFolder, isDirectory } from "./file-utils";
const update_contents_tasks_1 = require("./update-contents-tasks");
const file_utils_1 = require("./file-utils");
// import { isValidRange, isValidRollout, isValidDeployment, validateVersion } from "./validation-utils";
const validation_utils_1 = require("./validation-utils");
const mappdl_file_upload_client_1 = require("mappdl-file-upload-client");
const chalk = require("chalk");
const debug = require("debug")("mappdl-cli:commands:release-base");
class CodePushReleaseCommandBase extends commandline_1.AppCommand {
    constructor(args) {
        super(args);
        this.fileUploadClient = new mappdl_file_upload_client_1.default();
    }
    run(client) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("For dev purposes only!");
        });
    }
    release(client) {
        return __awaiter(this, void 0, void 0, function* () {
            // out.text(chalk.cyan("\nDEBUG LOG release(client: MappDLClient): Promise<CommandResult> \n" + this.specifiedRollout));
            this.rollout = Number(this.specifiedRollout);
            const validationResult = yield this.validate(client);
            if (!validationResult.succeeded) {
                interaction_1.out.text(chalk.cyan("\nReleasing validationResult error \n"));
                return validationResult;
            }
            // this.deploymentName = ""; // this.specifiedDeploymentName;
            // if (this.privateKeyPath) {
            //   out.text(chalk.cyan("\nReleasing privateKeyPath ... \n"));
            //   const appInfo = await out.progress("Getting app info...", client.apps.get(this.app.ownerName, this.app.appName));
            //   const platform = appInfo.platform.toLowerCase();
            //   // In React-Native case we should add "CodePush" name folder as root for relase files for keeping sync with React Native client SDK.
            //   // Also single file also should be in "CodePush" folder.
            //   if (
            //     platform === "react-native" &&
            //     (getLastFolderInPath(this.updateContentsPath) !== "CodePush" || !isDirectory(this.updateContentsPath))
            //   ) {
            //     await moveReleaseFilesInTmpFolder(this.updateContentsPath).then((tmpPath: string) => {
            //       this.updateContentsPath = tmpPath;
            //     });
            //   }
            //   await sign(this.privateKeyPath, this.updateContentsPath);
            // }
            const updateContentsZipPath = yield update_contents_tasks_1.zip(this.updateContentsPath);
            interaction_1.out.text(chalk.cyan("\nReleasing checkTargetBinaryVersion ... \n"));
            try {
                const app = this.app;
                this.checkTargetBinaryVersion(this.targetBinaryVersion);
                // await out.text("Uploading start upload..." + this.deploymentName);
                const releaseUpload = this.upload(client, app, updateContentsZipPath);
                // await out.text("DEBUG LOG Uploading updateContentsZipPath upload..." + updateContentsZipPath);
                // await out.progress("DEBUG LOG Uploading bundle ...", releaseUpload);
                // await out.text("DEBUG LOG Uploading upload await...");
                const uploadedRelease = yield releaseUpload;
                // await out.text("DEBUG LOG Uploading done upload 123..." + JSON.stringify(uploadedRelease));
                yield interaction_1.out.progress("Creating CodePush release...", this.createRelease(client, app, {
                    releaseUpload: uploadedRelease,
                    targetBinaryVersion: this.targetBinaryVersion,
                    // targetBinaryVersionCode: this.targetBinaryVersionCode,
                    description: this.description,
                    disabled: this.disabled,
                    mandatory: this.mandatory,
                    rollout: this.rollout,
                }));
                // out.text(
                //   `Successfully released an update containing the "${this.updateContentsPath}" ` +
                //     `${fs.lstatSync(this.updateContentsPath).isDirectory() ? "directory" : "file"}` +
                //     ` to the "${this.deploymentName}" deployment of the "${this.app.appName}" app.`
                // );
                // out.text(`Successfully released an update: "${this.deploymentName}" of the "${this.app.appName}" app.`);
                interaction_1.out.text(`Successfully released update for app "${this.app.appName}".`);
                return commandline_1.success();
            }
            catch (error) {
                // // console.warn(chalk.yellow("DEBUG LOG [Error this.createRelease(client, app, this.deploymentName] " + JSON.stringify(error)));
                // if (error.response?.status === 409 && this.disableDuplicateReleaseError) {
                //   // 409 (Conflict) status code means that uploaded package is identical
                //   // to the contents of the specified deployment's current release
                //   console.warn(chalk.yellow("[Warning] " + error.response?.bodyAsText));
                //   return success();
                // } else {
                debug(`Failed to release a CodePush update - ${util_1.inspect(error)}`);
                return commandline_1.failure(commandline_1.ErrorCodes.Exception, error.response ? error.response.bodyAsText : error);
                // }
            }
            finally {
                yield pfs.rmDir(updateContentsZipPath);
            }
        });
    }
    upload(client, app, updateContentsZipPath) {
        return __awaiter(this, void 0, void 0, function* () {
            debug(`Starting release upload on deployment:  with zip file: ${updateContentsZipPath}`);
            // await out.text("DEBUG LOG Uploading codePushDeploymentUpload start..." + deploymentName + " " + app.ownerName + " " + app.appName);
            const releaseUpload = yield client.codePushDeploymentUpload.create(app.ownerName, app.appName);
            // await out.text("DEBUG LOG Uploading codePushDeploymentUpload next... 1: " + JSON.stringify(releaseUpload));
            yield this.uploadBundle(releaseUpload, updateContentsZipPath);
            return releaseUpload;
        });
    }
    createRelease(client, app, uploadedRelease) {
        return __awaiter(this, void 0, void 0, function* () {
            debug(`Starting release process on deployment: with uploaded release metadata: ${util_1.inspect(uploadedRelease)}`);
            // await out.text(`DEBUG LOG Starting: ${deploymentName} with uploaded release metadata: ${inspect(uploadedRelease)}\n`);
            //const res =
            yield client.codePushDeploymentReleases.create(app.ownerName, app.appName, uploadedRelease);
            // await out.text("DEBUG LOG client.codePushDeploymentReleases.create: " + JSON.stringify(res));
        });
    }
    uploadBundle(releaseUpload, bundleZipPath) {
        return __awaiter(this, void 0, void 0, function* () {
            debug(`Starting to upload the release bundle: ${bundleZipPath} with upload data: ${util_1.inspect(releaseUpload)}`);
            // await out.text(`Upload client message bundleZipPath:${bundleZipPath}`);
            yield this.fileUploadClient.upload({
                assetId: releaseUpload.id,
                assetDomain: releaseUpload.uploadDomain,
                assetToken: releaseUpload.token,
                file: bundleZipPath,
                onMessage: (message, level) => __awaiter(this, void 0, void 0, function* () {
                    debug(`Upload client message: ${message}`);
                    if (message && message.startsWith("#111")) {
                        yield interaction_1.out.text(message.replace("#111", "").trim());
                    }
                    // await out.text(`DEBUG LOG Upload client message: ${message}`);
                }),
            });
        });
    }
    checkTargetBinaryVersion(version) {
        const warningVersion = validation_utils_1.validateVersion(version);
        if (warningVersion) {
            interaction_1.out.text(`\nYour target-binary-version "${version}" will be treated as "${warningVersion}".\n`);
        }
    }
    validate(client) {
        return __awaiter(this, void 0, void 0, function* () {
            if (file_utils_1.isBinaryOrZip(this.updateContentsPath)) {
                return commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, "It is unnecessary to package releases in a .zip or binary file. Please specify the direct path to the update content's directory (e.g. /platforms/ios/www) or file (e.g. main.jsbundle).");
            }
            if (!validation_utils_1.isValidRange(this.targetBinaryVersion)) {
                return commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, "Invalid binary version(s) for a release.");
            }
            if (!Number.isSafeInteger(this.rollout) || !validation_utils_1.isValidRollout(this.rollout)) {
                return commandline_1.failure(commandline_1.ErrorCodes.InvalidParameter, `Rollout value should be integer value between ${chalk.bold("1")} and ${chalk.bold("100")}.`);
            }
            // if (!this.deploymentName && !(await isValidDeployment(client, this.app, this.specifiedDeploymentName))) {
            //   return failure(ErrorCodes.InvalidParameter, `Deployment "${this.specifiedDeploymentName}" does not exist.`);
            // }
            return commandline_1.success();
        });
    }
}
__decorate([
    commandline_1.help("Description of the changes made to the app in this release"),
    commandline_1.longName("description"),
    commandline_1.hasArg
], CodePushReleaseCommandBase.prototype, "description", void 0);
__decorate([
    commandline_1.help("Specifies whether this release should be immediately downloadable"),
    commandline_1.shortName("x"),
    commandline_1.longName("disabled")
], CodePushReleaseCommandBase.prototype, "disabled", void 0);
__decorate([
    commandline_1.help("Specifies whether this release should be considered mandatory"),
    commandline_1.shortName("m"),
    commandline_1.longName("mandatory")
], CodePushReleaseCommandBase.prototype, "mandatory", void 0);
__decorate([
    commandline_1.help("Percentage of users this release should be available to"),
    commandline_1.shortName("r"),
    commandline_1.longName("rollout"),
    commandline_1.defaultValue("100"),
    commandline_1.hasArg
], CodePushReleaseCommandBase.prototype, "specifiedRollout", void 0);
exports.default = CodePushReleaseCommandBase;
