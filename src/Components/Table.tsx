import React, { useRef } from 'react';
import {
  IColumn,
  MarqueeSelection,
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
} from 'office-ui-fabric-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type Props = {
  columns: IColumn[];
  items: any[]
};

const Table = (props: Props) => {
  const selection = useRef(
    new Selection({
      onSelectionChanged: () => {},
    }),
  );

  return (
    <MarqueeSelection selection={selection.current}>
      <DetailsList
        styles={{ headerWrapper: { marginTop: 12 } }}
        // componentRef={this._detailsList}
        items={props.items}
        columns={props.columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.justified}
        selection={selection.current}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
      />
    </MarqueeSelection>
  );
};

export const RowName = styled(Link)`
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.5px;
  cursor: pointer;
  text-decoration: none;
  font-weight: 600;
  color: #006cd8;
  small {
    color: #2b2b2b7a;
    font-size: 80%;
  }
`;
export default Table;
