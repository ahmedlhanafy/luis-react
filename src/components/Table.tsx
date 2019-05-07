import React, { useRef } from 'react';
import {
  IColumn,
  MarqueeSelection,
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  ShimmeredDetailsList,
  ISelection,
} from 'office-ui-fabric-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type Props = {
  columns: IColumn[];
  items: any[];
  isLoading?: boolean;
  selection: ISelection;
};

const Table = (props: Props) => {
  return (
    <MarqueeSelection selection={props.selection}>
      <ShimmeredDetailsList
        styles={{}}
        // componentRef={this._detailsList}
        items={props.items}
        columns={props.columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.justified}
        selection={props.selection}
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        enableShimmer={props.isLoading}
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
