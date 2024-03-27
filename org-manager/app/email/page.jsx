"use client";

import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import Select from 'react-select';
import * as yup from "yup"

// type Inputs = {
//   subject: string;
//   message: string;
// }

// type Option = Record<string, any>;

// interface TypeaheadProps {
//   onChange?: (selected: Option[]) => void;
// }

export default function Email() {
  //test members only
  // TODO: integrate into SQL database
  const members = [
    {"Name": "Andrew Ruff", "Email": "aruff@gmail.com", "Banner ID": 111111111, "Role": "exec"},
    {"Name": "Julian Williams", "Email": "jwilliams@gmail.com", "Banner ID": 22222222, "Role": "member"},
    {"Name": "Justin Caringal", "Email": "jcaringal@gmail.com", "Banner ID": 333333333, "Role": "president"},
  ];

  //change this array based on intended recipients
  const [filteredMembers, setFilteredMembers] = useState([
    {"Name": "Julian Williams", "Email": "jwilliams@gmail.com", "Banner ID": 22222222, "Role": "member"},
    {"Name": "Justin Caringal", "Email": "jcaringal@gmail.com", "Banner ID": 333333333, "Role": "president"}
  ]);

    const schema = yup.object({
      subject: yup.string().required("Email subject required."),
      message: yup.string().required("Email message required."),
    }).required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => console.log(data)

//   // Example usage
// const handleEmailChange: TypeaheadProps['onChange'] = (selected: Option[]) => {
//   setEmails(selected);
// };

  // const handleEmailChange = (selectedOptions) => {
  //   setEmails(selectedOptions);
  // };
  
  // const handleEmailChange = (selectedOptions) => {
  //   setEmails(selectedOptions.map(option => option.label)); // Extract labels from selected options
  // };

  // const handleEmailChange = (selectedOptions) => {
  //   if (selectedOptions && selectedOptions.length > 0) {
  //     setEmails(selectedOptions.map(option => option.label)); // Extract labels from selected options
  //   } else {
  //     setEmails([]); // Clear emails if no options are selected
  //   }
  // };


  return (
    <>
      <h1>Send Emails</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <label>*To</label> */}
        <Select {...register("Title")}
          placeholder="*To"
          defaultValue={filteredMembers.map(member => ({ value: member.Name, label: member.Name }))}
          isMulti
          name="name"
          options={members.map(member => ({ value: member.Name, label: member.Name }))}
          className="pb-3 basic-multi-select"
          classNamePrefix="select"
        />

        {/* <label>*Email Subject</label> */}
        <input type="text" {...register("subject")} placeholder="*Email Subject"/>
        <p style={{color:'#F76262'}}>{errors.subject?.message}</p>

        {/* <label>*Email Message</label> */}
        <textarea {...register("message")} placeholder="*Email Message"/>
        <p style={{color:'#F76262'}}>{errors.message?.message}</p>

        <button type="submit" style={{float: 'right'}}>Send Email</button>
      </form>
    </>
  );
}