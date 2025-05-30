/*
 * Copyright (c) MappDL Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by MappDL (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  UserApiTokensDeleteOptionalParams,
  UserApiTokensDeleteResponse,
  UserApiTokensListOptionalParams,
  UserApiTokensListResponse,
  UserApiTokensCreateOptionalParams,
  UserApiTokensCreateResponse
} from "../models";

/** Interface representing a UserApiTokens. */
export interface UserApiTokens {
  /**
   * Delete the user api_token object with the specific id
   * @param apiTokenId The unique ID (UUID) of the api token
   * @param options The options parameters.
   */
  delete(
    apiTokenId: string,
    options?: UserApiTokensDeleteOptionalParams
  ): Promise<UserApiTokensDeleteResponse>;
  /**
   * Returns api tokens for the authenticated user
   * @param options The options parameters.
   */
  list(
    options?: UserApiTokensListOptionalParams
  ): Promise<UserApiTokensListResponse>;
  /**
   * Creates a new User API token
   * @param options The options parameters.
   */
  create(
    options?: UserApiTokensCreateOptionalParams
  ): Promise<UserApiTokensCreateResponse>;
}
