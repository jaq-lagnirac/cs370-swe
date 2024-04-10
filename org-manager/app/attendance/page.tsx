'use client';
import React from 'react';
import ImgDl from '../components/img-dl';
import Table from '../components/table';
import Modal from '../components/modal';
import CopyText from '../components/copy-text';
import { useState } from 'react';
import RootLayout from '../layout';

export default function Attendance() {
  const columns = ["Date", "Time", "Attendees"];
  const tableData = [
    {Date: "1970-01-01", Time: "10:00-12:00", Attendees: 2}
  ];
  const saveSession = () => {
    console.log("When we connect to the backend, this function will create a new event.");
    // Also it will probably need to refresh the table so the new event shows up
  }

  const generateQR = () => {

  }

  return (
    <div>
      <h1>Attendance</h1>
        <Modal
          modalTitle="Create New Attendance Session"
          modalBody={
            <>
              <h2 className="mb-2">Here is a test QR code download.</h2>
              <CopyText/>
              <div id="qrcode" className="mb-2">
                <ImgDl/>
              </div>
            </>
          }
          saveButton="Done"
          onClickSave={saveSession}
          toggleOnClick={generateQR}
          toggleText="Create Session"
          toggleClass="large-purple-button mb-4 float-left"
          modalId="newAttendance"
        />
      <div className="mb-3">
        <Table columns={columns} tableData={tableData} colorCoded={false}/>
      </div>
    </div>
  );
}