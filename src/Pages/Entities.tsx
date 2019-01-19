import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import {
  CommandBar,
  ICommandBarItemProps,
  SearchBox,
} from 'office-ui-fabric-react';
import { Table } from '../Components';
import { RowName } from '../Components/Table';

const Entities = () => {
  const getItems = () => {
    return [
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
    ];
  };

  const getFarItems = (): ICommandBarItemProps[] => {
    return [
      {
        key: 'searchBox',
        onRender: () => <SearchBox size={36} placeholder="Search entities" />,
      },
    ];
  };

  return (
    <section>
      <h1 className="ms-font-xxl ms-fontSize-xxl ms-fontWeight-regular">
        Entities
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
            name: 'Calendar.Location',
            type: 'Domain',
            labeled_utterances: 10,
          },
          {
            key: '2',
            name: 'Calendar.Subject',
            type: 'Simple',
            labeled_utterances: 5,
          },
          {
            key: '3',
            name: 'Location',
            type: 'Simple',
            labeled_utterances: 110,
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

export default Entities;
