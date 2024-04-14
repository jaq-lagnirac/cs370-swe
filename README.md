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

### Back-End (Server)
#### Update
Start by making sure that your system is fully up-to-date before installing anything.

At the terminal, run the command `sudo apt update; sudo apt upgrade`. You will have to enter your password here.

#### MySQL
To install MariaDB, do the following:
1. `sudo apt install mariadb-server`
2. `sudo systemctl enable --now mariadb`
3. `sudo mysql_secure_installation`. Complete the installation process like this:
	- Enter the current password for root: (just press enter)
	- Switch to unix socket authentication: n
	- Change the root password?: n
	- Remove anonymous users?: n
	- Disallow root login remotely?: y
	- Remove test database and access to it?: y
	- Reload privilege tables now?: y
4. `sudo mysql`. This will take you into the MySQL database
5. Run this command in MySQL `grant all on *.* to 'admin' identified by 'admin' with grant option;`
6. Exit MySQL using `exit;`

#### Python
1. Make sure that you have python and its dependencies installed using this command:
	`sudo apt install python3 python3-pip build-essential pkg-config python3-dev default-libmysqlclient-dev`
2. Inside the `database-server` directory, run `pip install -r requirements.txt` to install required python packages
