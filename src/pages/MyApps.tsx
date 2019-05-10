import React from 'react';
import styled from 'styled-components';
import { CommandBar, SearchBox, Checkbox } from 'office-ui-fabric-react';
import Table, { RowName } from '../components/Table';
import { useQuery, useMutation } from 'react-apollo-hooks';
import GetAppsQuery from '../graphql/queries/GetApps';
import { GetApps, GetApps_applications } from '../graphql/queries/__generated__/GetApps';
import DeleteAppsMutation from '../graphql/mutations/DeleteApps';
import { DeleteApps, DeleteAppsVariables } from '../graphql/mutations/__generated__/DeleteApps';
import useSelection from '../hooks/useSelection';
import NewAppDialog from '../components/NewAppDialog';

type Props = { mockSchemaEnabled: boolean; toggleMockSchema: () => void };

const MyApps = ({ mockSchemaEnabled, toggleMockSchema }: Props) => {
  const { data, loading } = useQuery<GetApps>(GetAppsQuery);
  const { items, selection } = useSelection();

  return (
    <Container>
      <h1 className="ms-font-xxl ms-fontSize-xxl ms-fontWeight-regular">
        <span>
          My Apps
          <Checkbox
            label={`${mockSchemaEnabled ? 'Disable' : 'Enable'} mock data`}
            checked={mockSchemaEnabled}
            onChange={() => toggleMockSchema()}
          />
        </span>
      </h1>
      <TopBar items={items} />
      <Table
        selection={selection}
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
            onRender: (item: GetApps_applications) => {
              return (
                <RowName to={`/application/${item.id}/version/${item.activeVersion}`} onClick={e => e.stopPropagation()}>
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

const TopBar = ({ items }: { items: any[] }) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const deleteApps = useMutation<DeleteApps, DeleteAppsVariables>(DeleteAppsMutation, {
    variables: { ids: items.map(_ => _.id) },
    refetchQueries: ['GetApps'],
  });

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
            name: 'Create new app',
            cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
            iconProps: {
              iconName: 'Add',
            },
            ariaLabel: 'New. Use left and right arrow keys to navigate',
            onClick: () => setDialogOpen(true),
          },
          {
            key: 'upload',
            name: 'Import new app',
            iconProps: {
              iconName: 'Upload',
            },
            ['data-automation-id']: 'uploadButton',
          },
          {
            key: 'delete',
            name: `Delete app${items.length === 1 ? '' : 's'}`,
            disabled: items.length === 0,
            iconProps: {
              iconName: 'Delete',
            },
            onClick: (e: any) => {
              deleteApps();
            },
            ['data-automation-id']: 'uploadButton',
          },
        ]}
        farItems={[
          {
            key: 'searchBox',
            onRender: () => <SearchBox size={36} placeholder="Search" />,
          },
        ]}
        ariaLabel={'Use left and right arrow keys to navigate between commands'}
      />
      <NewAppDialog open={dialogOpen} requestClose={() => setDialogOpen(false)} />
    </>
  );
};

const Container = styled.section`
  width: 90%;
  align-self: center;
`;

export default MyApps;
