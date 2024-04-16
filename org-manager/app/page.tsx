'use client';

import React from 'react';
import RootLayout from './layout';
import type { Metadata } from "next";
import { useState, useEffect } from 'react';
import Modal from './components/modal';
import Table from './components/table';
import Select from 'react-select';
// import useSWR from 'swr';
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
  const [rosterMembers, setRosterMembers] = useState<any>([]);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [bannerId, setBannerId] = useState(0o0000000);
  const [name, setName] = useState("");
  const [loadingGate, setLoadingGate] = useState(false);
  let pleaseRunOnceFlag = false;
  
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
  function roleIntToText(roleInt: number) {
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

  function roleTextToInt(roleText: string) {
    let role = 2;
    switch (roleText) {
      case 'President':
       role = 0;
        break;
      case 'president':
       role = 0;
        break;
      case 'Exec':
        role = 1;
        break;
      case 'exec':
        role = 1;
        break;
      case 'Member':
        role = 2;
        break;
      case 'member':
        role = 2;
        break;
      default:
        // Duplicate with member condition, but makes it easy to change if necessary
        console.log("Reached roleTextToInt default state!");
        role = 2;
        break;
    }
    return role;
  }
  // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
  function uniqBy(a: any, key: any) {
      var seen: any = {};
      return a.filter(function(item: any) {
          var k = key(item);
          return seen.hasOwnProperty(k) ? false : (seen[k] = true);
      })
  }
  const readMembers = (newMembers: any) => {
    console.log("Reading members, response body is: " + JSON.stringify(newMembers));
    let tempArray = rosterMembers;
    for (let i = 0; i < newMembers["members"].length; i++) {
      let tempMember = dbMemberToLocal(newMembers["members"][i]);
      console.log("Adding member: " + newMembers["members"][i]);
      tempArray.push(tempMember);
    }
    setRosterMembers(uniqBy(tempArray, JSON.stringify));
    console.log(rosterMembers);
    setLoadingGate(true);
  }

  useEffect(() => {
  if (!pleaseRunOnceFlag) {
    const testPromise = sendRequest("http://0.0.0.0:8080/api/members");
    testPromise.then(response => response.json())
    .then(readMembers, console.log);
    // Update default values when role changes
    setValue("role", role);
    pleaseRunOnceFlag = true;
  }
  }, []);


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

  function dbMemberToLocal(dbMember: any) {
    return {
        "Name": dbMember["name"],
        "Email": dbMember["email"],
        "Banner ID": dbMember["id"],
        "Role": roleIntToText(dbMember["role"])
      };
  }

  const handleAddMember = () => {
    //only add if name, email, banner id, and role exist
    console.log("Submitting the following info: ");
    console.log("name: ", name);
    console.log("email: ", email);
    console.log("banner id: ", bannerId);
    console.log("role: ", role);

    const newMember = {
      "id": bannerId,
      "name": name,
      "email": email,
      "role": roleTextToInt(role),
      "note": "",
    };
    fetch("http://0.0.0.0:8080/api/members", {
      method: "POST",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMember, null, " "),
    });

    console.log(JSON.stringify(newMember));

    setRosterMembers(rosterMembers.concat(dbMemberToLocal(newMember)));

    /*
    setName("");
    setEmail("");
    setBannerId(0o0000000);
    setRole(""); //this causes some issues
    {console.log("roster members", rosterMembers)}
    */
  }

  const handleDeleteMember = () => {
    console.log("Deleting member: " + bannerId);
    /*
    fetch("http://0.0.0.0:8080/api/members", {
      method: "DELETE",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({bannerId}, null, " "),
    });
    */

  }

  const handleEditMember = () => {
    // Make sure the ID matches an existing member
    const newMember = {
      "id": bannerId,
      "name": name,
      "email": email,
      "role": roleTextToInt(role),
      "note": "",
    };
    fetch("http://0.0.0.0:8080/api/members", {
      method: "PUT",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMember, null, " "),
    });
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

      {loadingGate ?
        <Table
        columns={columns}
        tableData={rosterMembers}
        colorCoded={true}
        EditTitle="Edit Member"
        AreYouSureTitle="Are you sure you want to delete this member?"
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
        :
        <></>
      }

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
    </>
  );
}