"use strict";
// Management for the current environment.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPortalUrlForEndpoint = exports.defaultEnvironmentName = exports.allEnvironments = exports.environments = exports.mappDLPortalEndpointEnvVar = exports.mappDLLoginEndpointEnvVar = exports.mappDLEndpointEnvVar = void 0;
// import { localEndpoint } from "../misc/constants";
exports.mappDLEndpointEnvVar = "MAPPDL_ENDPOINT";
exports.mappDLLoginEndpointEnvVar = "DCPPS_LOGIN_ENDPOINT";
exports.mappDLPortalEndpointEnvVar = "MAPPDL_PORTAL_ENDPOINT";
// Default environment data // "prod",
const environmentsData = {
    defaultEnvironment: "prod",
    environments: {
        int: {
            endpoint: "http://192.168.1.196:3000",
            loginEndpoint: "http://localhost",
            portalEndpoint: "https://localhost:883",
            description: "Integration",
        },
        prod: {
            endpoint: "https://cli.mappdl.com",
            loginEndpoint: "https://token.mappdl.com",
            portalEndpoint: "https://mappdl.com",
            description: "Production",
        },
        local: {
            endpoint: "http://localhost:3015/",
            loginEndpoint: "http://localhost:3000",
            portalEndpoint: "https://localhost:883",
            description: "Local Development",
        },
    },
};
function environments(environmentName = environmentsData.defaultEnvironment) {
    return environmentsData.environments[environmentName];
}
exports.environments = environments;
function allEnvironments() {
    return environmentsData;
}
exports.allEnvironments = allEnvironments;
function defaultEnvironmentName() {
    return environmentsData.defaultEnvironment;
}
exports.defaultEnvironmentName = defaultEnvironmentName;
function getPortalUrlForEndpoint(endpoint) {
    for (const environmentName of Object.keys(environmentsData.environments)) {
        const environment = environmentsData.environments[environmentName];
        if (environment.endpoint === endpoint) {
            return environment.portalEndpoint;
        }
    }
    throw new Error(`Unknown API endpoint - ${endpoint}`);
}
exports.getPortalUrlForEndpoint = getPortalUrlForEndpoint;
