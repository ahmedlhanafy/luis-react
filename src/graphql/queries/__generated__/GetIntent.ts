/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetIntent
// ====================================================

export interface GetIntent_application_intent_utterances_entityLabels_entity {
  __typename: "CompositeEntity" | "HierarchicalEntity" | "ListEntity" | "SimpleEntity";
  id: string;
  name: string;
}

export interface GetIntent_application_intent_utterances_entityLabels {
  __typename: "Label";
  startTokenIndex: number;
  endTokenIndex: number;
  entity: GetIntent_application_intent_utterances_entityLabels_entity | null;
}

export interface GetIntent_application_intent_utterances {
  __typename: "Utterance";
  text: string;
  tokenizedText: string[];
  entityLabels: GetIntent_application_intent_utterances_entityLabels[] | null;
}

export interface GetIntent_application_intent {
  __typename: "Intent";
  id: string;
  key: string;
  name: string;
  utterances: GetIntent_application_intent_utterances[];
}

export interface GetIntent_application {
  __typename: "Application";
  id: string;
  name: string;
  activeVersion: string;
  intent: GetIntent_application_intent | null;
}

export interface GetIntent {
  application: GetIntent_application;
}

export interface GetIntentVariables {
  applicationId: string;
  intentId: string;
}
