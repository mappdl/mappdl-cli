"use strict";
/*
 * Copyright (c) MappDL Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by MappDL (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReleasesImpl = void 0;
const coreClient = require("@azure/core-client");
const Mappers = require("../models/mappers");
const Parameters = require("../models/parameters");
/** Class containing Releases operations. */
class ReleasesImpl {
    /**
     * Initialize a new instance of the class Releases class.
     * @param client Reference to the service client
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Return a list of applications that the user has tester permission to with the latest release for
     * each.
     * @param options The options parameters.
     */
    listTesterApps(options) {
        return this.client.sendOperationRequest({ options }, listTesterAppsOperationSpec);
    }
    /**
     * If 'latest' is not specified then it will return the specified release if it's enabled. If 'latest'
     * is specified, regardless of whether a release hash is provided, the latest enabled release is
     * returned.
     * @param appSecret The secret of the target application
     * @param releaseHash The hash of the release or 'latest' to get the latest release from all the
     *                    distribution groups assigned to the current user.
     * @param options The options parameters.
     */
    getLatestByHash(appSecret, releaseHash, options) {
        return this.client.sendOperationRequest({ appSecret, releaseHash, options }, getLatestByHashOperationSpec);
    }
    /**
     * Get the latest release distributed to a private group the given user is a member of for the given
     * app.
     * @param appSecret The secret of the target application
     * @param options The options parameters.
     */
    getLatestPrivateRelease(appSecret, options) {
        return this.client.sendOperationRequest({ appSecret, options }, getLatestPrivateReleaseOperationSpec);
    }
    /**
     * Delete the given tester from the all releases
     * @param testerId The id of the tester
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param options The options parameters.
     */
    deleteTesterFromDestinations(testerId, ownerName, appName, options) {
        return this.client.sendOperationRequest({ testerId, ownerName, appName, options }, deleteTesterFromDestinationsOperationSpec);
    }
    /**
     * Update details about the specified tester associated with the release
     * @param releaseId The ID of the release
     * @param testerId The id of the tester
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param mandatoryUpdate Whether a release is mandatory for the given destination
     * @param options The options parameters.
     */
    putDistributionTester(releaseId, testerId, ownerName, appName, mandatoryUpdate, options) {
        return this.client.sendOperationRequest({ releaseId, testerId, ownerName, appName, mandatoryUpdate, options }, putDistributionTesterOperationSpec);
    }
    /**
     * Delete the given tester from the release
     * @param releaseId The ID of the release
     * @param testerId The id of the tester
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param options The options parameters.
     */
    deleteDistributionTester(releaseId, testerId, ownerName, appName, options) {
        return this.client.sendOperationRequest({ releaseId, testerId, ownerName, appName, options }, deleteDistributionTesterOperationSpec);
    }
    /**
     * Distributes a release to a user
     * @param releaseId The ID of the release
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param email Tester's email address
     * @param options The options parameters.
     */
    addTesters(releaseId, ownerName, appName, email, options) {
        return this.client.sendOperationRequest({ releaseId, ownerName, appName, email, options }, addTestersOperationSpec);
    }
    /**
     * Delete the given distribution store from the release
     * @param releaseId The ID of the release
     * @param storeId The id of the distribution store
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param options The options parameters.
     */
    deleteDistributionStore(releaseId, storeId, ownerName, appName, options) {
        return this.client.sendOperationRequest({ releaseId, storeId, ownerName, appName, options }, deleteDistributionStoreOperationSpec);
    }
    /**
     * Distributes a release to a store
     * @param releaseId The ID of the release
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param id Unique id of the release destination
     * @param options The options parameters.
     */
    addStore(releaseId, ownerName, appName, id, options) {
        return this.client.sendOperationRequest({ releaseId, ownerName, appName, id, options }, addStoreOperationSpec);
    }
    /**
     * Update details about the specified distribution group associated with the release
     * @param releaseId The ID of the release
     * @param groupId The id of the releases destination
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param mandatoryUpdate Whether a release is mandatory for the given destination
     * @param options The options parameters.
     */
    putDistributionGroup(releaseId, groupId, ownerName, appName, mandatoryUpdate, options) {
        return this.client.sendOperationRequest({ releaseId, groupId, ownerName, appName, mandatoryUpdate, options }, putDistributionGroupOperationSpec);
    }
    /**
     * Delete the given distribution group from the release
     * @param releaseId The ID of the release
     * @param groupId The id of the distribution group
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param options The options parameters.
     */
    deleteDistributionGroup(releaseId, groupId, ownerName, appName, options) {
        return this.client.sendOperationRequest({ releaseId, groupId, ownerName, appName, options }, deleteDistributionGroupOperationSpec);
    }
    /**
     * Distributes a release to a group
     * @param releaseId The ID of the release
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param id Unique id of the release destination
     * @param options The options parameters.
     */
    addDistributionGroup(releaseId, ownerName, appName, id, options) {
        return this.client.sendOperationRequest({ releaseId, ownerName, appName, id, options }, addDistributionGroupOperationSpec);
    }
    /**
     * Get a release with id `release_id`. If `release_id` is `latest`, return the latest release that was
     * distributed to the current user (from all the distribution groups).
     * @param releaseId The ID of the release, or `latest` to get the latest release from all the
     *                  distribution groups assigned to the current user.
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param options The options parameters.
     */
    getLatestByUser(releaseId, ownerName, appName, options) {
        return this.client.sendOperationRequest({ releaseId, ownerName, appName, options }, getLatestByUserOperationSpec);
    }
    /**
     * Update details of a release.
     * @param releaseId The ID of the release
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param options The options parameters.
     */
    updateDetails(releaseId, ownerName, appName, options) {
        return this.client.sendOperationRequest({ releaseId, ownerName, appName, options }, updateDetailsOperationSpec);
    }
    /**
     * Updates a release.
     * @param releaseId The ID of the release
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param body The release information.
     * @param options The options parameters.
     */
    update(releaseId, ownerName, appName, body, options) {
        return this.client.sendOperationRequest({ releaseId, ownerName, appName, body, options }, updateOperationSpec);
    }
    /**
     * Deletes a release.
     * @param releaseId The ID of the release
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param options The options parameters.
     */
    delete(releaseId, ownerName, appName, options) {
        return this.client.sendOperationRequest({ releaseId, ownerName, appName, options }, deleteOperationSpec);
    }
    /**
     * Return detailed information about releases avaiable to a tester.
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param options The options parameters.
     */
    availableToTester(ownerName, appName, options) {
        return this.client.sendOperationRequest({ ownerName, appName, options }, availableToTesterOperationSpec);
    }
    /**
     * Return basic information about releases.
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param options The options parameters.
     */
    list(ownerName, appName, options) {
        return this.client.sendOperationRequest({ ownerName, appName, options }, listOperationSpec);
    }
    /**
     * Get the latest release from every distribution group associated with an application.
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param options The options parameters.
     */
    listLatest(ownerName, appName, options) {
        return this.client.sendOperationRequest({ ownerName, appName, options }, listLatestOperationSpec);
    }
    /**
     * Return detailed information about a distributed release in a given distribution group.
     * @param ownerName The name of the app owner
     * @param appName The name of the app
     * @param distributionGroupName The name of the distribution group.
     * @param releaseId Also supports the constant `latest`, which will return the latest release in the
     *                  distribution group.
     * @param options The options parameters.
     */
    getLatestByDistributionGroup(ownerName, appName, distributionGroupName, releaseId, options) {
        return this.client.sendOperationRequest({ ownerName, appName, distributionGroupName, releaseId, options }, getLatestByDistributionGroupOperationSpec);
    }
    /**
     * Deletes a release with id 'release_id' in a given distribution group.
     * @param ownerName The name of the app owner
     * @param appName The name of the app
     * @param distributionGroupName The name of the distribution group.
     * @param releaseId The ID identifying the unique release.
     * @param options The options parameters.
     */
    deleteWithDistributionGroupId(ownerName, appName, distributionGroupName, releaseId, options) {
        return this.client.sendOperationRequest({ ownerName, appName, distributionGroupName, releaseId, options }, deleteWithDistributionGroupIdOperationSpec);
    }
    /**
     * Return basic information about distributed releases in a given distribution group.
     * @param distributionGroupName The name of the distribution group.
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param options The options parameters.
     */
    listByDistributionGroup(distributionGroupName, ownerName, appName, options) {
        return this.client.sendOperationRequest({ distributionGroupName, ownerName, appName, options }, listByDistributionGroupOperationSpec);
    }
}
exports.ReleasesImpl = ReleasesImpl;
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);
const listTesterAppsOperationSpec = {
    path: "/v0.1/tester/apps",
    httpMethod: "GET",
    responses: {
        200: {
            bodyMapper: {
                type: {
                    name: "Sequence",
                    element: {
                        type: {
                            name: "Composite",
                            className: "PathsFvdb99V01TesterAppsGetResponses200ContentApplicationJsonSchemaItems"
                        }
                    }
                }
            }
        }
    },
    urlParameters: [Parameters.$host],
    headerParameters: [Parameters.accept],
    serializer
};
const getLatestByHashOperationSpec = {
    path: "/v0.1/sdk/apps/{app_secret}/releases/{release_hash}",
    httpMethod: "GET",
    responses: {
        200: {
            bodyMapper: Mappers.Paths3NwxqsV01SdkAppsAppSecretReleasesReleaseHashGetResponses200ContentApplicationJsonSchema
        },
        404: {
            bodyMapper: Mappers.Paths5W4BybV01SdkAppsAppSecretReleasesReleaseHashGetResponses404ContentApplicationJsonSchema
        }
    },
    queryParameters: [Parameters.udid],
    urlParameters: [
        Parameters.$host,
        Parameters.appSecret,
        Parameters.releaseHash
    ],
    headerParameters: [Parameters.accept],
    serializer
};
const getLatestPrivateReleaseOperationSpec = {
    path: "/v0.1/sdk/apps/{app_secret}/releases/private/latest",
    httpMethod: "GET",
    responses: {
        200: {
            bodyMapper: Mappers.Paths1Wkh2MwV01SdkAppsAppSecretReleasesPrivateLatestGetResponses200ContentApplicationJsonSchema
        },
        404: {
            bodyMapper: Mappers.Paths1WkrcwmV01SdkAppsAppSecretReleasesPrivateLatestGetResponses404ContentApplicationJsonSchema
        }
    },
    queryParameters: [Parameters.udid],
    urlParameters: [Parameters.$host, Parameters.appSecret],
    headerParameters: [Parameters.accept],
    serializer
};
const deleteTesterFromDestinationsOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/testers/{tester_id}",
    httpMethod: "DELETE",
    responses: {
        200: {},
        404: {
            bodyMapper: Mappers.Paths16X7GfoV01AppsOwnerNameAppNameTestersTesterIdDeleteResponses404ContentApplicationJsonSchema
        }
    },
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.testerId
    ],
    headerParameters: [Parameters.accept],
    serializer
};
const putDistributionTesterOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/releases/{release_id}/testers/{tester_id}",
    httpMethod: "PUT",
    responses: {
        200: {},
        404: {
            bodyMapper: Mappers.Paths7J8CcmV01AppsOwnerNameAppNameReleasesReleaseIdTestersTesterIdPutResponses404ContentApplicationJsonSchema
        }
    },
    requestBody: {
        parameterPath: { mandatoryUpdate: ["mandatoryUpdate"] },
        mapper: Object.assign(Object.assign({}, Mappers.PathsOjvewzV01AppsOwnerNameAppNameReleasesReleaseIdTestersTesterIdPutRequestbodyContentApplicationJsonSchema), { required: true })
    },
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.releaseId2,
        Parameters.testerId1
    ],
    headerParameters: [Parameters.contentType, Parameters.accept],
    mediaType: "json",
    serializer
};
const deleteDistributionTesterOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/releases/{release_id}/testers/{tester_id}",
    httpMethod: "DELETE",
    responses: {
        200: {},
        404: {
            bodyMapper: Mappers.Paths1RmbaiiV01AppsOwnerNameAppNameReleasesReleaseIdTestersTesterIdDeleteResponses404ContentApplicationJsonSchema
        }
    },
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.testerId,
        Parameters.releaseId2
    ],
    headerParameters: [Parameters.accept],
    serializer
};
const addTestersOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/releases/{release_id}/testers",
    httpMethod: "POST",
    responses: {
        201: {
            bodyMapper: Mappers.Paths5WvwkdV01AppsOwnerNameAppNameReleasesReleaseIdTestersPostResponses201ContentApplicationJsonSchema
        },
        400: {
            bodyMapper: Mappers.PathsVb1DjeV01AppsOwnerNameAppNameReleasesReleaseIdTestersPostResponses400ContentApplicationJsonSchema
        },
        404: {
            bodyMapper: Mappers.Paths1P68AoeV01AppsOwnerNameAppNameReleasesReleaseIdTestersPostResponses404ContentApplicationJsonSchema
        }
    },
    requestBody: {
        parameterPath: {
            mandatoryUpdate: ["options", "mandatoryUpdate"],
            email: ["email"],
            notifyTesters: ["options", "notifyTesters"]
        },
        mapper: Object.assign(Object.assign({}, Mappers.PathsF6Ye6UV01AppsOwnerNameAppNameReleasesReleaseIdTestersPostRequestbodyContentApplicationJsonSchema), { required: true })
    },
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.releaseId2
    ],
    headerParameters: [Parameters.contentType, Parameters.accept],
    mediaType: "json",
    serializer
};
const deleteDistributionStoreOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/releases/{release_id}/stores/{store_id}",
    httpMethod: "DELETE",
    responses: {
        200: {},
        404: {
            bodyMapper: Mappers.Paths1BbvdowV01AppsOwnerNameAppNameReleasesReleaseIdStoresStoreIdDeleteResponses404ContentApplicationJsonSchema
        }
    },
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.releaseId2,
        Parameters.storeId
    ],
    headerParameters: [Parameters.accept],
    serializer
};
const addStoreOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/releases/{release_id}/stores",
    httpMethod: "POST",
    responses: {
        201: {
            bodyMapper: Mappers.Paths1Tn9O5V01AppsOwnerNameAppNameReleasesReleaseIdStoresPostResponses201ContentApplicationJsonSchema
        },
        400: {
            bodyMapper: Mappers.Paths1Kf4BpnV01AppsOwnerNameAppNameReleasesReleaseIdStoresPostResponses400ContentApplicationJsonSchema
        },
        404: {
            bodyMapper: Mappers.Paths1T5QljtV01AppsOwnerNameAppNameReleasesReleaseIdStoresPostResponses404ContentApplicationJsonSchema
        }
    },
    requestBody: {
        parameterPath: { id: ["id"] },
        mapper: Object.assign(Object.assign({}, Mappers.Paths19I3T9ZV01AppsOwnerNameAppNameReleasesReleaseIdStoresPostRequestbodyContentApplicationJsonSchema), { required: true })
    },
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.releaseId2
    ],
    headerParameters: [Parameters.contentType, Parameters.accept],
    mediaType: "json",
    serializer
};
const putDistributionGroupOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/releases/{release_id}/groups/{group_id}",
    httpMethod: "PUT",
    responses: {
        200: {},
        404: {
            bodyMapper: Mappers.Paths11Dzu4BV01AppsOwnerNameAppNameReleasesReleaseIdGroupsGroupIdPutResponses404ContentApplicationJsonSchema
        }
    },
    requestBody: {
        parameterPath: { mandatoryUpdate: ["mandatoryUpdate"] },
        mapper: Object.assign(Object.assign({}, Mappers.Paths1Y3U3TvV01AppsOwnerNameAppNameReleasesReleaseIdGroupsGroupIdPutRequestbodyContentApplicationJsonSchema), { required: true })
    },
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.releaseId2,
        Parameters.groupId
    ],
    headerParameters: [Parameters.contentType, Parameters.accept],
    mediaType: "json",
    serializer
};
const deleteDistributionGroupOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/releases/{release_id}/groups/{group_id}",
    httpMethod: "DELETE",
    responses: {
        200: {},
        404: {
            bodyMapper: Mappers.Paths1Nrzr5YV01AppsOwnerNameAppNameReleasesReleaseIdGroupsGroupIdDeleteResponses404ContentApplicationJsonSchema
        }
    },
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.releaseId2,
        Parameters.groupId1
    ],
    headerParameters: [Parameters.accept],
    serializer
};
const addDistributionGroupOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/releases/{release_id}/groups",
    httpMethod: "POST",
    responses: {
        201: {
            bodyMapper: Mappers.PathsFv6EorV01AppsOwnerNameAppNameReleasesReleaseIdGroupsPostResponses201ContentApplicationJsonSchema
        },
        400: {
            bodyMapper: Mappers.PathsPtrb07V01AppsOwnerNameAppNameReleasesReleaseIdGroupsPostResponses400ContentApplicationJsonSchema
        },
        404: {
            bodyMapper: Mappers.Paths19Ueda8V01AppsOwnerNameAppNameReleasesReleaseIdGroupsPostResponses404ContentApplicationJsonSchema
        }
    },
    requestBody: {
        parameterPath: {
            id: ["id"],
            mandatoryUpdate: ["options", "mandatoryUpdate"],
            notifyTesters: ["options", "notifyTesters"]
        },
        mapper: Object.assign(Object.assign({}, Mappers.Paths1Jif7RyV01AppsOwnerNameAppNameReleasesReleaseIdGroupsPostRequestbodyContentApplicationJsonSchema), { required: true })
    },
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.releaseId2
    ],
    headerParameters: [Parameters.contentType, Parameters.accept],
    mediaType: "json",
    serializer
};
const getLatestByUserOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/releases/{release_id}",
    httpMethod: "GET",
    responses: {
        200: {
            bodyMapper: Mappers.Paths1Wtl5HpV01AppsOwnerNameAppNameReleasesReleaseIdGetResponses200ContentApplicationJsonSchema
        },
        400: {
            bodyMapper: Mappers.Paths1LeydabV01AppsOwnerNameAppNameReleasesReleaseIdGetResponses400ContentApplicationJsonSchema
        },
        404: {
            bodyMapper: Mappers.Paths6Hivb0V01AppsOwnerNameAppNameReleasesReleaseIdGetResponses404ContentApplicationJsonSchema
        }
    },
    queryParameters: [Parameters.udid],
    urlParameters: [
        Parameters.$host,
        Parameters.releaseId,
        Parameters.ownerName,
        Parameters.appName
    ],
    headerParameters: [Parameters.accept],
    serializer
};
const updateDetailsOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/releases/{release_id}",
    httpMethod: "PUT",
    responses: {
        200: {
            bodyMapper: Mappers.PathsMeoh5V01AppsOwnerNameAppNameReleasesReleaseIdPutResponses200ContentApplicationJsonSchema
        },
        400: {
            bodyMapper: Mappers.Paths1Ufxd2QV01AppsOwnerNameAppNameReleasesReleaseIdPutResponses400ContentApplicationJsonSchema
        },
        404: {
            bodyMapper: Mappers.PathsAuajt0V01AppsOwnerNameAppNameReleasesReleaseIdPutResponses404ContentApplicationJsonSchema
        }
    },
    requestBody: {
        parameterPath: {
            enabled: ["options", "enabled"],
            releaseNotes: ["options", "releaseNotes"],
            build: ["options", "build"]
        },
        mapper: Object.assign(Object.assign({}, Mappers.PathsQ3NwdwV01AppsOwnerNameAppNameReleasesReleaseIdPutRequestbodyContentApplicationJsonSchema), { required: true })
    },
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.releaseId2
    ],
    headerParameters: [Parameters.contentType, Parameters.accept],
    mediaType: "json",
    serializer
};
const updateOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/releases/{release_id}",
    httpMethod: "PATCH",
    responses: {
        200: {
            bodyMapper: Mappers.Paths1FopftvV01AppsOwnerNameAppNameReleasesReleaseIdPatchResponses200ContentApplicationJsonSchema
        },
        400: {
            bodyMapper: Mappers.Paths5XfktV01AppsOwnerNameAppNameReleasesReleaseIdPatchResponses400ContentApplicationJsonSchema
        },
        404: {
            bodyMapper: Mappers.PathsW9K4UlV01AppsOwnerNameAppNameReleasesReleaseIdPatchResponses404ContentApplicationJsonSchema
        }
    },
    requestBody: Parameters.body5,
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.releaseId2
    ],
    headerParameters: [Parameters.contentType, Parameters.accept],
    mediaType: "json",
    serializer
};
const deleteOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/releases/{release_id}",
    httpMethod: "DELETE",
    responses: {
        200: {},
        404: {
            bodyMapper: Mappers.PathsQra1HiV01AppsOwnerNameAppNameReleasesReleaseIdDeleteResponses404ContentApplicationJsonSchema
        },
        500: {
            bodyMapper: Mappers.Paths1Lqk8FbV01AppsOwnerNameAppNameReleasesReleaseIdDeleteResponses500ContentApplicationJsonSchema
        }
    },
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.releaseId2
    ],
    headerParameters: [Parameters.accept],
    serializer
};
const availableToTesterOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/releases/filter_by_tester",
    httpMethod: "GET",
    responses: {
        200: {
            bodyMapper: {
                type: {
                    name: "Sequence",
                    element: {
                        type: {
                            name: "Composite",
                            className: "Paths146V2RtV01AppsOwnerNameAppNameReleasesFilterByTesterGetResponses200ContentApplicationJsonSchemaItems"
                        }
                    }
                }
            }
        }
    },
    queryParameters: [Parameters.publishedOnly],
    urlParameters: [Parameters.$host, Parameters.ownerName, Parameters.appName],
    headerParameters: [Parameters.accept],
    serializer
};
const listOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/releases",
    httpMethod: "GET",
    responses: {
        200: {
            bodyMapper: {
                type: {
                    name: "Sequence",
                    element: {
                        type: {
                            name: "Composite",
                            className: "Paths13M4B1YV01AppsOwnerNameAppNameReleasesGetResponses200ContentApplicationJsonSchemaItems"
                        }
                    }
                }
            }
        }
    },
    queryParameters: [Parameters.publishedOnly, Parameters.scope],
    urlParameters: [Parameters.$host, Parameters.ownerName, Parameters.appName],
    headerParameters: [Parameters.accept],
    serializer
};
const listLatestOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/recent_releases",
    httpMethod: "GET",
    responses: {
        200: {
            bodyMapper: {
                type: {
                    name: "Sequence",
                    element: {
                        type: {
                            name: "Composite",
                            className: "PathsYi44H6V01AppsOwnerNameAppNameRecentReleasesGetResponses200ContentApplicationJsonSchemaItems"
                        }
                    }
                }
            }
        }
    },
    urlParameters: [Parameters.$host, Parameters.ownerName, Parameters.appName],
    headerParameters: [Parameters.accept],
    serializer
};
const getLatestByDistributionGroupOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/distribution_groups/{distribution_group_name}/releases/{release_id}",
    httpMethod: "GET",
    responses: {
        200: {
            bodyMapper: Mappers.Paths7CegcuV01AppsOwnerNameAppNameDistributionGroupsDistributionGroupNameReleasesReleaseIdGetResponses200ContentApplicationJsonSchema
        },
        404: {
            bodyMapper: Mappers.Paths1Hpnd2WV01AppsOwnerNameAppNameDistributionGroupsDistributionGroupNameReleasesReleaseIdGetResponses404ContentApplicationJsonSchema
        },
        501: {
            bodyMapper: Mappers.PathsOst83YV01AppsOwnerNameAppNameDistributionGroupsDistributionGroupNameReleasesReleaseIdGetResponses501ContentApplicationJsonSchema
        }
    },
    urlParameters: [
        Parameters.$host,
        Parameters.releaseId,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.distributionGroupName
    ],
    headerParameters: [Parameters.accept],
    serializer
};
const deleteWithDistributionGroupIdOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/distribution_groups/{distribution_group_name}/releases/{release_id}",
    httpMethod: "DELETE",
    responses: { 200: {}, 404: {} },
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.distributionGroupName,
        Parameters.releaseId2
    ],
    serializer
};
const listByDistributionGroupOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/distribution_groups/{distribution_group_name}/releases",
    httpMethod: "GET",
    responses: {
        200: {
            bodyMapper: {
                type: {
                    name: "Sequence",
                    element: {
                        type: {
                            name: "Composite",
                            className: "PathsHninlmV01AppsOwnerNameAppNameDistributionGroupsDistributionGroupNameReleasesGetResponses200ContentApplicationJsonSchemaItems"
                        }
                    }
                }
            }
        },
        404: {
            bodyMapper: Mappers.Paths1JakpdqV01AppsOwnerNameAppNameDistributionGroupsDistributionGroupNameReleasesGetResponses404ContentApplicationJsonSchema
        }
    },
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.distributionGroupName
    ],
    headerParameters: [Parameters.accept],
    serializer
};
