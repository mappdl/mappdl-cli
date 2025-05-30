/*
 * Copyright (c) MappDL Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by MappDL (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { AppApiTokens } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { MappDLClient } from "../mappDLClient";
import {
  AppApiTokensDeleteOptionalParams,
  AppApiTokensDeleteResponse,
  AppApiTokensListOptionalParams,
  AppApiTokensListResponse,
  AppApiTokensCreateOptionalParams,
  AppApiTokensCreateResponse
} from "../models";

/** Class containing AppApiTokens operations. */
export class AppApiTokensImpl implements AppApiTokens {
  private readonly client: MappDLClient;

  /**
   * Initialize a new instance of the class AppApiTokens class.
   * @param client Reference to the service client
   */
  constructor(client: MappDLClient) {
    this.client = client;
  }

  /**
   * Delete the App Api Token object with the specific ID
   * @param ownerName The name of the owner
   * @param appName The name of the application
   * @param apiTokenId The unique ID (UUID) of the api token
   * @param options The options parameters.
   */
  delete(
    ownerName: string,
    appName: string,
    apiTokenId: string,
    options?: AppApiTokensDeleteOptionalParams
  ): Promise<AppApiTokensDeleteResponse> {
    return this.client.sendOperationRequest(
      { ownerName, appName, apiTokenId, options },
      deleteOperationSpec
    );
  }

  /**
   * Returns App API tokens for the app
   * @param ownerName The name of the owner
   * @param appName The name of the application
   * @param options The options parameters.
   */
  list(
    ownerName: string,
    appName: string,
    options?: AppApiTokensListOptionalParams
  ): Promise<AppApiTokensListResponse> {
    return this.client.sendOperationRequest(
      { ownerName, appName, options },
      listOperationSpec
    );
  }

  /**
   * Creates a new App API token
   * @param ownerName The name of the owner
   * @param appName The name of the application
   * @param options The options parameters.
   */
  create(
    ownerName: string,
    appName: string,
    options?: AppApiTokensCreateOptionalParams
  ): Promise<AppApiTokensCreateResponse> {
    return this.client.sendOperationRequest(
      { ownerName, appName, options },
      createOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/v0.1/apps/{owner_name}/{app_name}/api_tokens/{api_token_id}",
  httpMethod: "DELETE",
  responses: {
    204: {},
    400: {
      bodyMapper:
        Mappers.Paths1NebezpV01AppsOwnerNameAppNameApiTokensApiTokenIdDeleteResponses400ContentApplicationJsonSchema
    },
    401: {
      bodyMapper:
        Mappers.Paths1X34P14V01AppsOwnerNameAppNameApiTokensApiTokenIdDeleteResponses401ContentApplicationJsonSchema
    },
    404: {
      bodyMapper:
        Mappers.PathsA1Vv93V01AppsOwnerNameAppNameApiTokensApiTokenIdDeleteResponses404ContentApplicationJsonSchema
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.ownerName,
    Parameters.appName,
    Parameters.apiTokenId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listOperationSpec: coreClient.OperationSpec = {
  path: "/v0.1/apps/{owner_name}/{app_name}/api_tokens",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: {
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className:
                "PathsVpkwjrV01AppsOwnerNameAppNameApiTokensGetResponses200ContentApplicationJsonSchemaItems"
            }
          }
        }
      }
    },
    400: {
      bodyMapper:
        Mappers.Paths1P1Ao38V01AppsOwnerNameAppNameApiTokensGetResponses400ContentApplicationJsonSchema
    },
    401: {
      bodyMapper:
        Mappers.PathsJ0An0FV01AppsOwnerNameAppNameApiTokensGetResponses401ContentApplicationJsonSchema
    }
  },
  urlParameters: [Parameters.$host, Parameters.ownerName, Parameters.appName],
  headerParameters: [Parameters.accept],
  serializer
};
const createOperationSpec: coreClient.OperationSpec = {
  path: "/v0.1/apps/{owner_name}/{app_name}/api_tokens",
  httpMethod: "POST",
  responses: {
    201: {
      bodyMapper:
        Mappers.Paths1FrjyzkV01AppsOwnerNameAppNameApiTokensPostResponses201ContentApplicationJsonSchema
    },
    400: {
      bodyMapper:
        Mappers.Paths8Qg468V01AppsOwnerNameAppNameApiTokensPostResponses400ContentApplicationJsonSchema
    },
    401: {
      bodyMapper:
        Mappers.Paths1ElzjgvV01AppsOwnerNameAppNameApiTokensPostResponses401ContentApplicationJsonSchema
    }
  },
  requestBody: {
    parameterPath: {
      description: ["options", "description"],
      scope: ["options", "scope"]
    },
    mapper:
      Mappers.PathsUuian4V01AppsOwnerNameAppNameApiTokensPostRequestbodyContentApplicationJsonSchema
  },
  urlParameters: [Parameters.$host, Parameters.ownerName, Parameters.appName],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
