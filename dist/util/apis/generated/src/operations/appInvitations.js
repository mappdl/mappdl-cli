"use strict";
/*
 * Copyright (c) MappDL Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by MappDL (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInvitationsImpl = void 0;
const coreClient = require("@azure/core-client");
const Mappers = require("../models/mappers");
const Parameters = require("../models/parameters");
/** Class containing AppInvitations operations. */
class AppInvitationsImpl {
    /**
     * Initialize a new instance of the class AppInvitations class.
     * @param client Reference to the service client
     */
    constructor(client) {
        this.client = client;
    }
    /**
     * Rejects a pending invitation for the specified user
     * @param invitationToken The app invitation token that was sent to the user
     * @param options The options parameters.
     */
    reject(invitationToken, options) {
        return this.client.sendOperationRequest({ invitationToken, options }, rejectOperationSpec);
    }
    /**
     * Accepts a pending invitation for the specified user
     * @param invitationToken The app invitation token that was sent to the user
     * @param options The options parameters.
     */
    accept(invitationToken, options) {
        return this.client.sendOperationRequest({ invitationToken, options }, acceptOperationSpec);
    }
    /**
     * Invites a new or existing user to an app
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param userEmail The email of the user to invite
     * @param options The options parameters.
     */
    createByEmail(ownerName, appName, userEmail, options) {
        return this.client.sendOperationRequest({ ownerName, appName, userEmail, options }, createByEmailOperationSpec);
    }
    /**
     * Update pending invitation permission
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param userEmail The email of the user to invite
     * @param permissions The permissions the user has for the app in the invitation
     * @param options The options parameters.
     */
    updatePermissions(ownerName, appName, userEmail, permissions, options) {
        return this.client.sendOperationRequest({ ownerName, appName, userEmail, permissions, options }, updatePermissionsOperationSpec);
    }
    /**
     * Removes a user's invitation to an app
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param userEmail The email of the user to invite
     * @param options The options parameters.
     */
    delete(ownerName, appName, userEmail, options) {
        return this.client.sendOperationRequest({ ownerName, appName, userEmail, options }, deleteOperationSpec);
    }
    /**
     * Invites a new or existing user to an app
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param userEmail The user's email address
     * @param options The options parameters.
     */
    create(ownerName, appName, userEmail, options) {
        return this.client.sendOperationRequest({ ownerName, appName, userEmail, options }, createOperationSpec);
    }
    /**
     * Gets the pending invitations for the app
     * @param ownerName The name of the owner
     * @param appName The name of the application
     * @param options The options parameters.
     */
    list(ownerName, appName, options) {
        return this.client.sendOperationRequest({ ownerName, appName, options }, listOperationSpec);
    }
}
exports.AppInvitationsImpl = AppInvitationsImpl;
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);
const rejectOperationSpec = {
    path: "/v0.1/user/invitations/apps/{invitation_token}/reject",
    httpMethod: "POST",
    responses: {
        204: {},
        default: {
            bodyMapper: Mappers.Paths1De5Y4YV01UserInvitationsAppsInvitationTokenRejectPostResponsesDefaultContentApplicationJsonSchema
        }
    },
    urlParameters: [Parameters.$host, Parameters.invitationToken],
    headerParameters: [Parameters.accept],
    serializer
};
const acceptOperationSpec = {
    path: "/v0.1/user/invitations/apps/{invitation_token}/accept",
    httpMethod: "POST",
    responses: {
        204: {},
        default: {
            bodyMapper: Mappers.Paths14WkhazV01UserInvitationsAppsInvitationTokenAcceptPostResponsesDefaultContentApplicationJsonSchema
        }
    },
    urlParameters: [Parameters.$host, Parameters.invitationToken],
    headerParameters: [Parameters.accept],
    serializer
};
const createByEmailOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/invitations/{user_email}",
    httpMethod: "POST",
    responses: {
        204: {},
        default: {
            bodyMapper: Mappers.Paths1HhwggV01AppsOwnerNameAppNameInvitationsUserEmailPostResponsesDefaultContentApplicationJsonSchema
        }
    },
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.userEmail4
    ],
    headerParameters: [Parameters.accept],
    serializer
};
const updatePermissionsOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/invitations/{user_email}",
    httpMethod: "PATCH",
    responses: {
        204: {},
        default: {
            bodyMapper: Mappers.Paths8Hsxc2V01AppsOwnerNameAppNameInvitationsUserEmailPatchResponsesDefaultContentApplicationJsonSchema
        }
    },
    requestBody: {
        parameterPath: { permissions: ["permissions"] },
        mapper: Object.assign(Object.assign({}, Mappers.Paths1Uclv96V01AppsOwnerNameAppNameInvitationsUserEmailPatchRequestbodyContentApplicationJsonSchema), { required: true })
    },
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.userEmail4
    ],
    headerParameters: [Parameters.contentType, Parameters.accept],
    mediaType: "json",
    serializer
};
const deleteOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/invitations/{user_email}",
    httpMethod: "DELETE",
    responses: {
        204: {},
        default: {
            bodyMapper: Mappers.PathsTcxwc4V01AppsOwnerNameAppNameInvitationsUserEmailDeleteResponsesDefaultContentApplicationJsonSchema
        }
    },
    urlParameters: [
        Parameters.$host,
        Parameters.ownerName,
        Parameters.appName,
        Parameters.userEmail4
    ],
    headerParameters: [Parameters.accept],
    serializer
};
const createOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/invitations",
    httpMethod: "POST",
    responses: {
        204: {},
        default: {
            bodyMapper: Mappers.Paths86Npv6V01AppsOwnerNameAppNameInvitationsPostResponsesDefaultContentApplicationJsonSchema
        }
    },
    requestBody: {
        parameterPath: { userEmail: ["userEmail"], role: ["options", "role"] },
        mapper: Object.assign(Object.assign({}, Mappers.Paths1CzjavmV01AppsOwnerNameAppNameInvitationsPostRequestbodyContentApplicationJsonSchema), { required: true })
    },
    urlParameters: [Parameters.$host, Parameters.ownerName, Parameters.appName],
    headerParameters: [Parameters.contentType, Parameters.accept],
    mediaType: "json",
    serializer
};
const listOperationSpec = {
    path: "/v0.1/apps/{owner_name}/{app_name}/invitations",
    httpMethod: "GET",
    responses: {
        200: {
            bodyMapper: Mappers.PathsIn5115V01AppsOwnerNameAppNameInvitationsGetResponses200ContentApplicationJsonSchema
        },
        default: {
            bodyMapper: Mappers.Paths8D56KcV01AppsOwnerNameAppNameInvitationsGetResponsesDefaultContentApplicationJsonSchema
        }
    },
    urlParameters: [Parameters.$host, Parameters.ownerName, Parameters.appName],
    headerParameters: [Parameters.accept],
    serializer
};
