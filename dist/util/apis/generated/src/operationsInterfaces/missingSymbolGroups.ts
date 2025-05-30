/*
 * Copyright (c) MappDL Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by MappDL (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  MissingSymbolGroupsInfoOptionalParams,
  MissingSymbolGroupsInfoResponse,
  MissingSymbolGroupsGetOptionalParams,
  MissingSymbolGroupsGetResponse,
  MissingSymbolGroupsListOptionalParams,
  MissingSymbolGroupsListResponse
} from "../models";

/** Interface representing a MissingSymbolGroups. */
export interface MissingSymbolGroups {
  /**
   * Gets application level statistics for all missing symbol groups
   * @param ownerName The name of the owner
   * @param appName The name of the application
   * @param options The options parameters.
   */
  info(
    ownerName: string,
    appName: string,
    options?: MissingSymbolGroupsInfoOptionalParams
  ): Promise<MissingSymbolGroupsInfoResponse>;
  /**
   * Gets missing symbol crash group by its id
   * @param symbolGroupId missing symbol crash group id
   * @param ownerName The name of the owner
   * @param appName The name of the application
   * @param options The options parameters.
   */
  get(
    symbolGroupId: string,
    ownerName: string,
    appName: string,
    options?: MissingSymbolGroupsGetOptionalParams
  ): Promise<MissingSymbolGroupsGetResponse>;
  /**
   * Gets top N (ordered by crash count) of crash groups by missing symbol
   * @param top top N elements
   * @param ownerName The name of the owner
   * @param appName The name of the application
   * @param options The options parameters.
   */
  list(
    top: number,
    ownerName: string,
    appName: string,
    options?: MissingSymbolGroupsListOptionalParams
  ): Promise<MissingSymbolGroupsListResponse>;
}
