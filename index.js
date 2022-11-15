import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Page,
  Edit,
  Toolbar,
} from '@syncfusion/ej2-react-grids';

import { orderDataSource } from './data';
import { updateSampleSection } from './sample-base';
import { PropertyPane } from './property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
function NormalEdit() {
  React.useEffect(() => {
    updateSampleSection();
  }, []);

  const ICON_DOWN = 'e-chevron-down';
  const ICON_UP = 'e-chevron-up';
  const ICON_EDITDIALOG = 'e-bring-to-front';
  const ICON_EDITINLINE = 'e-text-form';

  const [iconDrag, setIconDrag] = React.useState(ICON_UP);
  const [iconEdit, setIconEdit] = React.useState(ICON_EDITDIALOG);

  const [columnsGrid, setColumnsGrid] = React.useState([]);
  const [enableAutoFill, setEnableAutoFill] = React.useState(false);
  const [nameView, setNameView] = React.useState('Default');
  const [groupOptions, setGroupOptions] = React.useState({
    allowReordering: true,
    showDropArea: true,
  });
  const [editSettings, setEditSettings] = React.useState({
    mode: 'Dialog',
    allowAdding: true,
    allowDeleting: true,
    allowEditing: true,
  });
  const [sortingOptions, setSortingOptions] = React.useState({
    columns: [],
  });
  const [filterOptions, setFilterOption] = React.useState({
    columns: [],
    type: 'Excel',
  });

  const [selectionSettings, setSelectionSettings] = React.useState({});

  const clickHandler = (args) => {
    console.log('args clickk', args);
    if (args.item.id === 'showDrag') {
      setGroupOptions({
        ...groupOptions,
        showDropArea: !groupOptions.showDropArea,
      });
      iconDrag === ICON_UP ? setIconDrag(ICON_DOWN) : setIconDrag(ICON_UP);
    }

    if (args.item.id === 'typeEdit') {
      if (iconEdit === ICON_EDITDIALOG) {
        setEnableAutoFill(true);
        setEditSettings({
          mode: 'Batch',
          allowAdding: false,
          allowDeleting: false,
          allowEditing: true,
        });
        setSelectionSettings({
          cellSelectionMode: 'Box',
          type: 'Multiple',
          mode: 'Cell',
        });
        setIconEdit(ICON_EDITINLINE);
      } else {
        setEnableAutoFill(false);
        setEditSettings({
          mode: 'Dialog',
          allowAdding: true,
          allowDeleting: true,
          allowEditing: true,
        });
        setSelectionSettings({});
        setIconEdit(ICON_EDITDIALOG);
      }
    }
  };

  const toolbarOptions = [
    'Add',
    'Edit',
    'Delete',
    'Update',
    'Cancel',
    { prefixIcon: iconDrag, id: 'showDrag' },
    { prefixIcon: iconEdit, id: 'typeEdit' },
  ];
  // const editSettings = {
  //   allowEditing: true,
  //   allowAdding: true,
  //   allowDeleting: true,
  //   newRowPosition: 'Top',
  // };
  const editparams = { params: { popupHeight: '300px' } };
  const validationRule = { required: true };
  const orderidRules = { required: true, number: true };
  const pageSettings = { pageCount: 5 };
  const format = { type: 'dateTime', format: 'M/d/y hh:mm a' };
  let gridInstance;
  let dropDownInstance;

  function actionBegin(args) {
    if (args.requestType === 'save') {
      if (
        gridInstance.pageSettings.currentPage !== 1 &&
        gridInstance.editSettings.newRowPosition === 'Top'
      ) {
        args.index =
          gridInstance.pageSettings.currentPage *
            gridInstance.pageSettings.pageSize -
          gridInstance.pageSettings.pageSize;
      } else if (gridInstance.editSettings.newRowPosition === 'Bottom') {
        args.index =
          gridInstance.pageSettings.currentPage *
            gridInstance.pageSettings.pageSize -
          1;
      }
    }
  }

  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="col-md-9">
          <GridComponent
            allowFiltering={true}
            allowGrouping={true}
            allowPaging={true}
            allowResizing={true}
            allowSorting={true}
            enableAutoFill={enableAutoFill}
            filterSettings={filterOptions}
            groupSettings={groupOptions}
            pageSettings={{ pageSizes: true }}
            selectionSettings={selectionSettings}
            showColumnChooser={true}
            sortSettings={sortingOptions}
            dataSource={orderDataSource}
            ref={(grid) => (gridInstance = grid)}
            toolbar={toolbarOptions}
            editSettings={editSettings}
            actionBegin={actionBegin.bind(this)}
            toolbarClick={clickHandler}
          >
            <ColumnsDirective>
              <ColumnDirective
                field="OrderID"
                headerText="Order ID"
                width="140"
                textAlign="Right"
                validationRules={orderidRules}
                isPrimaryKey={true}
              ></ColumnDirective>
              <ColumnDirective
                field="CustomerName"
                headerText="Customer Name"
                width="150"
                validationRules={validationRule}
              ></ColumnDirective>
              <ColumnDirective
                field="Freight"
                headerText="Freight"
                width="140"
                format="C2"
                textAlign="Right"
                editType="numericedit"
              ></ColumnDirective>
              <ColumnDirective
                field="OrderDate"
                headerText="Order Date"
                editType="datetimepickeredit"
                format={format}
                width="160"
              ></ColumnDirective>
              <ColumnDirective
                field="ShipCountry"
                headerText="Ship Country"
                width="150"
                editType="dropdownedit"
                edit={editparams}
              ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Page, Toolbar, Edit]} />
          </GridComponent>
        </div>
      </div>
    </div>
  );
}
export default NormalEdit;

const root = createRoot(document.getElementById('sample'));
root.render(<NormalEdit />);
