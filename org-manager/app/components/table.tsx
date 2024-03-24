import React from 'react';

interface TableProps {
  columns: string[];
  members: {[key: string]: any}[];
  keyName?: string;
}

// Only name non-key columns in the columns array
// The key column is last
const Table: React.FC<TableProps> = ({columns, members, keyName})  => {
  let table = [
    <thead>
      <tr>
        {columns.map((column: string, index:number) => {
          return <th key={index} scope="col">{column}</th>
        })}
        <th scope="col">{"Key"}</th>
      </tr>
    </thead>
  ];
  for (let i = 0; i < members.length; i++) {
    let td: React.ReactNode[] = [];
    for (let j = 0; j < columns.length; j++) {
      td.push(
        <td>
          {members[i][columns[j]]}
        </td>
      )
    }
    table.push(
      <tr>
        {td}
      </tr>
    )
  }
  return (
    <table className="table table-bordered">
      {table}
    </table>
  );
};

export default Table;
