"use strict";
//
// Custom credentials object for talking to MappDL
//
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappDLClientCredentials = void 0;
const debug = require("debug")("mappdl-cli:util:apis:mappdl-client-credentials");
class MappDLClientCredentials {
    constructor(getToken) {
        debug(`Constructor with getToken = ${getToken} of type ${typeof getToken}`);
        this.getToken = getToken;
    }
    signRequest(request, callback) {
        debug("Getting token for request");
        this.getToken()
            .then((token) => {
            debug(`got token ${token} of type ${typeof token}`);
            request.headers.set("x-api-token", token);
            callback(null);
        })
            .catch((err) => {
            debug("Token fetch failed, failing request");
            callback(err);
        });
    }
}
exports.MappDLClientCredentials = MappDLClientCredentials;
