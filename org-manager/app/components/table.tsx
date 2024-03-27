/* eslint-disable react/jsx-key */
import React from 'react';

interface TableProps {
  columns: string[];
  members: {[key: string]: any}[];
}

// The key column is last
// N
const Table: React.FC<TableProps> = ({columns, members})  => {
  let table = [
    <thead>
      <tr key="Header">
        {columns.map((column: string, index:number) => {
          return <th key={column} scope="col">{column}</th>
        })}
      </tr>
    </thead>
  ];
  for (let i = 0; i < members.length; i++) {
    let td: React.ReactNode[] = [];
    for (let j = 0; j < columns.length; j++) {
      td.push(
        <td key={columns[i] + members[i][columns[columns.length - 1]]}>
          {members[i][columns[j]]}
        </td>
      )
    }
    table.push(
      <tbody>
        <tr key={members[i][columns[columns.length - 1]]}>
          {td}
        </tr>
      </tbody>
    )
  }
  return (
    <table className="table table-bordered">
      {table}
    </table>
  );
};

export default Table;
