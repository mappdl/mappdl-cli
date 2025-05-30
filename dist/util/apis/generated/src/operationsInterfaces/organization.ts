/*
 * Copyright (c) MappDL Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by MappDL (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OrganizationUpdateAvatarOptionalParams,
  OrganizationUpdateAvatarResponse,
  OrganizationDeleteAvatarOptionalParams,
  OrganizationDeleteAvatarResponse
} from "../models";

/** Interface representing a Organization. */
export interface Organization {
  /**
   * Sets the organization avatar
   * @param orgName The organization's name
   * @param options The options parameters.
   */
  updateAvatar(
    orgName: string,
    options?: OrganizationUpdateAvatarOptionalParams
  ): Promise<OrganizationUpdateAvatarResponse>;
  /**
   * Deletes the uploaded organization avatar
   * @param orgName The organization's name
   * @param options The options parameters.
   */
  deleteAvatar(
    orgName: string,
    options?: OrganizationDeleteAvatarOptionalParams
  ): Promise<OrganizationDeleteAvatarResponse>;
}
