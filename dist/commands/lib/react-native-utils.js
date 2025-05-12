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
exports.getReactNativeVersion = exports.isValidPlatform = exports.isValidOS = exports.getiOSHermesEnabled = exports.getAndroidHermesEnabled = exports.runHermesEmitBinaryCommand = exports.runReactNativeBundleCommand = exports.getReactNativeProjectAppVersionCode = exports.getReactNativeProjectAppVersion = void 0;
const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const interaction_1 = require("../../util/interaction");
const validation_utils_1 = require("./validation-utils");
const file_utils_1 = require("./file-utils");
const semver_1 = require("semver");
const chalk = require("chalk");
const xcode = require("xcode");
const plist = require("plist");
const g2js = require("gradle-to-js/lib/parser");
const properties = require("properties");
const childProcess = require("child_process");
const fs_helper_1 = require("../../util/misc/fs-helper");
function getReactNativeProjectAppVersion(versionSearchParams, projectRoot) {
    return __awaiter(this, void 0, void 0, function* () {
        projectRoot = projectRoot || process.cwd();
        // eslint-disable-next-line security/detect-non-literal-require
        const projectPackageJson = require(path.join(projectRoot, "package.json"));
        const projectName = projectPackageJson.name;
        const fileExists = (file) => {
            try {
                return fs.statSync(file).isFile();
            }
            catch (e) {
                return false;
            }
        };
        interaction_1.out.text(chalk.cyan(`Detecting ${versionSearchParams.os} app version:\n`));
        if (versionSearchParams.os === "ios") {
            let resolvedPlistFile = versionSearchParams.plistFile;
            if (resolvedPlistFile) {
                // If a plist file path is explicitly provided, then we don't
                // need to attempt to "resolve" it within the well-known locations.
                if (!fileExists(resolvedPlistFile)) {
                    throw new Error("The specified plist file doesn't exist. Please check that the provided path is correct.");
                }
            }
            else {
                // Allow the plist prefix to be specified with or without a trailing
                // separator character, but prescribe the use of a hyphen when omitted,
                // since this is the most commonly used convetion for plist files.
                if (versionSearchParams.plistFilePrefix && /.+[^-.]$/.test(versionSearchParams.plistFilePrefix)) {
                    versionSearchParams.plistFilePrefix += "-";
                }
                const iOSDirectory = "ios";
                const plistFileName = `${versionSearchParams.plistFilePrefix || ""}Info.plist`;
                const knownLocations = [path.join(iOSDirectory, projectName, plistFileName), path.join(iOSDirectory, plistFileName)];
                resolvedPlistFile = knownLocations.find(fileExists);
                if (!resolvedPlistFile) {
                    throw new Error(`Unable to find either of the following plist files in order to infer your app's binary version: "${knownLocations.join('", "')}". If your plist has a different name, or is located in a different directory, consider using either the "--plist-file" or "--plist-file-prefix" parameters to help inform the CLI how to find it.`);
                }
            }
            const plistContents = fs.readFileSync(resolvedPlistFile).toString();
            let parsedPlist;
            try {
                parsedPlist = plist.parse(plistContents);
            }
            catch (e) {
                throw new Error(`Unable to parse "${resolvedPlistFile}". Please ensure it is a well-formed plist file.`);
            }
            if (parsedPlist && parsedPlist.CFBundleShortVersionString) {
                if (validation_utils_1.isValidVersion(parsedPlist.CFBundleShortVersionString)) {
                    interaction_1.out.text(`Using the target binary version value "${parsedPlist.CFBundleShortVersionString}" from "${resolvedPlistFile}".\n`);
                    return Promise.resolve(parsedPlist.CFBundleShortVersionString);
                }
                else {
                    if (parsedPlist.CFBundleShortVersionString !== "$(MARKETING_VERSION)") {
                        throw new Error(`The "CFBundleShortVersionString" key in the "${resolvedPlistFile}" file needs to specify a valid semver string, containing both a major and minor version (e.g. 1.3.2, 1.1).`);
                    }
                    const pbxprojFileName = "project.pbxproj";
                    let resolvedPbxprojFile = versionSearchParams.projectFile;
                    if (resolvedPbxprojFile) {
                        // If a plist file path is explicitly provided, then we don't
                        // need to attempt to "resolve" it within the well-known locations.
                        if (!resolvedPbxprojFile.endsWith(pbxprojFileName)) {
                            // Specify path to pbxproj file if the provided file path is an Xcode project file.
                            resolvedPbxprojFile = path.join(resolvedPbxprojFile, pbxprojFileName);
                        }
                        if (!fileExists(resolvedPbxprojFile)) {
                            throw new Error("The specified pbx project file doesn't exist. Please check that the provided path is correct.");
                        }
                    }
                    else {
                        const iOSDirectory = "ios";
                        const xcodeprojDirectory = `${projectName}.xcodeproj`;
                        const pbxprojKnownLocations = [
                            path.join(iOSDirectory, xcodeprojDirectory, pbxprojFileName),
                            path.join(iOSDirectory, pbxprojFileName),
                        ];
                        resolvedPbxprojFile = pbxprojKnownLocations.find(fileExists);
                        if (!resolvedPbxprojFile) {
                            throw new Error(`Unable to find either of the following pbxproj files in order to infer your app's binary version: "${pbxprojKnownLocations.join('", "')}".`);
                        }
                    }
                    const xcodeProj = xcode.project(resolvedPbxprojFile).parseSync();
                    const marketingVersion = xcodeProj.getBuildProperty("MARKETING_VERSION", versionSearchParams.buildConfigurationName, versionSearchParams.xcodeTargetName);
                    if (!validation_utils_1.isValidVersion(marketingVersion)) {
                        throw new Error(`The "MARKETING_VERSION" key in the "${resolvedPbxprojFile}" file needs to specify a valid semver string, containing both a major and minor version (e.g. 1.3.2, 1.1).`);
                    }
                    interaction_1.out.text(`Using the target binary version value "${marketingVersion}" from "${resolvedPbxprojFile}".\n`);
                    return Promise.resolve(marketingVersion);
                }
            }
            else {
                throw new Error(`The "CFBundleShortVersionString" key doesn't exist within the "${resolvedPlistFile}" file.`);
            }
        }
        else if (versionSearchParams.os === "android") {
            let buildGradlePath = path.join("android", "app");
            if (versionSearchParams.gradleFile) {
                buildGradlePath = versionSearchParams.gradleFile;
            }
            if (fs.lstatSync(buildGradlePath).isDirectory()) {
                buildGradlePath = path.join(buildGradlePath, "build.gradle");
            }
            if (file_utils_1.fileDoesNotExistOrIsDirectory(buildGradlePath)) {
                throw new Error(`Unable to find gradle file "${buildGradlePath}".`);
            }
            return g2js
                .parseFile(buildGradlePath)
                .catch(() => {
                throw new Error(`Unable to parse the "${buildGradlePath}" file. Please ensure it is a well-formed Gradle file.`);
            })
                .then((buildGradle) => {
                let versionName = null;
                // First 'if' statement was implemented as workaround for case
                // when 'build.gradle' file contains several 'android' nodes.
                // In this case 'buildGradle.android' prop represents array instead of object
                // due to parsing issue in 'g2js.parseFile' method.
                if (buildGradle.android instanceof Array) {
                    for (let i = 0; i < buildGradle.android.length; i++) {
                        const gradlePart = buildGradle.android[i];
                        if (gradlePart.defaultConfig && gradlePart.defaultConfig.versionName) {
                            versionName = gradlePart.defaultConfig.versionName;
                            break;
                        }
                    }
                }
                else if (buildGradle.android && buildGradle.android.defaultConfig && buildGradle.android.defaultConfig.versionName) {
                    versionName = buildGradle.android.defaultConfig.versionName;
                }
                else {
                    throw new Error(`The "${buildGradlePath}" file doesn't specify a value for the "android.defaultConfig.versionName" property.`);
                }
                if (typeof versionName !== "string") {
                    throw new Error(`The "android.defaultConfig.versionName" property value in "${buildGradlePath}" is not a valid string. If this is expected, consider using the --target-binary-version option to specify the value manually.`);
                }
                let appVersion = versionName.replace(/"/g, "").trim();
                if (validation_utils_1.isValidVersion(appVersion)) {
                    // The versionName property is a valid semver string,
                    // so we can safely use that and move on.
                    interaction_1.out.text(`Using the target binary version value "${appVersion}" from "${buildGradlePath}".\n`);
                    return appVersion;
                }
                // The version property isn't a valid semver string
                // so we assume it is a reference to a property variable.
                const propertyName = appVersion.replace("project.", "");
                const propertiesFileName = "gradle.properties";
                const knownLocations = [path.join("android", "app", propertiesFileName), path.join("android", propertiesFileName)];
                // Search for gradle properties across all `gradle.properties` files
                let propertiesFile = null;
                for (let i = 0; i < knownLocations.length; i++) {
                    propertiesFile = knownLocations[i];
                    if (fileExists(propertiesFile)) {
                        const propertiesContent = fs.readFileSync(propertiesFile).toString();
                        try {
                            const parsedProperties = properties.parse(propertiesContent);
                            appVersion = parsedProperties[propertyName];
                            if (appVersion) {
                                break;
                            }
                        }
                        catch (e) {
                            throw new Error(`Unable to parse "${propertiesFile}". Please ensure it is a well-formed properties file.`);
                        }
                    }
                }
                if (!appVersion) {
                    throw new Error(`No property named "${propertyName}" exists in the "${propertiesFile}" file.`);
                }
                if (!validation_utils_1.isValidVersion(appVersion)) {
                    throw new Error(`The "${propertyName}" property in the "${propertiesFile}" file needs to specify a valid semver string, containing both a major and minor version (e.g. 1.3.2, 1.1).`);
                }
                interaction_1.out.text(`Using the target binary version value "${appVersion}" from the "${propertyName}" key in the "${propertiesFile}" file.\n`);
                return appVersion.toString();
            });
        }
        else {
            const appxManifestFileName = "Package.appxmanifest";
            let appxManifestContents;
            let appxManifestContainingFolder;
            try {
                appxManifestContainingFolder = path.join("windows", projectName);
                appxManifestContents = fs.readFileSync(path.join(appxManifestContainingFolder, appxManifestFileName)).toString();
            }
            catch (err) {
                throw new Error(`Unable to find or read "${appxManifestFileName}" in the "${path.join("windows", projectName)}" folder.`);
            }
            return new Promise((resolve, reject) => {
                xml2js.parseString(appxManifestContents, (err, parsedAppxManifest) => {
                    if (err) {
                        reject(new Error(`Unable to parse the "${path.join(appxManifestContainingFolder, appxManifestFileName)}" file, it could be malformed.`));
                        return;
                    }
                    try {
                        const appVersion = parsedAppxManifest.Package.Identity[0]["$"].Version.match(/^\d+\.\d+\.\d+/)[0];
                        interaction_1.out.text(`Using the target binary version value "${appVersion}" from the "Identity" key in the "${appxManifestFileName}" file.\n`);
                        return resolve(appVersion);
                    }
                    catch (e) {
                        reject(new Error(`Unable to parse the package version from the "${path.join(appxManifestContainingFolder, appxManifestFileName)}" file.`));
                        return;
                    }
                });
            });
        }
    });
}
exports.getReactNativeProjectAppVersion = getReactNativeProjectAppVersion;
function getReactNativeProjectAppVersionCode(versionSearchParams, projectRoot) {
    return __awaiter(this, void 0, void 0, function* () {
        projectRoot = projectRoot || process.cwd();
        // eslint-disable-next-line security/detect-non-literal-require
        const projectPackageJson = require(path.join(projectRoot, "package.json"));
        const projectName = projectPackageJson.name;
        const fileExists = (file) => {
            try {
                return fs.statSync(file).isFile();
            }
            catch (e) {
                return false;
            }
        };
        interaction_1.out.text(chalk.cyan(`Detecting ${versionSearchParams.os} app ${versionSearchParams.os === "android" ? "versionCode" : "build·number"}\n`));
        if (versionSearchParams.os === "ios") {
            let resolvedPlistFile = versionSearchParams.plistFile;
            if (resolvedPlistFile) {
                // If a plist file path is explicitly provided, then we don't
                // need to attempt to "resolve" it within the well-known locations.
                if (!fileExists(resolvedPlistFile)) {
                    throw new Error("The specified plist file doesn't exist. Please check that the provided path is correct.");
                }
            }
            else {
                // Allow the plist prefix to be specified with or without a trailing
                // separator character, but prescribe the use of a hyphen when omitted,
                // since this is the most commonly used convetion for plist files.
                if (versionSearchParams.plistFilePrefix && /.+[^-.]$/.test(versionSearchParams.plistFilePrefix)) {
                    versionSearchParams.plistFilePrefix += "-";
                }
                const iOSDirectory = "ios";
                const plistFileName = `${versionSearchParams.plistFilePrefix || ""}Info.plist`;
                const knownLocations = [path.join(iOSDirectory, projectName, plistFileName), path.join(iOSDirectory, plistFileName)];
                resolvedPlistFile = knownLocations.find(fileExists);
                if (!resolvedPlistFile) {
                    throw new Error(`Unable to find either of the following plist files in order to infer your app's binary build number: "${knownLocations.join('", "')}". If your plist has a different name, or is located in a different directory, consider using either the "--plist-file" or "--plist-file-prefix" parameters to help inform the CLI how to find it.`);
                }
            }
            const plistContents = fs.readFileSync(resolvedPlistFile).toString();
            let parsedPlist;
            try {
                parsedPlist = plist.parse(plistContents);
            }
            catch (e) {
                throw new Error(`Unable to parse "${resolvedPlistFile}". Please ensure it is a well-formed plist file.`);
            }
            if (parsedPlist && parsedPlist.CFBundleVersion) {
                if (validation_utils_1.isValidVersion(parsedPlist.CFBundleVersion)) {
                    interaction_1.out.text(`Using the target binary version value "${parsedPlist.CFBundleVersion}" from "${resolvedPlistFile}".\n`);
                    return Promise.resolve(parsedPlist.CFBundleVersion);
                }
                else {
                    if (parsedPlist.CFBundleVersion !== "$(CURRENT_PROJECT_VERSION)") {
                        throw new Error(`The "CFBundleVersion" key in the "${resolvedPlistFile}" file needs to specify a valid semver string, containing both a major and minor version (e.g. 123, 999).`);
                    }
                    const pbxprojFileName = "project.pbxproj";
                    let resolvedPbxprojFile = versionSearchParams.projectFile;
                    if (resolvedPbxprojFile) {
                        // If a plist file path is explicitly provided, then we don't
                        // need to attempt to "resolve" it within the well-known locations.
                        if (!resolvedPbxprojFile.endsWith(pbxprojFileName)) {
                            // Specify path to pbxproj file if the provided file path is an Xcode project file.
                            resolvedPbxprojFile = path.join(resolvedPbxprojFile, pbxprojFileName);
                        }
                        if (!fileExists(resolvedPbxprojFile)) {
                            throw new Error("The specified pbx project file doesn't exist. Please check that the provided path is correct.");
                        }
                    }
                    else {
                        const iOSDirectory = "ios";
                        const xcodeprojDirectory = `${projectName}.xcodeproj`;
                        const pbxprojKnownLocations = [
                            path.join(iOSDirectory, xcodeprojDirectory, pbxprojFileName),
                            path.join(iOSDirectory, pbxprojFileName),
                        ];
                        resolvedPbxprojFile = pbxprojKnownLocations.find(fileExists);
                        if (!resolvedPbxprojFile) {
                            throw new Error(`Unable to find either of the following pbxproj files in order to infer your app's binary version: "${pbxprojKnownLocations.join('", "')}".`);
                        }
                    }
                    const xcodeProj = xcode.project(resolvedPbxprojFile).parseSync();
                    const marketingVersion = xcodeProj.getBuildProperty("CURRENT_PROJECT_VERSION", versionSearchParams.buildConfigurationName, versionSearchParams.xcodeTargetName);
                    if (!validation_utils_1.isValidNumber(marketingVersion)) {
                        throw new Error(`The "CURRENT_PROJECT_VERSION" key in the "${resolvedPbxprojFile}" file needs to specify a valid semver string, containing both a major and minor version (e.g. 122, 33).`);
                    }
                    interaction_1.out.text(`Using the target binary version value "${marketingVersion}" from "${resolvedPbxprojFile}".\n`);
                    return Promise.resolve(parseInt(marketingVersion, 10));
                }
            }
            else {
                throw new Error(`The "CFBundleVersion" key doesn't exist within the "${resolvedPlistFile}" file.`);
            }
        }
        else if (versionSearchParams.os === "android") {
            let buildGradlePath = path.join("android", "app");
            if (versionSearchParams.gradleFile) {
                buildGradlePath = versionSearchParams.gradleFile;
            }
            if (fs.lstatSync(buildGradlePath).isDirectory()) {
                buildGradlePath = path.join(buildGradlePath, "build.gradle");
            }
            if (file_utils_1.fileDoesNotExistOrIsDirectory(buildGradlePath)) {
                throw new Error(`Unable to find gradle file "${buildGradlePath}".`);
            }
            return g2js
                .parseFile(buildGradlePath)
                .catch(() => {
                throw new Error(`Unable to parse the "${buildGradlePath}" file. Please ensure it is a well-formed Gradle file.`);
            })
                .then((buildGradle) => {
                let versionCode = null;
                // First 'if' statement was implemented as workaround for case
                // when 'build.gradle' file contains several 'android' nodes.
                // In this case 'buildGradle.android' prop represents array instead of object
                // due to parsing issue in 'g2js.parseFile' method.
                if (buildGradle.android instanceof Array) {
                    for (let i = 0; i < buildGradle.android.length; i++) {
                        const gradlePart = buildGradle.android[i];
                        if (gradlePart.defaultConfig && gradlePart.defaultConfig.versionCode) {
                            versionCode = gradlePart.defaultConfig.versionCode;
                            break;
                        }
                    }
                }
                else if (buildGradle.android && buildGradle.android.defaultConfig && buildGradle.android.defaultConfig.versionCode) {
                    versionCode = buildGradle.android.defaultConfig.versionCode;
                }
                else {
                    throw new Error(`The "${buildGradlePath}" file doesn't specify a value for the "android.defaultConfig.versionCode" property.`);
                }
                // out.text(`Using the target binary versionCode value "${versionCode}" from "${buildGradlePath}".\n`);
                if (!validation_utils_1.isValidNumber(versionCode)) {
                    throw new Error(`The "android.defaultConfig.versionCode" property value in "${buildGradlePath}" is not a valid number. If this is expected, consider using the --number-build-version or -n option to specify the value manually.`);
                }
                interaction_1.out.text(`Using the target binary versionCode value "${versionCode}" from "${buildGradlePath}".\n`);
                return parseInt(versionCode, 10);
                // let appVersion: string = versionName.replace(/"/g, "").trim();
                // if (isValidNumber(versionCode)) {
                //   // The versionName property is a valid semver string,
                //   // so we can safely use that and move on.
                //   out.text(`Using the target binary version value "${appVersion}" from "${buildGradlePath}".\n`);
                //   return appVersion;
                // }
                // The version property isn't a valid semver string
                // so we assume it is a reference to a property variable.
                // const propertyName = appVersion.replace("project.", "");
                // const propertiesFileName = "gradle.properties";
                // const knownLocations = [path.join("android", "app", propertiesFileName), path.join("android", propertiesFileName)];
                // // Search for gradle properties across all `gradle.properties` files
                // let propertiesFile: string = null;
                // for (let i = 0; i < knownLocations.length; i++) {
                //   propertiesFile = knownLocations[i];
                //   if (fileExists(propertiesFile)) {
                //     const propertiesContent: string = fs.readFileSync(propertiesFile).toString();
                //     try {
                //       const parsedProperties: any = properties.parse(propertiesContent);
                //       appVersion = parsedProperties[propertyName];
                //       if (appVersion) {
                //         break;
                //       }
                //     } catch (e) {
                //       throw new Error(`Unable to parse "${propertiesFile}". Please ensure it is a well-formed properties file.`);
                //     }
                //   }
                // }
                // if (!appVersion) {
                //   throw new Error(`No property named "${propertyName}" exists in the "${propertiesFile}" file.`);
                // }
                // if (!isValidVersion(appVersion)) {
                //   throw new Error(
                //     `The "${propertyName}" property in the "${propertiesFile}" file needs to specify a valid semver string, containing both a major and minor version (e.g. 1.3.2, 1.1).`
                //   );
                // }
                // out.text(
                //   `Using the target binary version value "${appVersion}" from the "${propertyName}" key in the "${propertiesFile}" file.\n`
                // );
                // return appVersion.toString();
            });
        }
        else {
            // const appxManifestFileName: string = "Package.appxmanifest";
            // let appxManifestContents: string;
            // let appxManifestContainingFolder: string;
            // try {
            //   appxManifestContainingFolder = path.join("windows", projectName);
            //   appxManifestContents = fs.readFileSync(path.join(appxManifestContainingFolder, appxManifestFileName)).toString();
            // } catch (err) {
            //   throw new Error(`Unable to find or read "${appxManifestFileName}" in the "${path.join("windows", projectName)}" folder.`);
            // }
            // return new Promise<string>((resolve, reject) => {
            //   xml2js.parseString(appxManifestContents, (err: Error, parsedAppxManifest: any) => {
            //     if (err) {
            //       reject(
            //         new Error(
            //           `Unable to parse the "${path.join(appxManifestContainingFolder, appxManifestFileName)}" file, it could be malformed.`
            //         )
            //       );
            //       return;
            //     }
            //     try {
            //       const appVersion: string = parsedAppxManifest.Package.Identity[0]["$"].Version.match(/^\d+\.\d+\.\d+/)[0];
            //       out.text(
            //         `Using the target binary version value "${appVersion}" from the "Identity" key in the "${appxManifestFileName}" file.\n`
            //       );
            //       return resolve(appVersion);
            //     } catch (e) {
            //       reject(
            //         new Error(
            //           `Unable to parse the package version from the "${path.join(appxManifestContainingFolder, appxManifestFileName)}" file.`
            //         )
            //       );
            //       return;
            //     }
            //   });
            // });
            return Promise.resolve(0);
        }
    });
}
exports.getReactNativeProjectAppVersionCode = getReactNativeProjectAppVersionCode;
function runReactNativeBundleCommand(bundleName, development, entryFile, outputFolder, platform, sourcemapOutput, extraBundlerOptions) {
    const reactNativeBundleArgs = [];
    const envNodeArgs = process.env.CODE_PUSH_NODE_ARGS;
    if (typeof envNodeArgs !== "undefined") {
        Array.prototype.push.apply(reactNativeBundleArgs, envNodeArgs.trim().split(/\s+/));
    }
    Array.prototype.push.apply(reactNativeBundleArgs, [
        getCliPath(),
        "bundle",
        "--assets-dest",
        outputFolder,
        "--bundle-output",
        path.join(outputFolder, bundleName),
        "--dev",
        development,
        "--entry-file",
        entryFile,
        "--platform",
        platform,
        ...extraBundlerOptions,
    ]);
    if (sourcemapOutput) {
        reactNativeBundleArgs.push("--sourcemap-output", sourcemapOutput);
    }
    interaction_1.out.text(chalk.cyan('Running "react-native bundle" command:\n'));
    const reactNativeBundleProcess = childProcess.spawn("node", reactNativeBundleArgs);
    interaction_1.out.text(`node ${reactNativeBundleArgs.join(" ")}`);
    return new Promise((resolve, reject) => {
        reactNativeBundleProcess.stdout.on("data", (data) => {
            interaction_1.out.text(data.toString().trim());
        });
        reactNativeBundleProcess.stderr.on("data", (data) => {
            console.error(data.toString().trim());
        });
        reactNativeBundleProcess.on("close", (exitCode, signal) => {
            if (exitCode !== 0) {
                reject(new Error(`"react-native bundle" command failed (exitCode=${exitCode}, signal=${signal}).`));
            }
            resolve(null);
        });
    });
}
exports.runReactNativeBundleCommand = runReactNativeBundleCommand;
function runHermesEmitBinaryCommand(bundleName, outputFolder, sourcemapOutput, extraHermesFlags, gradleFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const hermesArgs = [];
        const envNodeArgs = process.env.CODE_PUSH_NODE_ARGS;
        if (typeof envNodeArgs !== "undefined") {
            Array.prototype.push.apply(hermesArgs, envNodeArgs.trim().split(/\s+/));
        }
        Array.prototype.push.apply(hermesArgs, [
            "-emit-binary",
            "-out",
            path.join(outputFolder, bundleName + ".hbc"),
            path.join(outputFolder, bundleName),
            ...extraHermesFlags,
        ]);
        if (sourcemapOutput) {
            hermesArgs.push("-output-source-map");
        }
        if (!interaction_1.isDebug()) {
            hermesArgs.push("-w");
        }
        interaction_1.out.text(chalk.cyan("Converting JS bundle to byte code via Hermes, running command:\n"));
        const hermesCommand = yield getHermesCommand(gradleFile);
        const hermesProcess = childProcess.spawn(hermesCommand, hermesArgs);
        interaction_1.out.text(`${hermesCommand} ${hermesArgs.join(" ")}`);
        return new Promise((resolve, reject) => {
            hermesProcess.stdout.on("data", (data) => {
                interaction_1.out.text(data.toString().trim());
            });
            hermesProcess.stderr.on("data", (data) => {
                console.error(data.toString().trim());
            });
            hermesProcess.on("close", (exitCode, signal) => {
                if (exitCode !== 0) {
                    reject(new Error(`"hermes" command failed (exitCode=${exitCode}, signal=${signal}).`));
                }
                // Copy HBC bundle to overwrite JS bundle
                const source = path.join(outputFolder, bundleName + ".hbc");
                const destination = path.join(outputFolder, bundleName);
                fs.copyFile(source, destination, (err) => {
                    if (err) {
                        console.error(err);
                        reject(new Error(`Copying file ${source} to ${destination} failed. "hermes" previously exited with code ${exitCode}.`));
                    }
                    fs.unlink(source, (err) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        resolve(null);
                    });
                });
            });
        }).then(() => {
            if (!sourcemapOutput) {
                // skip source map compose if source map is not enabled
                return;
            }
            const composeSourceMapsPath = getComposeSourceMapsPath();
            if (!composeSourceMapsPath) {
                throw new Error("react-native compose-source-maps.js scripts is not found");
            }
            const jsCompilerSourceMapFile = path.join(outputFolder, bundleName + ".hbc" + ".map");
            if (!fs.existsSync(jsCompilerSourceMapFile)) {
                throw new Error(`sourcemap file ${jsCompilerSourceMapFile} is not found`);
            }
            return new Promise((resolve, reject) => {
                const composeSourceMapsArgs = [composeSourceMapsPath, sourcemapOutput, jsCompilerSourceMapFile, "-o", sourcemapOutput];
                // https://github.com/facebook/react-native/blob/master/react.gradle#L211
                // https://github.com/facebook/react-native/blob/master/scripts/react-native-xcode.sh#L178
                // packager.sourcemap.map + hbc.sourcemap.map = sourcemap.map
                const composeSourceMapsProcess = childProcess.spawn("node", composeSourceMapsArgs);
                interaction_1.out.text(`${composeSourceMapsPath} ${composeSourceMapsArgs.join(" ")}`);
                composeSourceMapsProcess.stdout.on("data", (data) => {
                    interaction_1.out.text(data.toString().trim());
                });
                composeSourceMapsProcess.stderr.on("data", (data) => {
                    console.error(data.toString().trim());
                });
                composeSourceMapsProcess.on("close", (exitCode, signal) => {
                    if (exitCode !== 0) {
                        reject(new Error(`"compose-source-maps" command failed (exitCode=${exitCode}, signal=${signal}).`));
                    }
                    // Delete the HBC sourceMap, otherwise it will be included in 'code-push' bundle as well
                    fs.unlink(jsCompilerSourceMapFile, (err) => {
                        if (err) {
                            console.error(err);
                            reject(err);
                        }
                        resolve(null);
                    });
                });
            });
        });
    });
}
exports.runHermesEmitBinaryCommand = runHermesEmitBinaryCommand;
function parseBuildGradleFile(gradleFile) {
    let buildGradlePath = path.join("android", "app");
    if (gradleFile) {
        buildGradlePath = gradleFile;
    }
    if (fs.lstatSync(buildGradlePath).isDirectory()) {
        buildGradlePath = path.join(buildGradlePath, "build.gradle");
    }
    if (file_utils_1.fileDoesNotExistOrIsDirectory(buildGradlePath)) {
        throw new Error(`Unable to find gradle file "${buildGradlePath}".`);
    }
    return g2js.parseFile(buildGradlePath).catch(() => {
        throw new Error(`Unable to parse the "${buildGradlePath}" file. Please ensure it is a well-formed Gradle file.`);
    });
}
function getHermesCommandFromGradle(gradleFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const buildGradle = yield parseBuildGradleFile(gradleFile);
        const hermesCommandProperty = Array.from(buildGradle["project.ext.react"] || []).find((prop) => prop.trim().startsWith("hermesCommand:"));
        if (hermesCommandProperty) {
            return hermesCommandProperty.replace("hermesCommand:", "").trim().slice(1, -1);
        }
        else {
            return "";
        }
    });
}
function getAndroidHermesEnabled(gradleFile) {
    return parseBuildGradleFile(gradleFile).then((buildGradle) => {
        return Array.from(buildGradle["project.ext.react"] || []).some((line) => /^enableHermes\s{0,}:\s{0,}true/.test(line));
    });
}
exports.getAndroidHermesEnabled = getAndroidHermesEnabled;
function getiOSHermesEnabled(podFile) {
    let podPath = path.join("ios", "Podfile");
    if (podFile) {
        podPath = podFile;
    }
    if (file_utils_1.fileDoesNotExistOrIsDirectory(podPath)) {
        throw new Error(`Unable to find Podfile file "${podPath}".`);
    }
    try {
        const podFileContents = fs.readFileSync(podPath).toString();
        return /([^#\n]*:?hermes_enabled(\s+|\n+)?(=>|:)(\s+|\n+)?true)/.test(podFileContents);
    }
    catch (error) {
        throw error;
    }
}
exports.getiOSHermesEnabled = getiOSHermesEnabled;
function getHermesOSBin() {
    switch (process.platform) {
        case "win32":
            return "win64-bin";
        case "darwin":
            return "osx-bin";
        case "freebsd":
        case "linux":
        case "sunos":
        default:
            return "linux64-bin";
    }
}
function getHermesOSExe() {
    const react63orAbove = semver_1.compare(semver_1.coerce(getReactNativeVersion()).version, "0.63.0") !== -1;
    const hermesExecutableName = react63orAbove ? "hermesc" : "hermes";
    switch (process.platform) {
        case "win32":
            return hermesExecutableName + ".exe";
        default:
            return hermesExecutableName;
    }
}
function getHermesCommand(gradleFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileExists = (file) => {
            try {
                return fs.statSync(file).isFile();
            }
            catch (e) {
                return false;
            }
        };
        // Hermes is bundled with react-native since 0.69
        const bundledHermesEngine = path.join(getReactNativePackagePath(), "sdks", "hermesc", getHermesOSBin(), getHermesOSExe());
        if (fileExists(bundledHermesEngine)) {
            return bundledHermesEngine;
        }
        const gradleHermesCommand = yield getHermesCommandFromGradle(gradleFile);
        if (gradleHermesCommand) {
            return path.join("android", "app", gradleHermesCommand.replace("%OS-BIN%", getHermesOSBin()));
        }
        else {
            // assume if hermes-engine exists it should be used instead of hermesvm
            const hermesEngine = path.join("node_modules", "hermes-engine", getHermesOSBin(), getHermesOSExe());
            if (fileExists(hermesEngine)) {
                return hermesEngine;
            }
            return path.join("node_modules", "hermesvm", getHermesOSBin(), "hermes");
        }
    });
}
function getComposeSourceMapsPath() {
    // detect if compose-source-maps.js script exists
    const composeSourceMaps = path.join(getReactNativePackagePath(), "scripts", "compose-source-maps.js");
    if (fs.existsSync(composeSourceMaps)) {
        return composeSourceMaps;
    }
    return null;
}
function getCliPath() {
    if (process.platform === "win32") {
        return path.join(getReactNativePackagePath(), "local-cli", "cli.js");
    }
    return path.join("node_modules", ".bin", "react-native");
}
function getReactNativePackagePath() {
    const result = childProcess.spawnSync("node", ["--print", "require.resolve('react-native/package.json')"]);
    const packagePath = path.dirname(result.stdout.toString());
    if (result.status === 0 && fs_helper_1.directoryExistsSync(packagePath)) {
        return packagePath;
    }
    return path.join("node_modules", "react-native");
}
function isValidOS(os) {
    switch (os.toLowerCase()) {
        case "android":
        case "ios":
        case "windows":
            return true;
        default:
            return false;
    }
}
exports.isValidOS = isValidOS;
function isValidPlatform(platform) {
    return platform.toLowerCase() === "react-native";
}
exports.isValidPlatform = isValidPlatform;
function getReactNativeVersion() {
    let packageJsonFilename;
    let projectPackageJson;
    try {
        packageJsonFilename = path.join(process.cwd(), "package.json");
        projectPackageJson = JSON.parse(fs.readFileSync(packageJsonFilename, "utf-8"));
    }
    catch (error) {
        throw new Error(`Unable to find or read "package.json" in the CWD. The "release-react" command must be executed in a React Native project folder.`);
    }
    const projectName = projectPackageJson.name;
    if (!projectName) {
        throw new Error(`The "package.json" file in the CWD does not have the "name" field set.`);
    }
    return ((projectPackageJson.dependencies && projectPackageJson.dependencies["react-native"]) ||
        (projectPackageJson.devDependencies && projectPackageJson.devDependencies["react-native"]));
}
exports.getReactNativeVersion = getReactNativeVersion;
