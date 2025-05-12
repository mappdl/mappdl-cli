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
exports.validateVersion = exports.isValidDeployment = exports.isValidRollout = exports.isValidRange = exports.isValidVersion = exports.isValidNumber = void 0;
const semver = require("semver");
const regexpForMajor = /^\d+$/;
const regexpForMajorMinor = /^\d+\.\d+$/;
// Check if the given string is number e.g 123
function isValidNumber(versionCode) {
    return !isNaN(parseInt(versionCode, 10));
}
exports.isValidNumber = isValidNumber;
// Check if the given string is a semver-compliant version number (e.g. '1.2.3')
// (missing minor/patch values will be added on server side to pass semver.satisfies check)
function isValidVersion(version) {
    return !!semver.valid(version) || regexpForMajorMinor.test(version) || regexpForMajor.test(version);
}
exports.isValidVersion = isValidVersion;
// Allow plain integer versions (as well as '1.0' values) for now, e.g. '1' is valid here and we assume that it is equal to '1.0.0'.
function isValidRange(semverRange) {
    return !!semver.validRange(semverRange);
}
exports.isValidRange = isValidRange;
function isValidRollout(rollout) {
    return rollout && rollout > 0 && rollout <= 100;
}
exports.isValidRollout = isValidRollout;
function isValidDeployment(client, app) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield client.codePushDeployments.get(app.ownerName, app.appName);
            return result !== null && result !== undefined;
        }
        catch (error) {
            if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 404) {
                // 404 is correct status code for this case
                return false;
            }
            throw error;
        }
        return false;
    });
}
exports.isValidDeployment = isValidDeployment;
function validateVersion(version) {
    if (regexpForMajorMinor.test(version)) {
        return version + ".X";
    }
    else if (regexpForMajor.test(version)) {
        return version + ".X.X";
    }
    else {
        return null;
    }
}
exports.validateVersion = validateVersion;
