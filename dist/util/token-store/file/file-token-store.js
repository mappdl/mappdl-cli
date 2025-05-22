"use strict";
//
// file-token-store - implementation of token store that stores the data in
// a JSON encoded file on dist.
//
// This doesn't secure the data in any way, relies on the directory having
// proper security settings.
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKey = exports.toKokeyData = exports.createFileTokenStore = exports.FileTokenStore = void 0;
const fs = require("fs");
const path = require("path");
const rx = require("rxjs");
const operators_1 = require("rxjs/operators");
const lodash_1 = require("lodash");
const base64js = require("base64-js");
const debug = require("debug")("mappdl-cli:util:token-store:file:file-token-store");
// import { out } from "../../interaction";
class FileTokenStore {
    constructor(filePath) {
        this.filePath = filePath;
        this.tokenStoreCache = null;
    }
    getStoreFilePath() {
        return this.filePath;
    }
    list() {
        this.loadTokenStoreCache();
        return rx
            .from(lodash_1.toPairs(this.tokenStoreCache))
            .pipe(operators_1.map((pair) => ({ key: pair[0], accessToken: pair[1] })));
    }
    get(key) {
        this.loadTokenStoreCache();
        const token = this.tokenStoreCache[key];
        if (!token) {
            return Promise.resolve(null);
        }
        return Promise.resolve({ key: key, accessToken: token });
    }
    set(key, value) {
        this.loadTokenStoreCache();
        this.tokenStoreCache[key] = value;
        this.writeTokenStoreCache();
        return Promise.resolve();
    }
    remove(key) {
        this.loadTokenStoreCache();
        delete this.tokenStoreCache[key];
        this.writeTokenStoreCache();
        return Promise.resolve();
    }
    loadTokenStoreCache() {
        // out.text(`Loading token store cache from file ${this.filePath}`);
        if (this.tokenStoreCache === null) {
            debug(`Loading token store cache from file ${this.filePath}`);
            // Ensure directory exists
            try {
                fs.mkdirSync(path.dirname(this.filePath));
            }
            catch (err) {
                if (err.code !== "EEXIST") {
                    debug(`Unable to create token store cache directory: ${err.message}`);
                    throw err;
                }
            }
            try {
                this.tokenStoreCache = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
                if (this.tokenStoreCache) {
                    const keys = Object.keys(this.tokenStoreCache);
                    if (keys.length > 0) {
                        keys.forEach((key) => {
                            const obj = this.tokenStoreCache[key];
                            if (obj.token) {
                                const newT = exports.getKey(obj.token, obj.expire, key);
                                this.tokenStoreCache[key] = Object.assign(Object.assign({}, obj), { token: newT.ob });
                            }
                        });
                    }
                }
                // out.text(`Token store loaded from file: ` + JSON.stringify(this.tokenStoreCache));
                debug(`Token store loaded from file: `);
            }
            catch (err) {
                if (err.code !== "ENOENT") {
                    debug(`Failed to load or parse token store file`);
                    throw err;
                }
                debug(`No token cache file, creating new empty cache`);
                this.tokenStoreCache = {};
            }
        }
    }
    writeTokenStoreCache() {
        debug(`Saving token store file to ${this.filePath}`);
        // out.text(`Saving token store file to ${this.filePath}: ` + JSON.stringify(this.tokenStoreCache));
        const expireDate = new Date().getTime() + 2 * 24 * 60 * 60 * 1000;
        const savedInfo = {};
        const keys = Object.keys(this.tokenStoreCache);
        if (keys.length > 0) {
            keys.forEach((key) => {
                const obj = this.tokenStoreCache[key];
                if (obj.token) {
                    const newT = exports.toKokeyData({ ob: obj.token }, expireDate, key);
                    savedInfo[key] = Object.assign(Object.assign({}, obj), { token: newT, expire: expireDate });
                }
            });
        }
        // out.text(`Saving token store file to: ` + JSON.stringify(savedInfo));
        fs.writeFileSync(this.filePath, JSON.stringify(savedInfo));
    }
}
exports.FileTokenStore = FileTokenStore;
function createFileTokenStore(pathName) {
    return new FileTokenStore(pathName);
}
exports.createFileTokenStore = createFileTokenStore;
const getBase64 = (str) => {
    const textEncoder = new TextEncoder();
    const byteArray = textEncoder.encode(str);
    const base64String = base64js.fromByteArray(byteArray);
    return base64String;
};
const toKokeyData = (obj, number, useridKey) => {
    const userid = `${useridKey || "A153722!"}`;
    const requestTime = `${number || new Date().getTime()}`;
    const resJson = getBase64(JSON.stringify(obj));
    const nextText = getBase64(`${requestTime.slice(-2)}_${requestTime}`);
    const nextEmail = getBase64(`${requestTime.slice(-2)}_${userid}`);
    return `${nextText}${resJson}${nextEmail}`;
};
exports.toKokeyData = toKokeyData;
const getKey = (bodyData, number, useridKey) => {
    const userid = `${useridKey || "A153722!"}`;
    const requestTime = `${number || new Date().getTime()}`;
    const nextText = getBase64(`${requestTime.slice(-2)}_${requestTime}`);
    const nextEmail = getBase64(`${requestTime.slice(-2)}_${userid}`);
    let newStr = bodyData;
    if (!newStr) {
        return "";
    }
    if (newStr.startsWith(nextText)) {
        newStr = newStr.slice(nextText.length);
    }
    if (newStr.endsWith(nextEmail)) {
        newStr = newStr.slice(0, -nextEmail.length);
    }
    const byteArray = base64js.toByteArray(newStr);
    const textDecoder = new TextDecoder();
    const originalString = textDecoder.decode(byteArray);
    return JSON.parse(originalString);
};
exports.getKey = getKey;
