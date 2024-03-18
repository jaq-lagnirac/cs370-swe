interface TableProps {
  columns: string[];
  members: { name: string; email: string; id: number }[];
}

const Table: React.FC<TableProps> = ({columns, members}) => {
  return (
    <table className="table table-bordered">
    <thead>
      <tr>
        {columns.map((column: string, index: number) => (
          <th key={index} scope="col">
            {column}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {members.map((member, index) => (
        <tr key={index}>
          <td scope="row">{member.name}</td>
          <td>{member.email}</td>
          <td>{member.id}</td>
        </tr>
      ))}
    </tbody>
  </table>
  );
};

export default Table;
