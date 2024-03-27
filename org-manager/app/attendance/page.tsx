import React from 'react';
import ImgDl from '../components/img-dl'
import Table from '../components/table';
import RootLayout from '../layout';

export default function Attendance() {
  const columns = ["Date", "Time", "Attendees"];
  const members = [
    {Date: "1970-01-01", Time: "10:00-12:00", Attendees: 111111111}
  ];
  return (
    <div>
      <h1>Attendance</h1>
      <button className="attendance-button">Create Session</button>
      <p>Here is a test QR code download.</p>
      <ImgDl></ImgDl>
      <Table columns={columns} members={members}/>
    </div>
  );
}