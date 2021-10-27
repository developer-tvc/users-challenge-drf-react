import '../App.css';
import { SERVER_URL
} from "../constant";
import { useSelector,useDispatch,dispatch } from 'react-redux';
import { getList } from '../redux/action/updateListActionComponent';
import ReactDOM from 'react-dom';
import { AddFilled32,CheckmarkFilled24,PauseOutlineFilled24,TrashCan32 } from '@carbon/icons-react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableSelectAll,
  TableSelectRow,
  TableBatchActions,
  TableBatchAction,
  Button,
  ComposedModal,
  ModalBody,
  ModalHeader,
} from 'carbon-components-react';
import React, { useState, useEffect } from 'react';


function addUser(first_name, username, is_active, is_staff, is_superuser,dispatch){
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
        "first_name":first_name,
        "username":username,
        "is_superuser":is_superuser,
        "is_staff":is_staff,
        "is_active":is_active
      })
  };
  fetch(`${SERVER_URL}register/`, requestOptions).then((result)=> {
    dispatch(getList())
  })
  

}
function deleteBatch(act,dispatch){
  var delete_list = [];
  act.forEach(function(user){
    delete_list.push(parseInt(user.id))
  });
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
          "list":delete_list
      })
  };
  fetch(`${SERVER_URL}delete-user/`, requestOptions).then((result)=> {
    dispatch(getList())
  })

}
function deactivateBatch(act, dispatch){
  var deactivate_list = [];
  act.forEach(function(user){
    deactivate_list.push(parseInt(user.id))
  });
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
          "list":deactivate_list
      })
  };
  fetch(`${SERVER_URL}user-deactivate/`, requestOptions).then((result)=> {
    dispatch(getList())
  })

}
function activateBatch(act, dispatch){
  var activate_list = [];
  act.forEach(function(user){
    activate_list.push(parseInt(user.id))
  });
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
          "list":activate_list
      })
  };
  fetch(`${SERVER_URL}user-activate/`, requestOptions).then((result)=> {
    dispatch(getList())
  })
}

const headers = [
  {
    key: 'first_name',
    header: 'Name',
  },
  {
    key: 'username',
    header: 'Username',
  },
  {
    key: 'is_superuser',
    header: 'Superuser',
  },
  {
    key: 'is_staff',
    header: 'Staff',
  },
  {
    key: 'is_active',
    header: 'Active',
  },
];


const List = ()=>{
  const [rows, setRows] = useState([]);
  const[loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [uname, setUsername] = useState('')
  const [isactive, setIsActive] = useState(false);
  const [isstaff, setIsStaff] = useState(false);
  const [issuperuser, setIsSuperUSer] = useState(false);
const data = useSelector(state=>state.updateListReducer.List)
useEffect(()=>{

dispatch(getList())
}, [])
useEffect(()=>{
setRows(data)
}, [data])
  return (<>
  {typeof document === 'undefined'
        ? null
        : ReactDOM.createPortal(
            <ComposedModal open={open} onClose={() => setOpen(false)}>
              <ModalHeader >
                <h4>
                  Add New User
                </h4>
              </ModalHeader>
          <ModalBody hasForm>
          <label style={{ display: 'block' }} for="text-input-name"> Name</label>
          <input data-modal-primary-focus
                  id="text-input-name"
                  onChange={event => setName(event.target.value)}
                  labelText="Name"
                  placeholder=" Eg: Thomas"
                  style={{ marginBottom: '1rem', display: 'block', width:'100%' }}/>


          <label style={{ display: 'block' }} for="text-input-username"> Username</label>
          <input  required data-modal-primary-focus
                  id="text-input-username"
                  onChange={event => setUsername(event.target.value)}
                  labelText="Username"
                  placeholder=" Eg: thomas"
                  style={{ marginBottom: '1rem', display: 'block', width:'100%' }}/>
       

          <input style={{ display: 'block' }} type="checkbox" onChange={event => setIsSuperUSer(event.target.value)} labelText="Superuser" id="checkbox-superuser" />
          <label style={{ display: 'block' }} for="checkbox-superuser"> Superuser</label>
          <input style={{ display: 'block' }} type="checkbox" onChange={event => setIsActive(event.target.value)} labelText="Is Active" id="checkbox-isactive" />
          <label style={{ display: 'block' }} for="checkbox-isactive"> Active</label>
          <input style={{ display: 'block' }} type="checkbox" onChange={event => setIsStaff(event.target.value)} labelText="Is Staff" id="checkbox-isstaff" />
          <label style={{ display: 'block' }} for="checkbox-isstaff"> Staff</label>
          
          <Button onClick={() => {addUser(name, uname, isactive, isstaff, issuperuser, dispatch);setOpen(false)}}
                  size="small"
                  kind="primary">
                  Add New User
          </Button>

          </ModalBody>  
            </ComposedModal>,
            document.body
          )}
      
  
  {rows?.length!==0?
    <DataTable rows={rows} headers={headers}>
    {({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getSelectionProps,
      getToolbarProps,
      getBatchActionProps,
      onInputChange,
      selectedRows,
      getTableProps,
      getTableContainerProps,
    }) => (
      
      <TableContainer title="Users"
      {...getTableContainerProps()}>
        <Button
            style={{ float: 'right' }}
            tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
            onClick={() => setOpen(true)}
            renderIcon={AddFilled32}
            size="small"
            kind="primary">
            Add new
          </Button>
      <TableToolbar {...getToolbarProps()}>
        <TableBatchActions persistent="true" {...getBatchActionProps()}>
          <TableBatchAction
            persistent="true"
            tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
            renderIcon={TrashCan32}
            onClick={() => { deleteBatch(selectedRows, dispatch)}}>
            Delete
          </TableBatchAction>
          <TableBatchAction
            tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
            renderIcon={CheckmarkFilled24}
            onClick={() => {activateBatch(selectedRows, dispatch)}}>
            Activate
          </TableBatchAction>
          <TableBatchAction
            tabIndex={getBatchActionProps().shouldShowBatchActions ? 0 : -1}
            renderIcon={PauseOutlineFilled24}
            onClick={() => {deactivateBatch(selectedRows, dispatch)}}>
            Deactivate
          </TableBatchAction>
        </TableBatchActions>
        <TableToolbarContent>
          <TableToolbarSearch
            persistent="true"
            tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
            onChange={onInputChange}/>

          
        </TableToolbarContent>
      </TableToolbar>
      <Table {...getTableProps()}>
        <TableHead>
          <TableRow>
            <TableSelectAll {...getSelectionProps()} />
            {headers.map((header, i) => (
              <TableHeader key={i} {...getHeaderProps({ header, isSortable: true })}>
                {header.header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i} {...getRowProps({ row })}>
              <TableSelectRow {...getSelectionProps({ row })} />
              {row.cells.map((cell) => (
                <TableCell key={cell.id}>{
                [true, false].includes(cell.value) ? (cell.value ? (<img  width="10" height="10" src="/check.png" />) : (<img width="10" height="10" src="/cancel.png" />)):cell.value
              }</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )}
  </DataTable>
    :
    <DataTable rows={rows} headers={headers}>
    {({
      headers,
      getHeaderProps,
      getSelectionProps,
      getBatchActionProps,
      getTableProps,
      getTableContainerProps,
    }) => (
      
      <TableContainer
      {...getTableContainerProps()}>
        <h4>Users</h4>
        <Button
            style={{ float: 'right' }}
            tabIndex={getBatchActionProps().shouldShowBatchActions ? -1 : 0}
            onClick={() => setOpen(true)}
            renderIcon={AddFilled32}
            size="small"
            kind="primary">
            Add new
          </Button>
      <Table {...getTableProps()}>
        <TableHead>
          <TableRow>
            <TableSelectAll {...getSelectionProps()} />
            {headers.map((header, i) => (
              <TableHeader key={i} {...getHeaderProps({ header, isSortable: true })}>
                {header.header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
    )}
  </DataTable>}</>
  );
}

export default List;
