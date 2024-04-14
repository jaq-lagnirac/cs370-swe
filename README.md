# cs370-swe

A repository for the development of a project for CS 370 Software Engineering under the direction of Dr. Ruthie Halma.

## Table of Contents

1) [Purpose](#purpose)
2) [Root Directory Breakdown](#root-directory-breakdown)
3) [Development Installation Guide](#development-installation-guide)
    - [Installing WSL2](#installing-wsl2)
    - [Getting a local copy of the Roster Management System](#getting-a-local-copy-of-the-roster-management-system)
    - [Update Ubuntu Package Manager](#update-ubuntu-package-manager)
    - [Front-End (Page)](#front-end-page)
        - [Install Rust and Cargo](#install-rust-and-cargo)
        - [Set up Node and PNPM](#set-up-node-and-pnpm)
        - [Set up Tauri](#set-up-tauri)
    - [Back-End (Server)](#back-end-server)
        - [Install MySQL](#install-mysql)
        - [Install Python](#install-python)

## Purpose

We approached the [Stargazers Astronomy Club](https://stargazers.truman.edu/) with the proposition to develop a Roster Management System for use in their daily operations. We hope to accomplish this task with the following three main functionalities:

1) A downloadable software to help provide an overview over the executive and general body members
2) A functionality to provide an easy way to track, log, and view attendance of members.
3) Integrate an email function which can send messages to members in the database.

## Root Directory Breakdown

`papers/` - directory to store and display milestones and proposals in various forms.

`database-server/` - directory to store the backend server written using Python and the Bottle mini-framework.

`org-manager/` - directory to store and organize the frontend server written using Typescript, Javascript, and the React framework.

## Development Installation Guide

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

### Update Ubuntu Package Manager
Start by making sure that your system is fully up-to-date before installing anything.

At the terminal, run the following command.
```
sudo apt update
sudo apt upgrade
```
You will have to enter your password here.

### Front-End (Page)

#### Install Rust and Cargo

[Tauri](https://tauri.app/) is a Rust tool to run web applications locally by using operating system WebView APIs (similar to Electron). To install the front-end pages, do the following:

1) Install the required packages on Ubuntu by running the following commands:
    ```
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
2) Download the Rust distribution and execute the file using the following command:
    ```
    curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
    ```
    You can use your system package manager to download and install Rust but this may result in errors. If the TLSv1.2 flag (`--tlsv1.2`) causes issues, you can attempt the installation by removing it.

#### Set up Node and PNPM

There is no supported normal way to install Node onto Ubuntu. You must use a Node manager or add the NodeSource repository to your package manager. Fast Node Manager (FNM) and Performant Node Package Manager (PNPM) is covered in detail here. PNPM is an alternative to the default
Node package manager that is faster and more storage-efficient. For more information about NodeSource, please [click here](https://github.com/nodesource/distributions).

1) Run the following command to run the FNM install script:
    ```
    curl -fsSL https://fnm.vercel.app/install | bash
    ```
2) ***(Optional)*** Configure FNM to automatically switch to the specified Node version when you change into a directory that contains a file specifying a certain Node version (otherwise you would need to manually change the version every time). To do so, run the following commands:
    ```
    sudo apt install nano
    nano ~/.bashrc
    ```
    (Alternatively, you can use your preferred text editor to open `~/.bashrc`)

    Copy-paste the following line into the end of the file and save.
    ```
    eval "$(fnm env --use-on-cd)"
    ```

3) Run the following commands to get the latest `node.js` long-term support version (at the time of writing):
    ```
    fnm install 20.11.1
    fnm use 20.11.1
    ```

4) Install PNPM using the following command:
    ```
    corepack enable pnpm
    ```

#### Set up Tauri

1) Install Tauri with Cargo:
    ```
    cargo install tauri-cli --locked
    ```

See [Tauri's documentation](https://tauri.app/v1/guides/getting-started/setup/next-js) for additional resources.

### Back-End (Server)

#### Install MySQL

Our database-of-choice was MySQL. Specifically, a popular fork of MySQL was implemented called MariaDB. To install MariaDB, enter the following commands:

1) `sudo apt install mariadb-server`
2) `sudo systemctl enable --now mariadb`
3) `sudo mysql_secure_installation`. Complete the installation process like this:
	- Enter the current password for root: (just press enter)
	- Switch to unix socket authentication: n
	- Change the root password?: n
	- Remove anonymous users?: n
	- Disallow root login remotely?: y
	- Remove test database and access to it?: y
	- Reload privilege tables now?: y
4) `sudo mysql`. This will take you into the MySQL database
5) Run this command in MySQL `grant all on *.* to 'admin' identified by 'admin' with grant option;`
6) Exit MySQL using `exit;`

#### Install Python
1) Make sure that you have python and its dependencies installed using this command:
	`sudo apt install python3 python3-pip build-essential pkg-config python3-dev default-libmysqlclient-dev`
2) Inside the `database-server` directory, run `pip install -r requirements.txt` to install required python packages
