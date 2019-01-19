import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  CommandBar,
  ICommandBarItemProps,
  SearchBox,
} from 'office-ui-fabric-react';
import { Table } from '../Components';
import { RowName } from '../Components/Table';

const MyApps = () => {
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
        onRender: () => (
          <SearchBox
            size={36}
            placeholder="Search"
          />
        ),
      },
    ];
  };

  return (
    <Container>
      <h1 className="ms-font-xxl ms-fontSize-xxl ms-fontWeight-regular">My Apps</h1>
      <CommandBar
        styles={{
          secondarySet: {
            alignItems: 'center',
          },
        }}
        items={getItems()}
        farItems={getFarItems()}
        ariaLabel={'Use left and right arrow keys to navigate between commands'}
      />
      <Table
        items={[
          {
            key: '1',
            name: 'Weather',
            version: 0.1,
            created_date: '12/18',
            culture: 'en-us',
            endpoint_hits: 10,
          },
          {
            key: '2',
            name: 'LUIS App',
            version: 0.2,
            created_date: '11/18',
            culture: 'en-us',
            endpoint_hits: 100,
          },
          {
            key: '3',
            name: 'Basic Bot',
            version: 0.5,
            created_date: '11/18',
            culture: 'en-us',
            endpoint_hits: 2100,
          },
        ]}
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
                  {item.name} <small>({item.version})</small>
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
            fieldName: 'endpoint_hits',
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
