/* eslint-disable react/jsx-key */
import React from 'react';
import Modal from '../components/modal';
import { useState } from 'react';

interface TableProps {
  columns: string[];
  tableData: {[key: string]: any}[];
  colorCoded: boolean;
  EditTitle?: string;
  AreYouSureTitle?: string;
  SaveMember?: () => void;
  DeleteMember?: () => void;
  editModalBody: React.ReactNode;
  setDeleteRowIndex: React.Dispatch<React.SetStateAction<number>>;
}

// The key column is last
const RosterTable: React.FC<TableProps> = ({setDeleteRowIndex, columns, tableData, colorCoded, EditTitle, AreYouSureTitle, SaveMember, DeleteMember, editModalBody})  => {

  const getRowClassName = (role: string) => {
    if (colorCoded) {
      if (role === 'President') {
        return 'tr-president';
      } else if (role === 'Exec') {
        return 'tr-exec';
      } else if (role === 'Member') {
        return 'tr-member';
      } else {
        return 'color-coded';
      }
    } else {
      return 'color-coded';
    }
  };

  const sortedTable = tableData
  .filter(row => row.Role === 'president')
  .concat(tableData.filter(row => row.Role === 'exec'))
  .concat(tableData.filter(row => row.Role === 'member'))
  .concat(tableData.filter(row => !['president', 'exec', 'member'].includes(row.Role)));

  const tableRows = sortedTable.map((rowData, index) => {
      const cells = columns.map((column, columnIndex) => (
        <td key={`${column}-${index}`}>{rowData[column]}</td>
    ));

    const role = rowData['Role'];
    const rowClassName = colorCoded ? getRowClassName(role) : 'color-coded';

  return (
    <>
      <tr key={`row-${index}`} className={rowClassName}>
        { <>
          {cells}
          <td key={`data-${index}`} className="transparent" style={{whiteSpace: 'nowrap', width: '1%'}}>
            <div className="edit-delete-icons">
              {/* <svg onClick={() => {setDeleteRowIndex(index)}} data-toggle="modal" data-target={'#editModal'} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-pencil-square pe-1" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg> */}
              
              {/* <svg onClick={() => {setDeleteRowIndex(index)}} data-toggle="modal" data-target={'#basicModal'} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash3 ps-1" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
              </svg> */}

              <svg onClick={() => {setDeleteRowIndex(index)}} data-toggle="modal" data-target={'#basicModal'} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
              </svg>
            </div>
          </td>
        </> }
      </tr>
    </>
    );
  });

  return (
    <>
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={`header-${index}`} scope="col">{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </table>
    {/* edit modal */}
      <Modal
        modalTitle={EditTitle}
        areYouSureTitle={AreYouSureTitle}
        modalId="editModal"
        onClickSave={SaveMember}
        onClickDelete={DeleteMember}
        modalBody={editModalBody}
      />
      {/* delete modal */}
      <Modal
        areYouSureTitle={`Are you sure you want to delete ?`}
        onClickSave={SaveMember}
        onClickDelete={DeleteMember}
      />
    </>
  )
};

export default RosterTable;
