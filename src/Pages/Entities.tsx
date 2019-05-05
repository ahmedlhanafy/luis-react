import React from 'react';
import gql from 'graphql-tag';
import { get } from 'lodash';
import useReactRouter from 'use-react-router';
import { CommandBar, SearchBox } from 'office-ui-fabric-react';
import { Table } from '../Components';
import { RowName } from '../Components/Table';
import { useQuery } from 'react-apollo-hooks';

const QUERY = gql`
  query($applicationId: String!) {
    application(id: $applicationId) {
      entities {
        id
        key: id
        name
      }
    }
  }
`;

const Entities = ({ applicationId }: { applicationId: string }) => {
  const { data, loading } = useQuery(QUERY, { variables: { applicationId } });

  return (
    <section>
      <h1 className="ms-font-xxl ms-fontSize-xxl ms-fontWeight-regular">Entities</h1>
      <TopBar />
      <Table
        isLoading={loading}
        items={get(data, 'application.entities', [])}
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
            onRender: (item: any) => {
              return <RowName to="#">{item.name}</RowName>;
            },
          },
          {
            key: 'column2',
            name: 'Type',
            fieldName: 'type',
            minWidth: 100,
            maxWidth: 200,
            isResizable: false,
            ariaLabel: 'Operations for culture',
          },
          {
            key: 'column3',
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
    }}
    items={[
      {
        key: 'newItem',
        name: 'Create new entity',
        cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
        iconProps: {
          iconName: 'Add',
        },
        ariaLabel: 'New. Use left and right arrow keys to navigate',
      },
      {
        key: 'upload',
        name: 'Add prebuilt entity',
        iconProps: {
          iconName: 'Add',
        },
        // href: 'https://dev.office.com/fabric',
        ['data-automation-id']: 'uploadButton',
      },
      {
        key: 'prebuilt_domain_entity',
        name: 'Add prebuilt domain entity',
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
        onRender: () => <SearchBox size={36} placeholder="Search entities" />,
      },
    ]}
    ariaLabel={'Use left and right arrow keys to navigate between commands'}
  />
);

export default Entities;
