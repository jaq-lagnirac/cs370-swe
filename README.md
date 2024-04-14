# cs370-swe

A repository for the development of a project for CS 370 Software Engineering under the direction of Dr. Ruthie Halma.

## Purpose

We approached the [Stargazers Astronomy Club](https://stargazers.truman.edu/) with the proposition to develop a Roster Management System for use in their daily operations. We hope to accomplish this task with the following three main functionalities:

1) A downloadable software to help provide an overview over the executive and general body members
2) A functionality to provide an easy way to track, log, and view attendance of members.
3) Integrate an email function which can send messages to members in the database.

## Root Directory Breakdown

`papers/` - directory to store and display milestones and proposals in various forms.

`database-server/` - directory to store the backend server written using Python and the Bottle mini-framework.

`org-manager/` - directory to store and organize the frontend server written using Typescript, Javascript, and the React framework.

## Installation Guide

This guide is intended for installation onto WSL2 (Windows Subsystem for Linux 2) with the Ubuntu distro. Please keep in mind your variations on the commands and follow local installation guides for your requisite system.

### Installing WSL2

- Visit the Microsoft Store for [Ubuntu 22.04.3 LTS](https://apps.microsoft.com/detail/9pn20msr04dw).
- Alternatively, follow [this guide from Microsoft](https://learn.microsoft.com/en-us/windows/wsl/install) to install WSL2 and a default distribution (in this case [Ubuntu](https://ubuntu.com/)) from Windows Powershell or Windows Command Prompt.

### Getting a local copy of the Roster Management System

- Type the following command into your terminal window.
```
git clone https://github.com/jaq-lagnirac/cs370-swe.git
```
- Alternatively, visit the [Github repository](https://github.com/jaq-lagnirac/cs370-swe), click "Code", and download the ZIP file.

### Front-End (Page)

[Tauri](https://tauri.app/) is a Rust tool to run web applications locally by using operating system WebView APIs (similar to Electron). To install the front-end pages, do the following:

1) Install Rust and Cargo. 
    - Install the required packages on Ubuntu by running the following commands:
        ```
        sudo apt update

        sudo apt install libwebkit2gtk-4.0-dev \
        build-essential \
        curl \
        wget \
        file \
        libssl-dev \
        libgtk-3-dev \
        libayatana-appindicator3-dev \
        librsvg2-dev \
        nsis \
        lld \
        llvm
        ```
    - Download the Rust distribution and execute the file using the following command:
        ```
        curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
        ```
        You can use your system package manager to download and install Rust but this may result in errors. If the TLSv1.2 flag (`--tlsv1.2`) causes issues, you can attempt the installation by removing it.
2) Set up PNPM

### Back-End (Server)
