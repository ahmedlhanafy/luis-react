/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RenameEntity
// ====================================================

export interface RenameEntity_renameEntity {
  __typename: "CompositeEntity" | "HierarchicalEntity" | "ListEntity" | "SimpleEntity";
  id: string;
  name: string;
}

export interface RenameEntity {
  renameEntity: RenameEntity_renameEntity | null;
}

export interface RenameEntityVariables {
  applicationId: string;
  versionId: string;
  id: string;
  name: string;
}
