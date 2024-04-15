"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
// import jsonMemberData from './data.json';
import EmailButton from '../components/email-button';
import Select from 'react-select';
import * as yup from "yup";

export default function Email() {
  //test members only
  // TODO: integrate into SQL database
  const members = [
    {"Name": "Andrew Ruff", "Email": "acr9932@truman.edu", "Banner ID": 102344322, "Role": "exec"},
    {"Name": "Julian Williams", "Email": "jww1111@truman.edu", "Banner ID": 103422344, "Role": "president"},
    {"Name": "Justin Caringal", "Email": "jac5566@truman.edu", "Banner ID": 1011113456, "Role": "exec"},
    {"Name": "Akansha Negi", "Email": "an2713@truman.edu", "Banner ID": 1011234567, "Role": "exec"},
    {"Name": "Ruthie Halma", "Email": "ruthie@truman.edu", "Banner ID": 105464445, "Role": "member"},
    {"Name": "Kafi Rahman", "Email": "kir2311@truman.edu", "Banner ID": 102042342, "Role": "member"},
    {"Name": "Ting Cao", "Email": "tac3912@truman.edu", "Banner ID": 102342332, "Role": "member"},
  ];

  //change this array based on intended recipients
  const [recipients, setRecipients] = useState([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const schema = yup.object({
    recipients: yup.array().min(1, "At least one recipient required."),
    subject: yup.string().required("Email subject required."),
    body: yup.string().required("Email Body required."),
  }).required();

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

    reset();
  };

  const options = members.map(member => ({ value: member.Email, label: member.Name }));
  // const options = jsonMemberData.map(member => ({ value: member.Name, label: member.label }));
  const execMembers = members
  .filter(member => member.Role === "exec" || member.Role === "president")
  .map(member => ({ value: member.Email, label: member.Name }));
  const customMembers = [];

  const execEmails = () => {
    setRecipients(execMembers);
    setShowForm(!showForm);
    setShowForm(true);
  }

  const memberEmails = () => {
    setRecipients(options);
    setShowForm(!showForm);
    setShowForm(true);
  }
  
  const customEmails = () => {
    setRecipients(customMembers);
    setShowForm(!showForm);
    setShowForm(true);
  }

  const handleChange = (selectedOptions) => {
    const selected = selectedOptions.map(option => ({
      value: option.value,
      label: option.label
    }));
    setRecipients(selected);
  };

  const handleSendEmail = () => {
    console.log("Submitting the following info: ");
    console.log("recipients: ", recipients);
    console.log("subject: ", subject);
    console.log("body: ", body);
    //TODO: add modal or something here that says email sent, refresh to blank email page
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

          <button className="purple-button" type="submit" style={{float: 'right'}} onClick={handleSendEmail} data-toggle="modal" data-target="#confirmEmailSentModal">Send Email</button>

          {/* Confirmation Email Sent Modal */}
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

        </form>
      ) : <></>}
    </>
  );
}