"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
// import jsonMemberData from './data.json';
import EmailButton from '../components/email-button';
import EmailForm from '../components/email-form';
import Select from 'react-select';
import * as yup from "yup";

export default function Email() {

  const [showExecForm, setShowExecForm] = useState(false);
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const execEmails = () => {
    setShowExecForm(!showExecForm);
  }
  const memberEmails = () => {
    setShowMemberForm(!showMemberForm);
  }
  
  const customEmails = () => {
    setShowCustomForm(!showCustomForm);
  }


  return (
    <>
      <h1 className="m-0">Send Emails</h1>
      <EmailButton buttonText={"To all executive board"} onClick={execEmails} darkMode={darkMode}/>
      {showExecForm ? (
        <EmailForm filterList={["exec", "president"]}/>
      ) : <></>}
      <EmailButton buttonText={"To all members"} onClick={memberEmails} darkMode={darkMode}/>
      {/*showMemberForm ? (
        <EmailForm filterList={["exec", "president", "member"]}/>
      ) : <></>*/}
      <EmailButton buttonText={"Custom..."} onClick={customEmails} darkMode={darkMode}/>
      {/*showCustomForm ? (
        <EmailForm filterList={[]}/>
      ) : <></>*/}
  </>
  );
}