import React, { useState } from 'react';
import { get } from 'lodash';
import { CommandBar, SearchBox } from 'office-ui-fabric-react';
import { useQuery } from 'react-apollo-hooks';
import Table, { RowName } from '../components/Table';
import GetEntitiesQuery from '../graphql/queries/GetEntities';
import useSelection from '../hooks/useSelection';
import { GetEntities, GetEntities_application_entities } from '../graphql/queries/__generated__/GetEntities';
import RenameEntityDialog from '../components/RenameEntityDialog';
import useAppData from '../hooks/useAppData';

const Entities = () => {
  const { applicationId } = useAppData();
  const { data, loading } = useQuery<GetEntities>(GetEntitiesQuery, { variables: { applicationId } });
  const { selection, items } = useSelection();

  return (
    <section>
      <h1 className="ms-font-xxl ms-fontSize-xxl ms-fontWeight-regular">Entities</h1>
      <TopBar items={items} />
      <Table
        selection={selection}
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
            onRender: (item: GetEntities_application_entities) => {
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

const TopBar = ({ items }: { items: GetEntities_application_entities[] }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
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
          {
            key: 'rename_entity',
            name: 'Rename Entity',
            iconProps: {
              iconName: 'Edit',
            },
            // href: 'https://dev.office.com/fabric',
            ['data-automation-id']: 'uploadButton',
            onClick: () => setDialogOpen(true),
            disabled: items.length !== 1,
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
      {items.length > 0 ? (
        <RenameEntityDialog entityId={items[0].id} entityName={items[0].name} open={dialogOpen} requestClose={() => setDialogOpen(false)} />
      ) : null}
    </>
  );
};

export default Entities;
