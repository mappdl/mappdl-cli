/*
 * Copyright (c) MappDL Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by MappDL (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { DataSubjectRight } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { MappDLClient } from "../mappDLClient";
import {
  DataSubjectRightCancelExportRequestOptionalParams,
  DataSubjectRightCancelExportRequestResponse,
  DataSubjectRightExportStatusRequestOptionalParams,
  DataSubjectRightExportStatusRequestResponse,
  DataSubjectRightExportRequestOptionalParams,
  DataSubjectRightExportRequestResponse,
  DataSubjectRightCancelDeleteRequestOptionalParams,
  DataSubjectRightCancelDeleteRequestResponse,
  DataSubjectRightDeleteStatusRequestOptionalParams,
  DataSubjectRightDeleteStatusRequestResponse,
  DataSubjectRightDeleteRequestOptionalParams,
  DataSubjectRightDeleteRequestResponse
} from "../models";

/** Class containing DataSubjectRight operations. */
export class DataSubjectRightImpl implements DataSubjectRight {
  private readonly client: MappDLClient;

  /**
   * Initialize a new instance of the class DataSubjectRight class.
   * @param client Reference to the service client
   */
  constructor(client: MappDLClient) {
    this.client = client;
  }

  /**
   * test
   * @param token Unique request ID (GUID)
   * @param options The options parameters.
   */
  cancelExportRequest(
    token: string,
    options?: DataSubjectRightCancelExportRequestOptionalParams
  ): Promise<DataSubjectRightCancelExportRequestResponse> {
    return this.client.sendOperationRequest(
      { token, options },
      cancelExportRequestOperationSpec
    );
  }

  /**
   * test
   * @param token Unique request ID (GUID)
   * @param options The options parameters.
   */
  exportStatusRequest(
    token: string,
    options?: DataSubjectRightExportStatusRequestOptionalParams
  ): Promise<DataSubjectRightExportStatusRequestResponse> {
    return this.client.sendOperationRequest(
      { token, options },
      exportStatusRequestOperationSpec
    );
  }

  /**
   * test
   * @param options The options parameters.
   */
  exportRequest(
    options?: DataSubjectRightExportRequestOptionalParams
  ): Promise<DataSubjectRightExportRequestResponse> {
    return this.client.sendOperationRequest(
      { options },
      exportRequestOperationSpec
    );
  }

  /**
   * test
   * @param token Unique request ID (GUID)
   * @param email Email used for cancel delete with x-authz-bypass headers
   * @param options The options parameters.
   */
  cancelDeleteRequest(
    token: string,
    email: string,
    options?: DataSubjectRightCancelDeleteRequestOptionalParams
  ): Promise<DataSubjectRightCancelDeleteRequestResponse> {
    return this.client.sendOperationRequest(
      { token, email, options },
      cancelDeleteRequestOperationSpec
    );
  }

  /**
   * test
   * @param token Unique request ID (GUID)
   * @param email Email used for delete with x-authz-bypass headers
   * @param options The options parameters.
   */
  deleteStatusRequest(
    token: string,
    email: string,
    options?: DataSubjectRightDeleteStatusRequestOptionalParams
  ): Promise<DataSubjectRightDeleteStatusRequestResponse> {
    return this.client.sendOperationRequest(
      { token, email, options },
      deleteStatusRequestOperationSpec
    );
  }

  /**
   * test
   * @param options The options parameters.
   */
  deleteRequest(
    options?: DataSubjectRightDeleteRequestOptionalParams
  ): Promise<DataSubjectRightDeleteRequestResponse> {
    return this.client.sendOperationRequest(
      { options },
      deleteRequestOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const cancelExportRequestOperationSpec: coreClient.OperationSpec = {
  path: "/v0.1/user/dsr/export/{token}/cancel",
  httpMethod: "POST",
  responses: {
    202: {
      bodyMapper:
        Mappers.Paths18Qfkd0V01UserDsrExportTokenCancelPostResponses202ContentApplicationJsonSchema,
      headersMapper: Mappers.DataSubjectRightCancelExportRequestHeaders
    },
    503: {
      bodyMapper:
        Mappers.Paths1Tf7AbnV01UserDsrExportTokenCancelPostResponses503ContentApplicationJsonSchema
    },
    default: {
      bodyMapper:
        Mappers.PathsYldp5RV01UserDsrExportTokenCancelPostResponsesDefaultContentApplicationJsonSchema
    }
  },
  urlParameters: [Parameters.$host, Parameters.token],
  headerParameters: [Parameters.accept],
  serializer
};
const exportStatusRequestOperationSpec: coreClient.OperationSpec = {
  path: "/v0.1/user/dsr/export/{token}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper:
        Mappers.Paths1Krqtk7V01UserDsrExportTokenGetResponses200ContentApplicationJsonSchema
    },
    default: {
      bodyMapper:
        Mappers.PathsKhkcspV01UserDsrExportTokenGetResponsesDefaultContentApplicationJsonSchema
    }
  },
  urlParameters: [Parameters.$host, Parameters.token],
  headerParameters: [Parameters.accept],
  serializer
};
const exportRequestOperationSpec: coreClient.OperationSpec = {
  path: "/v0.1/user/dsr/export",
  httpMethod: "POST",
  responses: {
    202: {
      bodyMapper:
        Mappers.Paths1NpsrnaV01UserDsrExportPostResponses202ContentApplicationJsonSchema,
      headersMapper: Mappers.DataSubjectRightExportRequestHeaders
    },
    default: {
      bodyMapper:
        Mappers.Paths14JqlllV01UserDsrExportPostResponsesDefaultContentApplicationJsonSchema
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
const cancelDeleteRequestOperationSpec: coreClient.OperationSpec = {
  path: "/v0.1/user/dsr/delete/{token}/cancel",
  httpMethod: "POST",
  responses: {
    202: {
      bodyMapper:
        Mappers.PathsJv03TbV01UserDsrDeleteTokenCancelPostResponses202ContentApplicationJsonSchema,
      headersMapper: Mappers.DataSubjectRightCancelDeleteRequestHeaders
    },
    503: {
      bodyMapper:
        Mappers.Paths1Ysi41QV01UserDsrDeleteTokenCancelPostResponses503ContentApplicationJsonSchema
    },
    default: {
      bodyMapper:
        Mappers.PathsE7Evb8V01UserDsrDeleteTokenCancelPostResponsesDefaultContentApplicationJsonSchema
    }
  },
  requestBody: {
    parameterPath: { email: ["email"] },
    mapper: {
      ...Mappers.PathsQga5LlV01UserDsrDeleteTokenCancelPostRequestbodyContentApplicationJsonSchema,
      required: true
    }
  },
  urlParameters: [Parameters.$host, Parameters.token],
  headerParameters: [Parameters.contentType, Parameters.accept],
  mediaType: "json",
  serializer
};
const deleteStatusRequestOperationSpec: coreClient.OperationSpec = {
  path: "/v0.1/user/dsr/delete/{token}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper:
        Mappers.PathsWwssknV01UserDsrDeleteTokenGetResponses200ContentApplicationJsonSchema
    },
    default: {
      bodyMapper:
        Mappers.PathsSepmdaV01UserDsrDeleteTokenGetResponsesDefaultContentApplicationJsonSchema
    }
  },
  queryParameters: [Parameters.email3],
  urlParameters: [Parameters.$host, Parameters.token],
  headerParameters: [Parameters.accept],
  serializer
};
const deleteRequestOperationSpec: coreClient.OperationSpec = {
  path: "/v0.1/user/dsr/delete",
  httpMethod: "POST",
  responses: {
    202: {
      bodyMapper:
        Mappers.Paths1Shlm9KV01UserDsrDeletePostResponses202ContentApplicationJsonSchema,
      headersMapper: Mappers.DataSubjectRightDeleteRequestHeaders
    },
    default: {
      bodyMapper:
        Mappers.Paths105AankV01UserDsrDeletePostResponsesDefaultContentApplicationJsonSchema
    }
  },
  urlParameters: [Parameters.$host],
  headerParameters: [Parameters.accept],
  serializer
};
