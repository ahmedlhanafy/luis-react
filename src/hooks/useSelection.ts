import { ISelection, Selection } from 'office-ui-fabric-react';
import React from 'react';

export default () => {
  const [items, setItems] = React.useState([]);
  const selection: { current: ISelection } = React.useRef<ISelection>(
    new Selection({
      onSelectionChanged: () => setItems(selection.current.getSelection()),
    }),
  );

  return { selection: selection.current, items };
};
