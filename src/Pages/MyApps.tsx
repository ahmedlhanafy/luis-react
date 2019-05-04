import React from 'react';
import styled from 'styled-components';
import { CommandBar, ICommandBarItemProps, SearchBox } from 'office-ui-fabric-react';
import gql from 'graphql-tag';
import { Table } from '../Components';
import { RowName } from '../Components/Table';
import { useQuery } from 'react-apollo-hooks';

const getItems = () => {
  return [
    {
      key: 'newItem',
      name: 'Create new app',
      cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
      iconProps: {
        iconName: 'Add',
      },
      ariaLabel: 'New. Use left and right arrow keys to navigate',
    },
    {
      key: 'upload',
      name: 'Import new app',
      iconProps: {
        iconName: 'Upload',
      },
      // href: 'https://dev.office.com/fabric',
      ['data-automation-id']: 'uploadButton',
    },
  ];
};

const getFarItems = (): ICommandBarItemProps[] => {
  return [
    {
      key: 'searchBox',
      onRender: () => <SearchBox size={36} placeholder="Search" />,
    },
  ];
};

const APPS_QUERY = gql`
  {
    applications(take: 10) {
      id
      key:id
      name
      culture
      endpointHitsCount
      activeVersion
    }
  }
`;


const MyApps = () => {
  const { data, loading} = useQuery(APPS_QUERY);
  return (
    <Container>
      <h1 className="ms-font-xxl ms-fontSize-xxl ms-fontWeight-regular">My Apps</h1>
      <CommandBar
        styles={{
          secondarySet: {
            alignItems: 'center',
          },
          root: {marginBottom: 12}
        }}
        items={getItems()}
        farItems={getFarItems()}
        ariaLabel={'Use left and right arrow keys to navigate between commands'}
      />
      <Table
        items={data.applications}
        isLoading={loading}
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
              return (
                <RowName to="/application" onClick={e => e.stopPropagation()}>
                  {item.name} <small>({item.activeVersion})</small>
                </RowName>
              );
            },
          },
          {
            key: 'column2',
            name: 'Culture',
            fieldName: 'culture',
            minWidth: 100,
            maxWidth: 200,
            isResizable: false,
            ariaLabel: 'Operations for culture',
          },
          {
            key: 'column3',
            name: 'Created date',
            fieldName: 'created_date',
            minWidth: 100,
            maxWidth: 200,
            isResizable: false,
            ariaLabel: 'Operations for created date',
          },
          {
            key: 'column3',
            name: 'Endpoint hits',
            fieldName: 'endpointHitsCount',
            minWidth: 100,
            maxWidth: 200,
            isResizable: false,
            ariaLabel: 'Operations for endpoint hits',
          },
        ]}
      />
    </Container>
  );
};

const Container = styled.section`
  width: 90%;
  align-self: center;
`;

export default MyApps;
