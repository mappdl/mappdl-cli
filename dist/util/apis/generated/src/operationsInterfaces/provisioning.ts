/*
 * Copyright (c) MappDL Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by MappDL (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  ProvisioningProfileOptionalParams,
  ProvisioningProfileOperationResponse
} from "../models";

/** Interface representing a Provisioning. */
export interface Provisioning {
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
  ): Promise<ProvisioningProfileOperationResponse>;
}
