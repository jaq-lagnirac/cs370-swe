import React from 'react';
import RootLayout from './layout';
import Table from './components/table';

export default function Roster() {
  const columns: string[] = ["Name", "Email", "Banner ID"];
  const members = [
    {"Name": "Andrew Ruff", "Email": "aruff@gmail.com", "Banner ID": 111111111, "Role": "exec"},
    {"Name": "Julian Williams", "Email": "jwilliams@gmail.com", "Banner ID": 22222222, "Role": "member"},
    {"Name": "Justin Caringal", "Email": "jcaringal@gmail.com", "Banner ID": 333333333,  "Role": "president"},
  ];
  return (
    <>
      <h1>Stargazers Roster Manager</h1>
      <Table columns={columns} members={members}/>
    </>
  );
}