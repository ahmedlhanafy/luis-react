import React, { useState } from 'react';
import { Dialog, DialogType, TextField, DialogFooter, DefaultButton, PrimaryButton } from 'office-ui-fabric-react';
import { useMutation } from 'react-apollo-hooks';
import RenameEntityMutation from '../graphql/mutations/RenameEntity';
import { RenameEntity, RenameEntityVariables } from '../graphql/mutations/__generated__/RenameEntity';
import useAppData from '../hooks/useAppData';

type Props = {
  entityName: string;
  entityId: string;
  open: boolean;
  requestClose: () => void;
};

const RenameEntityDialog = ({ entityName, entityId, open, requestClose }: Props) => {
  const { applicationId, versionId } = useAppData();

  const [name, setName] = useState(entityName);

  const renameEntity = useMutation<RenameEntity, RenameEntityVariables>(RenameEntityMutation, {
    variables: { applicationId, versionId, id: entityId, name },
    optimisticResponse: {
      renameEntity: {
        id: entityId,
        name,
        __typename: 'SimpleEntity',
      },
    },
  });

  return (
    <Dialog
      hidden={!open}
      onDismiss={requestClose}
      dialogContentProps={{
        type: DialogType.normal,
        title: 'Rename entity',
        subText: '',
      }}
      modalProps={{
        isBlocking: false,
      }}
    >
      <TextField
        value={name}
        onChange={e => e && setName((e.nativeEvent.target as any).value)}
        styles={{ root: { marginBottom: 12 } }}
        label="Entity Name"
        placeholder="Type entity name..."
      />

      <DialogFooter>
        <PrimaryButton
          onClick={() => {
            renameEntity();
            requestClose();
          }}
          text="Rename"
        />
        <DefaultButton onClick={requestClose} text="Cancel" />
      </DialogFooter>
    </Dialog>
  );
};

export default RenameEntityDialog;
