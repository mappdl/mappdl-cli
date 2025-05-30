/*
 * Copyright (c) MappDL Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by MappDL (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { Provisioning } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { MappDLClient } from "../mappDLClient";
import {
  ProvisioningProfileOptionalParams,
  ProvisioningProfileOperationResponse
} from "../models";

/** Class containing Provisioning operations. */
export class ProvisioningImpl implements Provisioning {
  private readonly client: MappDLClient;

  /**
   * Initialize a new instance of the class Provisioning class.
   * @param client Reference to the service client
   */
  constructor(client: MappDLClient) {
    this.client = client;
  }

  /**
   * Return information about the provisioning profile. Only available for iOS.
   * @param releaseId The release_id
   * @param ownerName The name of the owner
   * @param appName The name of the application
   * @param options The options parameters.
   */
  profile(
    releaseId: number,
    ownerName: string,
    appName: string,
    options?: ProvisioningProfileOptionalParams
  ): Promise<ProvisioningProfileOperationResponse> {
    return this.client.sendOperationRequest(
      { releaseId, ownerName, appName, options },
      profileOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const profileOperationSpec: coreClient.OperationSpec = {
  path:
    "/v0.1/apps/{owner_name}/{app_name}/releases/{release_id}/provisioning_profile",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ProvisioningProfileResponse
    },
    400: {
      bodyMapper:
        Mappers.PathsI43JzkV01AppsOwnerNameAppNameReleasesReleaseIdProvisioningProfileGetResponses400ContentApplicationJsonSchema
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
