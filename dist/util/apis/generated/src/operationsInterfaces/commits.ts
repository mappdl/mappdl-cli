/*
 * Copyright (c) MappDL Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by MappDL (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  CommitsListByShaListOptionalParams,
  CommitsListByShaListResponse
} from "../models";

/** Interface representing a Commits. */
export interface Commits {
  /**
   * Returns commit information for a batch of shas
   * @param hashes A collection of commit SHAs comma-delimited
   * @param ownerName The name of the owner
   * @param appName The name of the application
   * @param options The options parameters.
   */
  listByShaList(
    hashes: string[],
    ownerName: string,
    appName: string,
    options?: CommitsListByShaListOptionalParams
  ): Promise<CommitsListByShaListResponse>;
}
