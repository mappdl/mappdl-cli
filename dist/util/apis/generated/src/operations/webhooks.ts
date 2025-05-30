/*
 * Copyright (c) MappDL Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by MappDL (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { Webhooks } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { MappDLClient } from "../mappDLClient";
import { WebhooksListOptionalParams, WebhooksListResponse } from "../models";

/** Class containing Webhooks operations. */
export class WebhooksImpl implements Webhooks {
  private readonly client: MappDLClient;

  /**
   * Initialize a new instance of the class Webhooks class.
   * @param client Reference to the service client
   */
  constructor(client: MappDLClient) {
    this.client = client;
  }

  /**
   * Get web hooks configured for a particular app
   * @param ownerName The name of the owner
   * @param appName The name of the application
   * @param options The options parameters.
   */
  list(
    ownerName: string,
    appName: string,
    options?: WebhooksListOptionalParams
  ): Promise<WebhooksListResponse> {
    return this.client.sendOperationRequest(
      { ownerName, appName, options },
      listOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/v0.1/apps/{owner_name}/{app_name}/webhooks",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper:
        Mappers.PathsQn2DimV01AppsOwnerNameAppNameWebhooksGetResponses200ContentApplicationJsonSchema
    },
    default: {
      bodyMapper:
        Mappers.PathsYzqp66V01AppsOwnerNameAppNameWebhooksGetResponsesDefaultContentApplicationJsonSchema
    }
  },
  urlParameters: [Parameters.$host, Parameters.ownerName, Parameters.appName],
  headerParameters: [Parameters.accept],
  serializer
};
