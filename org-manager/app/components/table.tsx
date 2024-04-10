/* eslint-disable react/jsx-key */
import React from 'react';

interface TableProps {
  columns: string[];
  tableData: {[key: string]: any}[];
  colorCoded: boolean;
}

// The key column is last
// N
const RosterTable: React.FC<TableProps> = ({columns, tableData, colorCoded})  => {
  const getRowClassName = (role: string) => {
    if (colorCoded) {
      switch (role) {
        case 'president':
          return 'tr-president';
        case 'exec':
          return 'tr-exec';
        case 'member':
          return 'tr-member';
        default:
          return '';
      }
    } else {
      return 'color-coded';
    }
  };

  const tableRows = tableData.map((rowData, index) => {
    const cells = columns.map((column, columnIndex) => (
        <td key={`${column}-${index}`}>{rowData[column]}</td>
    ));

    const role = rowData['Role'];
    const rowClassName = colorCoded ? getRowClassName(role) : '';

    return (
      <tr key={`row-${index}`} className={rowClassName}>
        {cells}
      </tr>
    );
  });

  return (
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
  );
};

export default RosterTable;
