/*
 * Copyright (c) MappDL Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by MappDL (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  RepositoryConfigurationsListOptionalParams,
  RepositoryConfigurationsListResponse,
  Paths1P54ZxdV01AppsOwnerNameAppNameRepoConfigPostRequestbodyContentApplicationJsonSchema,
  RepositoryConfigurationsCreateOrUpdateOptionalParams,
  RepositoryConfigurationsCreateOrUpdateResponse,
  RepositoryConfigurationsDeleteOptionalParams,
  RepositoryConfigurationsDeleteResponse
} from "../models";

/** Interface representing a RepositoryConfigurations. */
export interface RepositoryConfigurations {
  /**
   * Returns the repository build configuration status of the app
   * @param ownerName The name of the owner
   * @param appName The name of the application
   * @param options The options parameters.
   */
  list(
    ownerName: string,
    appName: string,
    options?: RepositoryConfigurationsListOptionalParams
  ): Promise<RepositoryConfigurationsListResponse>;
  /**
   * Configures the repository for build
   * @param ownerName The name of the owner
   * @param appName The name of the application
   * @param repo The repository information
   * @param options The options parameters.
   */
  createOrUpdate(
    ownerName: string,
    appName: string,
    repo: Paths1P54ZxdV01AppsOwnerNameAppNameRepoConfigPostRequestbodyContentApplicationJsonSchema,
    options?: RepositoryConfigurationsCreateOrUpdateOptionalParams
  ): Promise<RepositoryConfigurationsCreateOrUpdateResponse>;
  /**
   * Removes the configuration for the repository
   * @param ownerName The name of the owner
   * @param appName The name of the application
   * @param options The options parameters.
   */
  delete(
    ownerName: string,
    appName: string,
    options?: RepositoryConfigurationsDeleteOptionalParams
  ): Promise<RepositoryConfigurationsDeleteResponse>;
}
