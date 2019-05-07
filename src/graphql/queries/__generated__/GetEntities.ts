/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEntities
// ====================================================

export interface GetEntities_application_entities {
  __typename: "CompositeEntity" | "HierarchicalEntity" | "ListEntity" | "SimpleEntity";
  id: string;
  key: string;
  name: string;
}

export interface GetEntities_application {
  __typename: "Application";
  id: string;
  name: string;
  activeVersion: string;
  entities: GetEntities_application_entities[];
}

export interface GetEntities {
  application: GetEntities_application;
}

export interface GetEntitiesVariables {
  applicationId: string;
}
