"use strict";
//
// Shared constants used across the CLI.
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.localEndpoint = exports.tokenFile = exports.profileFile = exports.oldProfileDirName = exports.profileDirName = exports.scriptName = void 0;
//
// Name of our command line interface program, used in help messages and a few other places
//
exports.scriptName = "mappdl";
//
// Directory name for profile files
//
exports.profileDirName = ".mappdl-cli";
exports.oldProfileDirName = ".mobile-center-cli";
// File name for profile file
//
exports.profileFile = "profile.json";
//
// Token file storage
//
exports.tokenFile = "tokens.json";
exports.localEndpoint = "https://localhost:1700";
