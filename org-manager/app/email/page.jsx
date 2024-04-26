"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ControlledModal from '../components/controlled-modal';
// import jsonMemberData from './data.json';
import EmailButton from '../components/email-button';
import Select from 'react-select';
import * as yup from "yup";

export default function Email() {
  //change this array based on intended recipients
  const [recipients, setRecipients] = useState([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [members, setMembers] = useState([]);
  const [showSent, setShowSent] = useState(false);
  let pleaseRunOnceFlag = false;
  const SERVER_URL = "http://sand.truman.edu:41703";

  const schema = yup.object({
    recipients: yup.array().of(yup.object()).min(1, "At least one recipient required."),
    subject: yup.string().required("Email subject required."),
    body: yup.string().required("Email Body required."),
  }).required();

  function sendRequest(url) {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      recipients: recipients
    }
  })

  useEffect(() => {
    // Update default values when recipients change
    setValue("recipients", recipients);
  }, [recipients, setValue]);

  const onSubmit = (data) => {
    const jsonData = {
      recipients: data.recipients ? data.recipients.map(recipient => recipient.value) : [],
      subject: data.subject,
      body: data.body
    };
    const jsonString = JSON.stringify(jsonData, null, 2);
    console.log("JSON Data:", jsonString);

    handleSendEmail();
  };

  function roleIntToText(roleInt) {
    let role = 'Member';
    switch (roleInt) {
      case 0:
        role = 'President';
        break;
      case 1:
        role = 'Exec';
        break;
      case 2:
        role = 'Member';
        break;
      default:
        // Duplicate with member condition, but makes it easy to change if necessary
        console.log("Reached roleIntToText default state!");
        role = 'Member';
        break;
    }
    return role;
  }
 

 // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
  function uniqBy(a, key) {
      var seen = {};
      return a.filter(function(item) {
          var k = key(item);
          return seen.hasOwnProperty(k) ? false : (seen[k] = true);
      })
  }
  const readMembers = (newMembers) => {
    console.log("Reading members, response body is: " + JSON.stringify(newMembers));
    let tempArray = members;
    for (let i = 0; i < newMembers["members"].length; i++) {
      let tempMember = dbMemberToLocal(newMembers["members"][i]);
      console.log("Adding member: " + newMembers["members"][i]);
      tempArray.push(tempMember);
    }
    setMembers(uniqBy(tempArray, JSON.stringify));
    console.log(members);
  }

  function dbMemberToLocal(dbMember) {
    return {
        "Name": dbMember["name"],
        "Email": dbMember["email"],
        "Banner ID": dbMember["id"],
        "Role": roleIntToText(dbMember["role"])
      };
  }

  useEffect(() => {
  if (!pleaseRunOnceFlag) {
    const testPromise = sendRequest(SERVER_URL + "/api/members");
    testPromise.then(response => response.json())
    .then(readMembers, console.log);
    // Update default values when role changes
    // setValue("role", role);
    pleaseRunOnceFlag = true;
  }
  }, []);

  const options = members.map(member => ({ value: member.Email, label: member.Name }));
  // const options = jsonMemberData.map(member => ({ value: member.Name, label: member.label }));
  const execMembers = members
  .filter(member => member.Role === "Exec" || member.Role === "President")
  .map(member => ({ value: member.Email, label: member.Name }));
  const customMembers = [];

  const execEmails = () => {
    setRecipients(execMembers);
    setShowForm(!showForm);
  }

  const memberEmails = () => {
    setRecipients(options);
    setShowForm(!showForm);
  }
  
  const customEmails = () => {
    setRecipients(customMembers);
    setShowForm(!showForm);
  }

  const handleChange = (selectedOptions) => {
    const selected = selectedOptions.map(option => ({
      value: option.value,
      label: option.label
    }));
    setRecipients(selected);
  };

  const handleSendEmail = () => {
    let recipientArray = [];
    for (let i = 0; i < recipients.length; i++) {
      recipientArray.push(recipients[i]["value"]);
    }
    console.log("Submitting the following info: ");
    console.log("recipients: ", recipientArray);
    console.log("subject: ", subject);
    console.log("body: ", body);

    let email = {
      "recipients": recipientArray,
      "subject": subject,
      "body": body,
    };
    fetch(SERVER_URL + "/api/email", {
      method: "POST",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(email, null, " "),
    });

    reset();
  }

  return (
    <>
      <h1 className="m-0">Send Emails</h1>
      <EmailButton buttonText={"To all executive board"} onClick={execEmails} darkMode={darkMode}/>
      <EmailButton buttonText={"To all members"} onClick={memberEmails} darkMode={darkMode}/>
      <EmailButton buttonText={"Custom..."} onClick={customEmails} darkMode={darkMode}/>

      {showForm ? (
        <form className="email-form" onSubmit={handleSubmit(onSubmit)}>
          {/* <label>*To</label> */}
          <Select {...register("recipients")}
            placeholder="*Member Role"
            defaultValue={recipients}
            isMulti
            name="recipients"
            options={options}
            className="basic-multi-select mt-4"
            classNamePrefix="select"
            onChange={handleChange}
          />
          <p className="red-text">{errors.recipients?.message}</p>

          {/* <label>*Email Subject</label> */}
          <input className="email-input" type="text" {...register("subject")} placeholder="*Email Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
          <p className="red-text">{errors.subject?.message}</p>

          {/* <label>*Email Body</label> */}
          <textarea className="email-input"  {...register("body")} placeholder="*Email Body" value={body} onChange={(e) => setBody(e.target.value)} />
          <p className="red-text">{errors.body?.message}</p>

          <button className="purple-button" type="submit" style={{float: 'right'}} onClick={() => {setShowSent(true)}}>Send Email</button>

          {/* Email Send Confirmation Modal */}
          <ControlledModal
            modalTitle="Email Sent!"
            showClose={true}
            closeText="Okay"
            showDelete={false}
            showSave={false}
            showConfirm={false}
            showButton={false}
            show={showSent}
            setShow={setShowSent}
          />

          {/* Confirmation Email Sent Modal 
          <div className="modal fade" id="confirmEmailSentModal" data-bs-backdrop="static" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header mt-3">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <img src="/xicon.svg" alt="Close"/>
                      </button>
                    </div>
                    <div className="modal-body pb-0">
                      <h4 className="modal-title confirmation-modal-title" style={{float: 'center'}} id="myModalLabel">Your email has been sent!</h4>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-default" style={{float: 'right'}} data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
          </div>
          */}

        </form>
      ) : <></>}
    </>
  );
}