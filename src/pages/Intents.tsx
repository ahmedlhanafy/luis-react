import React, { useRef } from 'react';
import { get } from 'lodash';
import { CommandBar, SearchBox, Selection } from 'office-ui-fabric-react';
import Table, { RowName } from '../components/Table';
import { useQuery } from 'react-apollo-hooks';
import GetIntentsQuery from '../graphql/queries/GetIntents';
import { GetIntents, GetIntents_application_intents } from '../graphql/queries/__generated__/GetIntents';

const Intents = ({ applicationId }: { applicationId: string }) => {
  const { data, loading } = useQuery<GetIntents>(GetIntentsQuery, { variables: { applicationId } });
  const selection = useRef(
    new Selection({
      onSelectionChanged: console.log,
    }),
  );
  return (
    <section>
      <h1 className="ms-font-xxl ms-fontSize-xxl ms-fontWeight-regular">Intents</h1>
      <TopBar />
      <Table
        selection={selection.current}
        isLoading={loading}
        items={get(data, 'application.intents', [])}
        columns={[
          {
            key: 'column1',
            name: 'Name',
            fieldName: 'name',
            minWidth: 500,
            maxWidth: 500,
            isResizable: false,
            ariaLabel: 'Operations for name',
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onRender: (item: GetIntents_application_intents) => <RowName to="#">{item.name}</RowName>,
          },
          {
            key: 'column2',
            name: 'Labeled Utterances',
            fieldName: 'labeled_utterances',
            minWidth: 100,
            maxWidth: 200,
            isResizable: false,
            ariaLabel: 'Operations for culture',
          },
        ]}
      />
    </section>
  );
};

const TopBar = () => (
  <CommandBar
    styles={{
      secondarySet: {
        alignItems: 'center',
      },
      root: { marginBottom: 12 },
    }}
    items={[
      {
        key: 'newItem',
        name: 'Create new intent',
        cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
        iconProps: {
          iconName: 'Add',
        },
        ariaLabel: 'New. Use left and right arrow keys to navigate',
      },
      {
        key: 'upload',
        name: 'Add prebuilt domain intent',
        iconProps: {
          iconName: 'Add',
        },
        // href: 'https://dev.office.com/fabric',
        ['data-automation-id']: 'uploadButton',
      },
    ]}
    farItems={[
      {
        key: 'searchBox',
        onRender: () => <SearchBox size={36} placeholder="Search intents" />,
      },
    ]}
    ariaLabel={'Use left and right arrow keys to navigate between commands'}
  />
);

export default Intents;
