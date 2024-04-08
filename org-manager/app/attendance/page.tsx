'use client';
import React from 'react';
import ImgDl from '../components/img-dl'
import Table from '../components/table';
import Modal from '../components/modal';
import { useState } from 'react';
import RootLayout from '../layout';

export default function Attendance() {
  const columns = ["Date", "Time", "Attendees"];
  const tableData = [
    {Date: "1970-01-01", Time: "10:00-12:00", Attendees: 2}
  ];
  const [showQR, setShowQR] = useState(false);
  const addLink = "";
  const addQR = "";

  const showQRCOde = () => {
    setShowQR(!showQR);
  }

  return (
    <div>
      <h1>Attendance</h1>
      <button className="large-purple-button mb-4" onClick={showQRCOde}>Create Session</button>
      {showQR ? (
        <>
          <h2 className="mb-2">Here is a test QR code download.</h2>
          <div className="mb-5">
            <ImgDl/>
          </div>
        </>
      ) : ( <></> )}
      <div className="mb-3">
        <Table columns={columns} tableData={tableData} colorCoded={false}/>
        <Modal modalTitle="Create New Attendance Session" addLink={addLink} addQR ={addQR} deleteButton={true} areYouSureTitle={"Are you sure you want to delete your session?"}/>
      </div>
    </div>
  );
}