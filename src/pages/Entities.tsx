import React, { useRef, useEffect } from 'react';
import { get } from 'lodash';
import { CommandBar, SearchBox, Selection, ISelection } from 'office-ui-fabric-react';
import { useQuery, useMutation } from 'react-apollo-hooks';
import Table, { RowName } from '../components/Table';
import GetEntitiesQuery from '../graphql/queries/GetEntities';
import { GetEntities, GetEntities_application_entities } from '../graphql/queries/__generated__/GetEntities';
import RenameEntityMutation from '../graphql/mutations/RenameEntity';
import { RenameEntity, RenameEntityVariables } from '../graphql/mutations/__generated__/RenameEntity';

const Entities = ({ applicationId }: { applicationId: string }) => {
  const { data, loading } = useQuery<GetEntities>(GetEntitiesQuery, { variables: { applicationId } });

  const selection: { current: ISelection } = useRef<ISelection>(
    new Selection({
      onSelectionChanged: (...args: any[]) => console.log(selection.current.getSelection()),
    }),
  );
  const name = 'Refrential entegrity';
  const renameEntity = useMutation<RenameEntity, RenameEntityVariables>(RenameEntityMutation, {
    variables: { applicationId, versionId: '0.1', id: '8d712b4b-c3c7-466a-9426-a21154757987', name },
    optimisticResponse: {
      renameEntity: {
        id: '8d712b4b-c3c7-466a-9426-a21154757987',
        name,
        __typename: 'SimpleEntity',
      },
    },
  });

  return (
    <section>
      <h1 className="ms-font-xxl ms-fontSize-xxl ms-fontWeight-regular">Entities</h1>
      <TopBar renameEntity={renameEntity} />
      <Table
        selection={selection.current}
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

const TopBar = ({ renameEntity }: any) => (
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
      {
        key: 'rename_entity',
        name: 'Rename Entity',
        iconProps: {
          iconName: 'Edit',
        },
        // href: 'https://dev.office.com/fabric',
        ['data-automation-id']: 'uploadButton',
        onClick: renameEntity,
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
