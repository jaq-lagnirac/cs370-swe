'use client';

import React from 'react';
import RootLayout from './layout';
import type { Metadata } from "next";
import { useState, useEffect } from 'react';
import Modal from './components/modal';
import Table from './components/table';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";

interface FormData {
  name: string;
  email: string;
  bannerId: number;
  role: string;
}

export default function Roster() {
  const columns: string[] = ["Name", "Email", "Banner ID"];
  const members = [
    {"Name": "Andrew Ruff", "Email": "acr9932@truman.edu", "Banner ID": 102344322, "Role": "exec"},
    {"Name": "Julian Williams", "Email": "jww1111@truman.edu", "Banner ID": 103422344, "Role": "member"},
    {"Name": "Justin Caringal", "Email": "jac5566@truman.edu", "Banner ID": 1011113456, "Role": "president"},
    {"Name": "Akansha Negi", "Email": "an2713@truman.edu", "Banner ID": 1011234567, "Role": "exec"},
    {"Name": "Ruthie Halma", "Email": "ruthie@truman.edu", "Banner ID": 105464445, "Role": "member"},
    {"Name": "Kafi Rahman", "Email": "kir2311@truman.edu", "Banner ID": 102042342, "Role": "member"},
    {"Name": "Ting Cao", "Email": "tac3912@truman.edu", "Banner ID": 102342332, "Role": "member"},
  ];
  const [rosterMembers, setRosterMembers] = useState(members);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [bannerId, setBannerId] = useState(0o0000000);
  const [name, setName] = useState("");
  const [deleteRowIndex, setDeleteRowIndex] = useState(-1);

  const schema = yup.object({
    name: yup.string().required("Name required"),
    email: yup.string().email('Invalid email').required('Email required'),
    bannerId: yup.number().required("Banner ID required"),
    role: yup.string().required("Role required"),
  }).required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    // Update default values when role changes
    setValue("role", role);
  }, [role, setValue]);

  const onSubmit = (data: FormData) => {
    const jsonData = {
      name: data.name,
      email: data.email,
      bannerId: data.bannerId,
      role: data.role,
    };
    const jsonString = JSON.stringify(jsonData, null, 2);
    console.log("JSON Roster Member Data:", jsonString);
  };

  const roles = ["president", "exec", "member"];

  // useForm({
  //   defaultValues: {
  //     name: '',
  //     email: '',
  //     bannerId: 0o0000000,
  //     role: '',
  //   }
  // })
  
  // // set default value async
  // useForm({
  //   defaultValues: async () => fetch('/api-endpoint')
  // })

  const handleAddMember = () => {
    //only add if name, email, banner id, and role exist
    console.log("Submitting the following info: ");
    console.log("name: ", name);
    console.log("email: ", email);
    console.log("banner id: ", bannerId);
    console.log("role: ", role);

    const newMember = {
      "Name": name,
      "Email": email,
      "Banner ID": bannerId,
      "Role": role,
    };

    setRosterMembers(rosterMembers.concat(newMember));

    setName("");
    setEmail("");
    setBannerId(0o0000000);
    setRole(""); //this causes some issues

    {console.log("roster members", rosterMembers)}
  }

  const handleDeleteMember = () => {
    console.log("deleteRowIndex ", deleteRowIndex);
    setRosterMembers(rosterMembers.slice(0, deleteRowIndex).concat(rosterMembers.slice(deleteRowIndex + 1, rosterMembers.length)));
  };

  const handleEditMember = () => {

  }

  return (
    <>
      <h1 className="pb-0">Stargazers Roster Manager</h1>
        {/* <a className="nav-link dropdown-toggle filter" href="#" id="navbardrop" data-toggle="dropdown">
          Filter By
        </a>
        <div className="dropdown-menu">
          <a className="dropdown-item m-0" href="#">President</a>
          <a className="dropdown-item m-0" href="#">Exec</a>
          <a className="dropdown-item m-0" href="#">Members</a>
        </div> */}

        {/* <select {...register("role")} onChange={(e) => setRole(e.target.value)}>
          <option value="president">President</option>
          <option value="exec">Exec</option>
          <option value="member">Member</option>
        </select> */}

      <Table
        setDeleteRowIndex={setDeleteRowIndex}
        columns={columns}
        tableData={rosterMembers}
        colorCoded={true}
        DeleteMember={handleDeleteMember}
        EditTitle="Edit Member"
        editModalBody={
        <>
          <form className="member-form" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("name")} placeholder="*Member Name" value={name} onChange={(e) => setName(e.target.value)} />
            <p className="red-text">{errors.name?.message}</p>

            <input type="text" {...register("email")} placeholder="*Member Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <p className="red-text">{errors.email?.message}</p>

            <input type="number" {...register("bannerId")} placeholder="*Member Banner ID" value={bannerId} onChange={(e) => setBannerId(parseInt(e.target.value))} />
            <p className="red-text">{errors.bannerId?.message}</p>

            <select {...register("role", { required: true })} className="role-select" value={role} onChange={(e) => setRole(e.target.value)}>
              
              <option value="president">President</option>
              <option value="exec">Exec</option>
              <option value="member">Member</option>
            </select>
            <p className="red-text">{errors.role?.message}</p>
            <button className="large-purple-button" type="submit" style={{float: 'right'}} onClick={handleEditMember}>Save</button>
            <button className="delete-button me-2" onClick={handleDeleteMember} style={{float: 'right'}} data-toggle="modal" data-target="#basicModal">Delete</button>
          </form>
        </> }
      /> 

      <Modal
        modalTitle="Create New Member"
        modalBody={
          <>
            <form className="member-form" onSubmit={handleSubmit(onSubmit)}>
              <input type="text" {...register("name")} placeholder="*Member Name" value={name} onChange={(e) => setName(e.target.value)} />
              <p className="red-text">{errors.name?.message}</p>

              <input type="text" {...register("email")} placeholder="*Member Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <p className="red-text">{errors.email?.message}</p>

              <input type="number" {...register("bannerId")} placeholder="*Member Banner ID" value={bannerId} onChange={(e) => setBannerId(parseInt(e.target.value))} />
              <p className="red-text">{errors.bannerId?.message}</p>

              <select {...register("role", { required: true })} className="role-select" value={role} onChange={(e) => setRole(e.target.value)}>
                
                <option value="president">President</option>
                <option value="exec">Exec</option>
                <option value="member">Member</option>
              </select>
              <p className="red-text">{errors.role?.message}</p>
              <button className="purple-button" type="submit" style={{float: 'right'}} onClick={handleAddMember}>Save</button>
              <button type="button" className="btn btn-default" style={{float: 'right'}} data-dismiss="modal">Close</button>
            </form>
          </>
        }
        toggleText="Add Member"
        toggleClass="large-purple-button"
        modalId="createMemberModal"
      />
      {console.log("roster members", rosterMembers)}
    </>
  );
}