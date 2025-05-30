"use strict";
/*
 * Copyright (c) MappDL Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by MappDL (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersImpl = void 0;
const coreClient = require("@azure/core-client");
const Mappers = require("../models/mappers");
const Parameters = require("../models/parameters");
/** Class containing Users operations. */
class UsersImpl {
    /**
     * Initialize a new instance of the class Users class.
     * @param client Reference to the service client
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * test
     * @param options The options parameters.
     */
    getUserMetadata(options) {
        return this.client.sendOperationRequest({ options }, getUserMetadataOperationSpec);
    }
    /**
     * Returns the user profile data
     * @param options The options parameters.
     */
    get(options) {
        return this.client.sendOperationRequest({ options }, getOperationSpec);
    }
    /**
     * Updates the user profile and returns the updated user data
     * @param options The options parameters.
     */
    update(options) {
        return this.client.sendOperationRequest({ options }, updateOperationSpec);
    }
    /**
     * Updates the given organization user
     * @param orgName The organization's name
     * @param userName The slug name of the user
     * @param options The options parameters.
     */
    updateOrgRole(orgName, userName, options) {
        return this.client.sendOperationRequest({ orgName, userName, options }, updateOrgRoleOperationSpec);
    }
    /**
     * Removes a user from an organization.
     * @param orgName The organization's name
     * @param userName The slug name of the user
     * @param options The options parameters.
     */
    removeFromOrg(orgName, userName, options) {
        return this.client.sendOperationRequest({ orgName, userName, options }, removeFromOrgOperationSpec);
    }
    /**
     * Get a user information from an organization by name - if there is explicit permission return it, if
     * not if not return highest implicit permission
     * @param orgName The organization's name
     * @param userName The slug name of the user
     * @param options The options parameters.
     */
    getForOrg(orgName, userName, options) {
        return this.client.sendOperationRequest({ orgName, userName, options }, getForOrgOperationSpec);
    }
    /**
     * Returns a list of users that belong to an organization
     * @param orgName The organization's name
     * @param options The options parameters.
     */
    listForOrg(orgName, options) {
        return this.client.sendOperationRequest({ orgName, options }, listForOrgOperationSpec);
    }
    /**
     * Returns the users associated with the app specified with the given app name which belongs to the
     * given owner.
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param options The options parameters.
     */
    list(ownerName, appName, options) {
        return this.client.sendOperationRequest({ ownerName, appName, options }, listOperationSpec);
    }
}
exports.UsersImpl = UsersImpl;
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);
const getUserMetadataOperationSpec = {
    path: "/v0.1/user/metadata/optimizely",
    httpMethod: "GET",
    responses: {
        200: {
            bodyMapper: Mappers.Paths1Bjp26QV01UserMetadataOptimizelyGetResponses200ContentApplicationJsonSchema
        },
        default: {
            bodyMapper: Mappers.Paths15Bir6ZV01UserMetadataOptimizelyGetResponsesDefaultContentApplicationJsonSchema
        }
    },
    urlParameters: [Parameters.$host],
    headerParameters: [Parameters.accept],
    serializer
};
const getOperationSpec = {
    path: "/v0.1/user",
    httpMethod: "GET",
    responses: {
        200: {
            bodyMapper: Mappers.Paths12V17NbV01UserGetResponses200ContentApplicationJsonSchema
        },
        default: {
            bodyMapper: Mappers.Paths484N4EV01UserGetResponsesDefaultContentApplicationJsonSchema
        }
    },
    urlParameters: [Parameters.$host],
    headerParameters: [Parameters.accept],
    serializer
};
const updateOperationSpec = {
    path: "/v0.1/user",
    httpMethod: "PATCH",
    responses: {
        200: {
            bodyMapper: Mappers.Paths1Stph4IV01UserPatchResponses200ContentApplicationJsonSchema
        },
        default: {
            bodyMapper: Mappers.Paths4ScaxfV01UserPatchResponsesDefaultContentApplicationJsonSchema
        }
    },
    requestBody: {
        parameterPath: { displayName: ["options", "displayName"] },
        mapper: Object.assign(Object.assign({}, Mappers.Paths2EstpdV01UserPatchRequestbodyContentApplicationJsonSchema), { required: true })
    },
    urlParameters: [Parameters.$host],
    headerParameters: [Parameters.contentType, Parameters.accept],
    mediaType: "json",
    serializer
};
const updateOrgRoleOperationSpec = {
    path: "/v0.1/orgs/{org_name}/users/{user_name}",
    httpMethod: "PATCH",
    responses: {
        200: {
            bodyMapper: Mappers.PathsPp9E5UV01OrgsOrgNameUsersUserNamePatchResponses200ContentApplicationJsonSchema
        },
        default: {
            bodyMapper: Mappers.PathsAmri8GV01OrgsOrgNameUsersUserNamePatchResponsesDefaultContentApplicationJsonSchema
        }
    },
    requestBody: {
        parameterPath: { role: ["options", "role"] },
        mapper: Object.assign(Object.assign({}, Mappers.PathsP1N751V01OrgsOrgNameUsersUserNamePatchRequestbodyContentApplicationJsonSchema), { required: true })
    },
    urlParameters: [Parameters.$host, Parameters.orgName, Parameters.userName],
    headerParameters: [Parameters.contentType, Parameters.accept],
    mediaType: "json",
    serializer
};
const removeFromOrgOperationSpec = {
    path: "/v0.1/orgs/{org_name}/users/{user_name}",
    httpMethod: "DELETE",
    responses: {
        204: {},
        default: {
            bodyMapper: Mappers.Paths13YqyzyV01OrgsOrgNameUsersUserNameDeleteResponsesDefaultContentApplicationJsonSchema
        }
    },
    urlParameters: [Parameters.$host, Parameters.orgName, Parameters.userName],
    headerParameters: [Parameters.accept],
    serializer
};
const getForOrgOperationSpec = {
    path: "/v0.1/orgs/{org_name}/users/{user_name}",
    httpMethod: "GET",
    responses: {
        200: {
            bodyMapper: Mappers.PathsJys8A7V01OrgsOrgNameUsersUserNameGetResponses200ContentApplicationJsonSchema
        },
        default: {
            bodyMapper: Mappers.Paths1H2Meo6V01OrgsOrgNameUsersUserNameGetResponsesDefaultContentApplicationJsonSchema
        }
    },
    urlParameters: [Parameters.$host, Parameters.orgName, Parameters.userName],
    headerParameters: [Parameters.accept],
    serializer
};
const listForOrgOperationSpec = {
    path: "/v0.1/orgs/{org_name}/users",
    httpMethod: "GET",
    responses: {
        200: {
            bodyMapper: {
                type: {
                    name: "Sequence",
                    element: {
                        type: {
                            name: "Composite",
                            className: "PathsCwimmqV01OrgsOrgNameUsersGetResponses200ContentApplicationJsonSchemaItems"
                        }
                    }
                }
            }
        },
        default: {
            bodyMapper: Mappers.Paths1Repp9WV01OrgsOrgNameUsersGetResponsesDefaultContentApplicationJsonSchema
        }
    },
    urlParameters: [Parameters.$host, Parameters.orgName],
    headerParameters: [Parameters.accept],
    serializer
};
const listOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/users",
    httpMethod: "GET",
    responses: {
        200: {
            bodyMapper: {
                type: {
                    name: "Sequence",
                    element: {
                        type: {
                            name: "Composite",
                            className: "PathsMm38I5V01AppsOwnerNameAppNameUsersGetResponses200ContentApplicationJsonSchemaItems"
                        }
                    }
                }
            }
        },
        default: {
            bodyMapper: Mappers.PathsBpjejcV01AppsOwnerNameAppNameUsersGetResponsesDefaultContentApplicationJsonSchema
        }
    },
    urlParameters: [Parameters.$host, Parameters.ownerName, Parameters.appName],
    headerParameters: [Parameters.accept],
    serializer
};
