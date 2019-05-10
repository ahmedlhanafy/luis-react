import React from 'react';
import { get } from 'lodash';
import { useQuery } from 'react-apollo-hooks';
import GetIntentQuery from '../graphql/queries/GetIntent';
import { GetIntent, GetIntentVariables, GetIntent_application_intent_utterances } from '../graphql/queries/__generated__/GetIntent';
import useAppData from '../hooks/useAppData';
import Table from '../components/Table';
import useSelection from '../hooks/useSelection';
import styled from 'styled-components';
import { CommandBar, SearchBox } from 'office-ui-fabric-react';

const UtterancePage = ({ intentId }: { intentId: string }) => {
  const { applicationId } = useAppData();
  const { data, loading } = useQuery<GetIntent, GetIntentVariables>(GetIntentQuery, {
    variables: { intentId, applicationId },
  });
  const { selection } = useSelection();
  return (
    <section>
      <h1 className="ms-font-xxl ms-fontSize-xxl ms-fontWeight-regular">Intent - {data.application ? data.application.intent.name : ''}</h1>
      <CommandBar
        styles={{
          secondarySet: {
            alignItems: 'center',
          },
          root: { marginBottom: 12 },
        }}
        items={[
          {
            key: 'prebuilt_domain_entity',
            name: 'Reassign utterances',
            iconProps: {
              iconName: 'Add',
            },
            disabled: true,
            // href: 'https://dev.office.com/fabric',
            ['data-automation-id']: 'uploadButton',
          },
          {
            key: 'rename_entity',
            name: 'Delete utterances',
            disabled: true,
            iconProps: {
              iconName: 'Delete',
            },
          },
        ]}
        farItems={[
          {
            key: 'searchBox',
            onRender: () => <SearchBox size={36} placeholder="Search utterances" />,
          },
        ]}
        ariaLabel={'Use left and right arrow keys to navigate between commands'}
      />
      <Table
        selection={selection}
        items={get(data, 'application.intent.utterances', [])}
        isLoading={loading}
        columns={[
          {
            key: 'column1',
            name: 'Utterance',
            fieldName: 'utterance',
            minWidth: 500,
            maxWidth: 500,
            isResizable: false,
            ariaLabel: 'Operations for name',
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onRender: UtteranceRow,
          },
        ]}
      />
    </section>
  );
};

const UtteranceRow = (utterance: GetIntent_application_intent_utterances) => {
  return constructSegments(utterance).map(({ name, text }: any, i) =>
    text ? (
      <>
        <Entity key={i}>{name}</Entity>
        <span> </span>
      </>
    ) : (
      <Plain key={i}>{name} </Plain>
    ),
  );
};

const Plain = styled.span`
  font-size: 16px;
`;

const Entity = styled.span`
  font-size: 16px;
  background: #6acfff;
  padding: 4px;
  border-radius: 3px;
`;

type PlainSegment = { name: string };
type EntitySegment = { text: string[]; name: string };

const constructSegments = ({ tokenizedText, entityLabels }: GetIntent_application_intent_utterances) => {
  const arr: (PlainSegment | EntitySegment)[] = [];

  loop1: for (let index = 0; index < tokenizedText.length; index++) {
    const element = tokenizedText[index];
    if (entityLabels !== null)
      for (let j = 0; j < entityLabels.length; j++) {
        const label = entityLabels[j];
        if (index === label.startTokenIndex) {
          arr.push({ name: label.entity.name, text: [element] });
          continue loop1;
        } else if (index > label.startTokenIndex && index <= label.endTokenIndex) {
          arr[arr.length - 1] = {
            ...arr[arr.length - 1],
            text: [...(arr[arr.length - 1] as EntitySegment).text, element],
          } as EntitySegment;
          continue loop1;
        }
      }
    arr.push({ name: element });
  }
  return arr;
};

export default UtterancePage;
