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

  const schema = yup.object({
    name: yup.string().required("Name required"),
    email: yup.string().required("Email required"),
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

  }

  const handleEditMember = () => {

  }

  return (
    <>
      <h1 className="pb-0">Stargazers Roster Manager</h1>
        <a className="nav-link dropdown-toggle filter" href="#" id="navbardrop" data-toggle="dropdown">
          Filter By
        </a>
        <div className="dropdown-menu">
          <a className="dropdown-item m-0" href="#">President</a>
          <a className="dropdown-item m-0" href="#">Exec</a>
          <a className="dropdown-item m-0" href="#">Members</a>
        </div>
      <Table columns={columns} tableData={rosterMembers} colorCoded={true}/> 

      <button className="large-purple-button" data-toggle="modal" data-target="#createMemberModal" style={{float: 'right'}}>Add Member</button>
      <button className="secondary-button" data-toggle="modal" data-target="#editMemberModal" style={{float: 'right'}}>Edit Members</button>

      {/* Edit Member Modal */}
      <div className="modal fade" id="editMemberModal" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
          <div className="modal-header">
              <h4 className="modal-title main-modal-title" id="myModalLabel">Edit Member</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <img src="/xicon.svg" alt="Close"/>
              </button>
          </div>
          <div className="modal-body">
              <></>
          </div>
          <div className="modal-footer">
            <button className="delete-button" data-toggle="modal" data-target="#deleteMemberModal">Delete Member</button>
            <button className="large-purple-button">Save</button>
          </div>
        </div>
      </div>
      </div>
      {/* Are you sure */}
      <div className="modal fade" id="deleteMemberModal" data-bs-backdrop="static" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                  <div className="modal-header">
                      <h4 className="modal-title ays-modal-title" id="myModalLabel">Are you sure you want to delete this member?</h4>
                  </div>
                  <div className="modal-body d-flex justify-content-center">
                      <button className="large-purple-button me-2" onClick={handleDeleteMember}>Yes</button>
                      <button className="delete-button ms-2" data-dismiss="modal">No, take me back!</button>
                  </div>
              </div>
          </div>
      </div>

      {/*  Create member modal */}
      <div className="modal fade" id="createMemberModal" role="dialog" aria-labelledby="basicModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title main-modal-title" id="myModalLabel">Create New Member</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <img src="/xicon.svg" alt="Close"/>
                </button>
            </div>
            <div className="modal-body">
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
              </form>
            </div>
          </div>
        </div>
      </div>  

      {console.log("roster members", rosterMembers)}
        {/* <button className="large-purple-button" data-toggle="modal" data-target="#largeModal" style={{float: 'right'}}>Add member</button> */}
    </>
  );
}