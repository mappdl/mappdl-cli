"use strict";
/*
 * Copyright (c) MappDL Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by MappDL (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodePushDeploymentsImpl = void 0;
const coreClient = require("@azure/core-client");
const Mappers = require("../models/mappers");
const Parameters = require("../models/parameters");
/** Class containing CodePushDeployments operations. */
class CodePushDeploymentsImpl {
    /**
     * Initialize a new instance of the class CodePushDeployments class.
     * @param client Reference to the service client
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Promote one release (default latest one) from one deployment to another
     * @param promoteDeploymentName deployment name
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param options The options parameters.
     */
    promote(promoteDeploymentName, ownerName, appName, options) {
        return this.client.sendOperationRequest({ promoteDeploymentName, ownerName, appName, options }, promoteOperationSpec);
    }
    /**
     * Deletes a CodePush Deployment for the given app
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param options The options parameters.
     */
    delete(ownerName, appName, options) {
        return this.client.sendOperationRequest({ ownerName, appName, options }, deleteOperationSpec);
    }
    /**
     * Gets a CodePush Deployment for the given app
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param options The options parameters.
     */
    get(ownerName, appName, options) {
        return this.client.sendOperationRequest({ ownerName, appName, options }, getOperationSpec);
    }
    /**
     * Modifies a CodePush Deployment for the given app
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param name
     * @param options The options parameters.
     */
    update(ownerName, appName, name, options) {
        return this.client.sendOperationRequest({ ownerName, appName, name, options }, updateOperationSpec);
    }
    /**
     * Gets a list of CodePush deployments for the given app
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param options The options parameters.
     */
    list(ownerName, appName, options) {
        return this.client.sendOperationRequest({ ownerName, appName, options }, listOperationSpec);
    }
    /**
     * Creates a CodePush Deployment for the given app
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param name
     * @param options The options parameters.
     */
    create(ownerName, appName, name, options) {
        return this.client.sendOperationRequest({ ownerName, appName, name, options }, createOperationSpec);
    }
}
exports.CodePushDeploymentsImpl = CodePushDeploymentsImpl;
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);
const promoteOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/deployments/promote_release/{promote_deployment_name}",
    httpMethod: "POST",
    responses: {
        200: {
            bodyMapper: Mappers.Paths1Ou643ZV01AppsOwnerNameAppNameDeploymentsDeploymentNamePromoteReleasePromoteDeploymentNamePostResponses200ContentApplicationJsonSchema
        },
        default: {
            bodyMapper: Mappers.Paths1Qz2Z0EV01AppsOwnerNameAppNameDeploymentsDeploymentNamePromoteReleasePromoteDeploymentNamePostResponsesDefaultContentApplicationJsonSchema
        }
    },
    requestBody: Parameters.release1,
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.promoteDeploymentName
    ],
    headerParameters: [Parameters.contentType, Parameters.accept],
    mediaType: "json",
    serializer
};
const deleteOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/deployments",
    httpMethod: "DELETE",
    responses: {
        204: {},
        default: {
            bodyMapper: Mappers.Paths3Tai91V01AppsOwnerNameAppNameDeploymentsDeploymentNameDeleteResponsesDefaultContentApplicationJsonSchema
        }
    },
    requestBody: Parameters.body11,
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
    ],
    headerParameters: [Parameters.contentType, Parameters.accept],
    mediaType: "json",
    serializer
};
const getOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/deployments",
    httpMethod: "GET",
    responses: {
        200: {
            bodyMapper: Mappers.PathsP17HdtV01AppsOwnerNameAppNameDeploymentsDeploymentNameGetResponses200ContentApplicationJsonSchema
        },
        default: {
            bodyMapper: Mappers.Paths2Je1MzV01AppsOwnerNameAppNameDeploymentsDeploymentNameGetResponsesDefaultContentApplicationJsonSchema
        }
    },
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
    ],
    headerParameters: [Parameters.accept],
    serializer
};
const updateOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/deployments",
    httpMethod: "PATCH",
    responses: {
        204: {},
        default: {
            bodyMapper: Mappers.Paths1O9H9InV01AppsOwnerNameAppNameDeploymentsDeploymentNamePatchResponsesDefaultContentApplicationJsonSchema
        }
    },
    requestBody: {
        parameterPath: { name: ["name"] },
        mapper: Object.assign(Object.assign({}, Mappers.PathsUaqn8EV01AppsOwnerNameAppNameDeploymentsDeploymentNamePatchRequestbodyContentApplicationJsonSchema), { required: true })
    },
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
    ],
    headerParameters: [Parameters.contentType, Parameters.accept],
    mediaType: "json",
    serializer
};
const listOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/deployments",
    httpMethod: "GET",
    responses: {
        200: {
            bodyMapper: {
                type: {
                    name: "Sequence",
                    element: {
                        type: {
                            name: "Composite",
                            className: "Paths1Hq3VntV01AppsOwnerNameAppNameDeploymentsGetResponses200ContentApplicationJsonSchemaItems"
                        }
                    }
                }
            }
        },
        default: {
            bodyMapper: Mappers.PathsBg34XwV01AppsOwnerNameAppNameDeploymentsGetResponsesDefaultContentApplicationJsonSchema
        }
    },
    urlParameters: [Parameters.$host, Parameters.ownerName, Parameters.appName],
    headerParameters: [Parameters.accept],
    serializer
};
const createOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/deployments",
    httpMethod: "POST",
    responses: {
        201: {
            bodyMapper: Mappers.PathsPwjhi2V01AppsOwnerNameAppNameDeploymentsPostResponses201ContentApplicationJsonSchema
        },
        default: {
            bodyMapper: Mappers.PathsIui0NlV01AppsOwnerNameAppNameDeploymentsPostResponsesDefaultContentApplicationJsonSchema
        }
    },
    requestBody: {
        parameterPath: {
            key: ["options", "key"],
            name: ["name"],
            latestRelease: ["options", "latestRelease"]
        },
        mapper: Object.assign(Object.assign({}, Mappers.Paths1Fgvm7MV01AppsOwnerNameAppNameDeploymentsPostRequestbodyContentApplicationJsonSchema), { required: true })
    },
    urlParameters: [Parameters.$host, Parameters.ownerName, Parameters.appName],
    headerParameters: [Parameters.contentType, Parameters.accept],
    mediaType: "json",
    serializer
};
