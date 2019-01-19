import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  CommandBar,
  ICommandBarItemProps,
  SearchBox,
} from 'office-ui-fabric-react';
import { Table } from '../Components';
import { RowName } from '../Components/Table';

const Intents = () => {
  const getItems = () => [
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
  ];

  const getFarItems = (): ICommandBarItemProps[] => [
    {
      key: 'searchBox',
      onRender: () => <SearchBox size={36} placeholder="Search intents" />,
    },
  ];

  return (
    <section>
      <h1 className="ms-font-xxl ms-fontSize-xxl ms-fontWeight-regular">
        Intents
      </h1>
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
            name: 'Calendar.Add',
            labeled_utterances: 10,
          },
          {
            key: '2',
            name: 'Calendar.Remove',
            labeled_utterances: 20,
          },
          {
            key: '3',
            name: 'Reminder.Add',
            labeled_utterances: 40,
          },
          {
            key: '4',
            name: 'Reminder.Remove',
            labeled_utterances: 50,
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
              return <RowName to="#">{item.name}</RowName>;
            },
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

export default Intents;
