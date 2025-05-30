/*
 * Copyright (c) MappDL Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by MappDL (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { DistributionGroupInvitations } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { MappDLClient } from "../mappDLClient";
import { DistributionGroupInvitationsAcceptAllOptionalParams } from "../models";

/** Class containing DistributionGroupInvitations operations. */
export class DistributionGroupInvitationsImpl
  implements DistributionGroupInvitations {
  private readonly client: MappDLClient;

  /**
   * Initialize a new instance of the class DistributionGroupInvitations class.
   * @param client Reference to the service client
   */
  constructor(client: MappDLClient) {
    this.client = client;
  }

  /**
   * Accepts all pending invitations to distribution groups for the specified user
   * @param options The options parameters.
   */
  acceptAll(
    options?: DistributionGroupInvitationsAcceptAllOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { options },
      acceptAllOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const acceptAllOperationSpec: coreClient.OperationSpec = {
  path: "/v0.1/user/invitations/distribution_groups/accept",
  httpMethod: "POST",
  responses: {
    204: {},
    default: {
      bodyMapper:
        Mappers.Paths8ZdnzsV01UserInvitationsDistributionGroupsAcceptPostResponsesDefaultContentApplicationJsonSchema
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
