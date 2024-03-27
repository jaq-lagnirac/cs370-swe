import React from 'react';
import RootLayout from './layout';
import Table from './components/table';

export default function Roster() {
  const columns: string[] = ["name", "email", "banner ID"];
  const members = [
    {name: "Andrew Ruff", email: "aruff@gmail.com", "banner ID": 111111111},
    {name: "Julian Williams", email: "jwilliams@gmail.com", "banner ID": 22222222},
    {name: "Justin Caringal", email: "jcaringal@gmail.com", "banner ID": 333333333},
  ];
  return (
    <>
      <h1>Roster</h1>
      <Table columns={columns} members={members}/>
    </>
  );
}