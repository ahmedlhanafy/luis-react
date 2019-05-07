/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateNewApp
// ====================================================

export interface CreateNewApp_createApplication_intents {
  __typename: "Intent";
  id: string;
  key: string;
  name: string;
}

export interface CreateNewApp_createApplication {
  __typename: "Application";
  id: string;
  name: string;
  culture: string;
  activeVersion: string;
  endpointHitsCount: number;
  intents: CreateNewApp_createApplication_intents[];
}

export interface CreateNewApp {
  createApplication: CreateNewApp_createApplication;
}

export interface CreateNewAppVariables {
  name: string;
  description?: string | null;
}
