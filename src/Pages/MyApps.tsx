import React from 'react';
import styled from 'styled-components';
import {
  CommandBar,
  ICommandBarItemProps,
  SearchBox,
  Dialog,
  DialogType,
  PrimaryButton,
  DialogContent,
  DefaultButton,
  DialogFooter,
  Label,
  TextField,
} from 'office-ui-fabric-react';
import gql from 'graphql-tag';
import { Table } from '../Components';
import { RowName } from '../Components/Table';
import { useQuery, useMutation } from 'react-apollo-hooks';

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
      key: id
      name
      culture
      endpointHitsCount
      activeVersion
    }
  }
`;

const MyApps = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const { data, loading } = useQuery(APPS_QUERY);
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

const NewAppMutation = gql`
  mutation($name: String!, $description: String) {
    createApplication(name: $name, description: $description, culture: enus) {
      id
      name
      culture
      activeVersion
      endpointHitsCount
      intents {
        id
        key: id
        name
      }
    }
  }
`;

const NewAppDialog = ({ open, requestClose }: { open: boolean; requestClose: () => void }) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const creatNewApp = useMutation(NewAppMutation, {
    variables: { name, description },
    update: (store, { data: { createApplication } }) => {
      // Read the data from our cache for this query.
      const data = store.readQuery({ query: APPS_QUERY });
      // Add our comment from the mutation to the end.
      (data as any).applications.push(createApplication);
      // Write our data back to the cache.
      store.writeQuery({ query: APPS_QUERY, data });
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
