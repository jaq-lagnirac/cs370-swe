import React from 'react';
import RootLayout from './layout';
import Table from './components/table';

export default function Roster() {
  const columns: string[] = ["name", "email"];
  const members = [
    {name: "Andrew Ruff", email: "aruff@gmail.com", key: 111111111},
    {name: "Julian Williams", email: "jwilliams@gmail.com", key: 22222222},
    {name: "Justin Caringal", email: "jcaringal@gmail.com", key: 333333333},
  ];
  return (
    <>
      <h1>Roster</h1>
      <Table columns={columns} members={members} keyName="Banner ID"/>
    </>
  );
}