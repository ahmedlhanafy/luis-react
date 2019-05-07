import React, { useRef } from 'react';
import styled from 'styled-components';
import {
  CommandBar,
  SearchBox,
  Dialog,
  DialogType,
  PrimaryButton,
  DefaultButton,
  DialogFooter,
  TextField,
  Selection,
} from 'office-ui-fabric-react';
import gql from 'graphql-tag';
import Table, { RowName } from '../components/Table';
import { useQuery, useMutation } from 'react-apollo-hooks';
import GetAppsQuery from '../graphql/queries/GetApps';
import { GetApps, GetApps_applications } from '../graphql/queries/__generated__/GetApps';
import CreateNewAppMutation from '../graphql/mutations/CreateNewApp';
import { CreateNewApp, CreateNewAppVariables } from '../graphql/mutations/__generated__/CreateNewApp';

const MyApps = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { data, loading } = useQuery<GetApps>(GetAppsQuery);
  const selection = useRef(
    new Selection({
      onSelectionChanged: console.log,
    }),
  );
  return (
    <Container>
      <h1 className="ms-font-xxl ms-fontSize-xxl ms-fontWeight-regular">My Apps</h1>
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
            // href: 'https://dev.office.com/fabric',
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
      <Table
        selection={selection.current}
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
      <NewAppDialog open={dialogOpen} requestClose={() => setDialogOpen(false)} />
    </Container>
  );
};

const NewAppDialog = ({ open, requestClose }: { open: boolean; requestClose: () => void }) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const creatNewApp = useMutation(CreateNewAppMutation, {
    variables: { name, description },
    update: (store, { data: { createApplication } }) => {
      const data = store.readQuery({ query: GetAppsQuery });
      (data as any).applications.push(createApplication);
      store.writeQuery({ query: GetAppsQuery, data });
    },
  });
  return (
    <Dialog
      hidden={!open}
      onDismiss={requestClose}
      dialogContentProps={{
        type: DialogType.normal,
        title: 'Create new app',
        subText: '',
      }}
      modalProps={{
        isBlocking: false,
        // styles: { root: { minWidth: 720 } },
      }}
    >
      <TextField
        value={name}
        onChange={e => e && setName((e.nativeEvent.target as any).value)}
        styles={{ root: { marginBottom: 12 } }}
        label="Name"
        placeholder="Type app name..."
      />
      <TextField
        value={description}
        onChange={e => e && setDescription((e.nativeEvent.target as any).value)}
        label="Description"
        placeholder="Type app description"
      />
      <DialogFooter>
        <PrimaryButton
          onClick={async () => {
            await creatNewApp();
            requestClose();
          }}
          text="Create"
        />
        <DefaultButton onClick={requestClose} text="Cancel" />
      </DialogFooter>
    </Dialog>
  );
};

const Container = styled.section`
  width: 90%;
  align-self: center;
`;

export default MyApps;
