"use client";

import React from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { Typeahead } from 'react-bootstrap-typeahead';
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
  const [emails, setEmails] = useState(["this is a email"]);
  const sample = useState(["aj@gmail.com", "aaaa@gmail.com", "akjsdha@gmail.com"]);

    const schema = yup.object({
      subject: yup.string().required(),
      message: yup.string().required(),
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
      <h1>Email</h1>
      <p>This is the Email page.</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        
        {/* <Typeahead
          id="basic-typeahead-multiple"
          labelKey="label"
          multiple
          onChange={setEmails}
          // onChange={(emails: string[]) => setEmails(handleEmailChange)}
          // onChange={(selected) => {
          //    handleEmailChange({selected});
          // }}
          options={sample}
          placeholder="Choose emails"
          selected={emails}
        /> */}

        <input {...register("subject")} />
        <p>{errors.subject?.message}</p>

        <input {...register("message")} />
        <p>{errors.message?.message}</p>

        <input type="submit" />
      </form>
    </>
  );
}