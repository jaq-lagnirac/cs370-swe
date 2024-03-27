import React from 'react';
import RootLayout from './layout';
import Table from './components/table';

export default function Roster() {
  const columns = ["Name", "Email", "Banner ID"];
  const members = [
    {name: "Andrew Ruff", email: "aruff@gmail.com", id: 111111111, role: "exec"},
    {name: "Julian Williams", email: "jwilliams@gmail.com", id: 22222222, role: "member"},
    {name: "Justin Caringal", email: "jcaringal@gmail.com", id: 333333333, role: "president"},
  ];
  return (
    <>
      <h1>Stargazers Roster Manager</h1>
      <Table columns={columns} members={members}/>
    </>
  );
}