/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetIntents
// ====================================================

export interface GetIntents_application_intents {
  __typename: "Intent";
  id: string;
  key: string;
  name: string;
}

export interface GetIntents_application {
  __typename: "Application";
  id: string;
  name: string;
  activeVersion: string;
  intents: GetIntents_application_intents[];
}

export interface GetIntents {
  application: GetIntents_application;
}

export interface GetIntentsVariables {
  applicationId: string;
}
