/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetApps
// ====================================================

export interface GetApps_applications {
  __typename: "Application";
  id: string;
  key: string;
  name: string;
  culture: string;
  endpointHitsCount: number;
  version: string;
}

export interface GetApps {
  applications: GetApps_applications[];
}
