'use client';
import React from 'react';
import ImgDl from '../components/img-dl';
import Table from '../components/table';
import Modal from '../components/modal';
import CopyText from '../components/copy-text';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import RootLayout from '../layout';
import "react-datepicker/dist/react-datepicker.css";

export default function Attendance() {
  const [loadingGate, setLoadingGate] = useState(false);
  const [linkToggle, setLinkToggle] = useState(false);
  const [tableData, setTableData] = useState<any>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [deleteRowIndex, setDeleteRowIndex] = useState(-1);
  let pleaseRunOnceFlag = false;

  const readEntries = (newEntries: any) => {
      console.log("Reading members, response body is: " + JSON.stringify(newEntries));
      let tempArray = tableData;
      for (let i = 0; i < newEntries["attendance"].length; i++) {
        let tempMember = dbEventToLocal(newEntries["attendance"][i]);
        console.log("Adding event: " + tempMember);
        tempArray.push(tempMember);
      }
      setTableData(uniqBy(tempArray, JSON.stringify));
      console.log("Running ReadEntries");
      console.log(tableData);
      setLoadingGate(true);
  }
// https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
function uniqBy(a: any, key: any) {
    var seen: any = {};
    return a.filter(function(item: any) {
        var k = key(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    })
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
    const testPromise = sendRequest("http://127.0.0.1:8080/api/attendance");
      testPromise.then(response => response.json())
      .then(readEntries, console.log);
    pleaseRunOnceFlag = true;
  }
  else {
    console.log("UseEffect duplicated!");
  }
  }, []);

  const columns = ["Date", "Time", "Attendees"];

function dbEventToLocal(dbEvent: any) {
  const dateObj = new Date(jsDate(dbEvent["date"]));
  const attendeeCount = dbEvent["ids"].length;
  return {
    "Date": dateObj.toLocaleDateString("es-pa"),
    "Time": dateObj.toLocaleTimeString("en-US"),
    "Attendees": attendeeCount,
  };
}


  function jsDate(dbDate: string) {
    return new Date(dbDate.replace(" ", "T").concat(".000Z"));
  }

  function dbDate(jsDate: Date) {
    // Final replace has regexp that replaces . followed by 3 digits followed by 'Z'
    return jsDate.toISOString().replace("T", " ").replace(/.\d{3}Z/g, "");
  }

  function urlDate(jsDate: Date) {
    return jsDate.toISOString().replace("T", "+").replace(/.\d{3}Z/g, "");
  }
  const saveSession = () => {
    console.log("Creating event with date: " + dbDate(startDate));
    const newEvent = {
      "date": dbDate(startDate),
      "ids": [],
    }
    fetch("http://127.0.0.1:8080/api/attendance", {
      method: "POST",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEvent, null, " "),
    });
    setTableData([...tableData, dbEventToLocal(newEvent)]);
    setLinkToggle(true);
  }

  const deleteSession = () => {
    let date = tableData[deleteRowIndex]["Date"];
    let time = tableData[deleteRowIndex]["Time"];
    fetch("http://127.0.0.1:8080/api/attendance", {
      method: "DELETE",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"id": bannerId}, null, " "),
    });

    setTableData(tableData.slice(0, deleteRowIndex).concat(tableData.slice(deleteRowIndex + 1, tableData.length)));
  }


  return (
    <div>
      <h1>Attendance</h1>
        <Modal
          modalTitle="Create New Attendance Session"
          modalBody={
            <>
              <DatePicker selected={startDate} showTimeSelect onChange={(date: any) => setStartDate(date)} />
              <br></br>
              {linkToggle ?
              <CopyText url={"http://127.0.0.1:8080/signin?date=".concat(urlDate(startDate))}/> :
              <></>
              }
              {/*
              <div id="qrcode" className="mb-2">
                <ImgDl/>
              </div>
              */}
            </>
          }
          saveButton="Done"
          onClickSave={saveSession}
          toggleText="Create Session"
          toggleClass="large-purple-button mb-4 float-left"
          modalId="newAttendance"
        />
      {(loadingGate &&  tableData.length > 0) ?
        <> <div className="mb-3">
            <Table
              setDeleteRowIndex={setDeleteRowIndex}
              columns={columns}
              tableData={tableData}
              colorCoded={false}
              EditTitle="Attendance Session"
              AreYouSureTitle="Are you sure you want to delete this attendance session?"
              SaveMember={saveSession}
              DeleteMember={deleteSession}
              editModalBody={<></>}
            />
          </div> </> 
        : <></>}
    </div>
  );
}