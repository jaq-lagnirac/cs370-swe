'use client';
import React from 'react';
import ImgDl from '../components/img-dl';
import Table from '../components/table';
import Modal from '../components/modal';
import CopyText from '../components/copy-text';
import { useState, useEffect } from 'react';
import RootLayout from '../layout';

export default function Attendance() {
  const [loadingGate, setLoadingGate] = useState(false);
  const [tableData, setTableData] = useState<any>([]);
  let pleaseRunOnceFlag = false;

  const readEntries = (newEntries: any) => {
    console.log("Reading members, response body is: " + JSON.stringify(newEntries));
    /*
    let tempArray = rosterMembers;
    for (let i = 0; i < newEntries["members"].length; i++) {
      let tempMember = dbMemberToLocal(newEntries["members"][i])
      console.log("Adding member: " + newEntries["members"][i]);
      tempArray.push(tempMember);
    }
    setRosterMembers(tempArray);
    console.log(rosterMembers);
    setLoadingGate(true);
    */
  }

function sendRequest(url: any) {
    // options.body = JSON.stringify(body);
    return fetch(url, {
      method: "GET",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json"
      },
    });
  }
  useEffect(() => {
  if (!pleaseRunOnceFlag) {
    const testPromise = sendRequest("http://0.0.0.0:8080/api/attendance");
      testPromise.then(response => response.json())
      .then(readEntries, console.log);
  }
  pleaseRunOnceFlag = true;
  });



  const columns = ["Date", "Time", "Attendees"];


  const saveSession = () => {
    console.log("When we connect to the backend, this function will create a new event.");
    // Also it will probably need to refresh the table so the new event shows up
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
          toggleText="Create Session"
          toggleClass="large-purple-button mb-4 float-left"
          modalId="newAttendance"
        />
      {!loadingGate ?
      <div className="mb-3">
        <Table columns={columns} tableData={tableData} colorCoded={false}/>
      </div>
      : <></>}
    </div>
  );
}