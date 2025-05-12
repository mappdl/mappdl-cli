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
exports.downloadArtifacts = exports.downloadFileAndSave = void 0;
const fsHelper = require("../../util/misc/fs-helper");
const Fs = require("fs");
const os = require("os");
const path = require("path");
const node_fetch_1 = require("node-fetch");
const debug = require("debug")("mappdl-cli:util:misc:download");
function downloadFileAndSave(downloadUrl, filePath) {
    debug(`Downloading file from ${downloadUrl} to the path ${filePath}`);
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const response = yield node_fetch_1.default(downloadUrl);
        const dest = Fs.createWriteStream(filePath);
        response.body.pipe(dest);
        response.body.on("end", () => resolve());
        dest.on("error", reject);
    }));
}
exports.downloadFileAndSave = downloadFileAndSave;
function downloadArtifacts(command, streamingOutput, outputDir, testRunId, artifacts) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const key in artifacts) {
            const reportPath = fsHelper.generateAbsolutePath(outputDir);
            const pathToArchive = path.join(reportPath, `${key.toString()}.zip`);
            fsHelper.createLongPath(reportPath);
            yield downloadFileAndSave(artifacts[key], pathToArchive);
            // Print only in VSTS environment
            // https://docs.mappdl.com/en-us/vsts/build-release/concepts/definitions/build/variables?view=vsts&tabs=batch#tfbuild
            if (process.env["TF_BUILD"]) {
                streamingOutput.text((command) => {
                    return `##vso[task.setvariable variable=${key}]${pathToArchive}${os.EOL}`;
                }, command);
            }
            streamingOutput.text((command) => {
                return `Downloaded artifacts to ${pathToArchive}`;
            }, command);
        }
    });
}
exports.downloadArtifacts = downloadArtifacts;
