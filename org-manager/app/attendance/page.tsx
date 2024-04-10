'use client';
import React from 'react';
import ImgDl from '../components/img-dl';
import Table from '../components/table';
<<<<<<< HEAD
import CopyText from '../components/copy-text';
=======
import Modal from '../components/modal';
>>>>>>> 5e2f5a3af14000e2608ee5f413f14dc729e562bf
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
  const createEvent = () => {
    console.log("When we connect to the backend, this function will create a new event.");
    // Also it will probably need to refresh the table so the new event shows up
  }

  return (
    <div>
      <h1>Attendance</h1>
      <button className="large-purple-button mb-4" onClick={showQRCOde}>Create Session</button>
      {showQR ? (
        <>
          <h2 className="mb-2">Here is a test QR code download.</h2>
          <CopyText/>
          <div id="qrcode" className="mb-2">
            <ImgDl/>
          </div>
          <button className="attendance-button mb-4" onClick={createEvent}>Confirm Creation</button>
        </>
      ) : ( <></> )}
      <div className="mb-3">
<<<<<<< HEAD
        <Table columns={columns} tableData={tableData} />

=======
        <Table columns={columns} tableData={tableData} colorCoded={false}/>
        <Modal modalTitle="Create New Attendance Session" addLink={addLink} addQR ={addQR} deleteButton={true} areYouSureTitle={"Are you sure you want to delete your session?"}/>
>>>>>>> 5e2f5a3af14000e2608ee5f413f14dc729e562bf
      </div>
    </div>
  );
}