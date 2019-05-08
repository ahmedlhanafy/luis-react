import React from 'react';
import { Dialog, DialogType, PrimaryButton, DefaultButton, DialogFooter, TextField } from 'office-ui-fabric-react';
import { useMutation } from 'react-apollo-hooks';
import GetAppsQuery from '../graphql/queries/GetApps';
import CreateNewAppMutation from '../graphql/mutations/CreateNewApp';
import { CreateNewApp, CreateNewAppVariables } from '../graphql/mutations/__generated__/CreateNewApp';

const NewAppDialog = ({ open, requestClose }: { open: boolean; requestClose: () => void }) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const creatNewApp = useMutation<CreateNewApp, CreateNewAppVariables>(CreateNewAppMutation, {
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

export default NewAppDialog;
