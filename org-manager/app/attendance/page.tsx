'use client';
import React from 'react';
import ImgDl from '../components/img-dl'
import Table from '../components/table';
import { useState } from 'react';
import RootLayout from '../layout';

export default function Attendance() {
  const columns = ["Date", "Time", "Attendees"];
  const members = [
    {Date: "1970-01-01", Time: "10:00-12:00", Attendees: 2}
  ];
  const [showQR, setShowQR] = useState(false);

  const showQRCOde = () => {
    setShowQR(!showQR);
  }

  return (
    <div>
      <h1>Attendance</h1>
      <button className="attendance-button" onClick={showQRCOde}>Create Session</button>
      {showQR ? (
        <>
          <p>Here is a test QR code download.</p>
          <ImgDl></ImgDl>
          <Table columns={columns} members={members} />
        </>
      ) : ( <></> )}
    </div>
  );
}