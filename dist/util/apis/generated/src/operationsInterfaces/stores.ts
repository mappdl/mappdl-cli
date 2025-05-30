/*
 * Copyright (c) MappDL Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by MappDL (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  StoresGetOptionalParams,
  StoresGetResponse,
  StoresPatchOptionalParams,
  StoresDeleteOptionalParams,
  PathsPwsnpuV01AppsOwnerNameAppNameDistributionStoresPostRequestbodyContentApplicationJsonSchema,
  StoresCreateOptionalParams,
  StoresCreateResponse,
  StoresListOptionalParams,
  StoresListResponse
} from "../models";

/** Interface representing a Stores. */
export interface Stores {
  /**
   * Return the store details for specified store name.
   * @param storeName The name of the store
   * @param ownerName The name of the owner
   * @param appName The name of the application
   * @param options The options parameters.
   */
  get(
    storeName: string,
    ownerName: string,
    appName: string,
    options?: StoresGetOptionalParams
  ): Promise<StoresGetResponse>;
  /**
   * Update the store.
   * @param storeName The name of the store
   * @param ownerName The name of the owner
   * @param appName The name of the application
   * @param serviceConnectionId Service connection id to updated.
   * @param options The options parameters.
   */
  patch(
    storeName: string,
    ownerName: string,
    appName: string,
    serviceConnectionId: string,
    options?: StoresPatchOptionalParams
  ): Promise<void>;
  /**
   * delete the store based on specific store name.
   * @param storeName The name of the store
   * @param ownerName The name of the owner
   * @param appName The name of the application
   * @param options The options parameters.
   */
  delete(
    storeName: string,
    ownerName: string,
    appName: string,
    options?: StoresDeleteOptionalParams
  ): Promise<void>;
  /**
   * Create a new external store for the specified application.
   * @param ownerName The name of the owner
   * @param appName The name of the application
   * @param body The store request
   * @param options The options parameters.
   */
  create(
    ownerName: string,
    appName: string,
    body: PathsPwsnpuV01AppsOwnerNameAppNameDistributionStoresPostRequestbodyContentApplicationJsonSchema,
    options?: StoresCreateOptionalParams
  ): Promise<StoresCreateResponse>;
  /**
   * Get all the store details from Storage store table for a particular application.
   * @param ownerName The name of the owner
   * @param appName The name of the application
   * @param options The options parameters.
   */
  list(
    ownerName: string,
    appName: string,
    options?: StoresListOptionalParams
  ): Promise<StoresListResponse>;
}
