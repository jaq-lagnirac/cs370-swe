# cs370-swe

A repository for the development of a project for CS370 Software Engineering under the direction of Dr. Ruthie Halma of Truman State University.

<p align="center">
    <img src="papers/images/stargazers_icon.png" width="150" alt="Stargazers Icon">
</p>

### Credits

Developed by [Justin Caringal](https://github.com/jaq-lagnirac), [Akansha Negi](https://github.com/negiakansha), [Andrew Ruff](https://github.com/abr8115), and [Julian Williams](https://github.com/Eidolon2003).

## Table of Contents

1) [Synopsis](#cs370-swe)
2) [Credits](#credits)
3) [Table of Contents](https://www.youtube.com/watch?v=uHgt8giw1LY)
4) [Purpose](#purpose)
5) [Root Directory Breakdown](#root-directory-breakdown)
6) [Development Installation Guide](#development-installation-guide)
    - [Installing WSL2](#installing-wsl2)
    - [Getting a local copy of the Roster Management System](#getting-a-local-copy-of-the-roster-management-system)
    - [Update Ubuntu Package Manager](#update-ubuntu-package-manager)
    - [Front-End (Page)](#front-end-page)
        - [Install Rust and Cargo](#install-rust-and-cargo)
        - [Set up Node and PNPM](#set-up-node-and-pnpm)
        - [Set up Tauri](#set-up-tauri)
        - [Enable Windows Compilation](#enable-windows-compilation)
    - [Back-End (Server)](#back-end-server)
        - [Install MySQL](#install-mysql)
        - [Install Python 3.xx](#install-python-3xx)
7) [Thank you!](#thank-you)

## Purpose

We approached the [Stargazers Astronomy Club](https://stargazers.truman.edu/) with the proposition to develop a Roster Management System for use in their daily operations. We hope to accomplish this task with the following three main functionalities:

1) A downloadable software to help provide an overview over the executive and general body members.
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

It is assumed that since you are accessing this you are at least familiar with [Git](https://git-scm.com/) and [Github](https://github.com/). If you require assistance with how to set up Git for WSL2, please follow [this tutorial](https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-git) as a reference.

You can access the code for this repository in one of two main ways:

- Type the following command into your terminal window:
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

[Tauri](https://tauri.app/) is a Rust tool to run web applications locally by using operating system WebView APIs (similar to Electron). Cargo is the Rust package manager. To install the front-end pages, do the following:

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

    ***Note:*** Rust is still accepting pull requests, so if you are running on an older version of Rust and Rust was installed using `rustup`, please execute the following command to update your Rust installation:
    ```
    rustup update
    ```

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

    Copy and paste the following line at the ***end of the file*** and save.
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
5) After downloading a local version of the [Github repository](https://github.com/jaq-lagnirac/cs370-swe), navigate to the directory `org-manager` and run the following command to install the required Node packages and dependencies using the PNPM package manager:
    ```
    pnpm install
    ```

#### Set up Tauri

1) Install Tauri with Cargo:
    ```
    cargo install tauri-cli --locked
    ```

See [Tauri's documentation](https://tauri.app/v1/guides/getting-started/setup/next-js) for additional resources.

#### Enable Windows Compilation

Compilation of the code is system-specific. As we are developing in a Linux environment and a majority of our projected users utilize Windows, the following is a guide on how to compile for Windows in a Linux environment.

1) Enable targeting Windows with Rust with the following command:
    ```
    rustup target add x86_64-pc-windows-msvc
    ```

2) Run the following command to download Windows-related libraries:
    ```
    cargo install cargo-xwin
    ```

3) Run the following command to make the libraries available:
    ```
    xwin splat --output ~/.xwin
    ```
    If this does not work, you need to add the installed Cargo directory to the `PATH`. This can be done by executing the following commands:
    ```
    sudo apt install nano
    nano ~/.bash_profile
    ```
    (Alternatively, you can use your preferred text editor to open `~/.bash_profile`)

    Copy and paste the following line on a ***newline in the file***, replacing `my_user` with your username.
    ```
    export PATH="${PATH}:/home/my_user/bin"
    ``` 
    Exit `~/.bash_profile`, then run the file by executing the following command:
    ```
    source ~/.bash_profile
    ```

4) After downloading a local version of the [Github repository](https://github.com/jaq-lagnirac/cs370-swe), navigate to the directory `org-manager` and create a file named `config.toml` with `nano` or your preferred text editor. Copy and paste the following lines:
    ```
    [target.x86\_64-pc-windows-msvc]
    linker = "lld"
    rustflags = [
        "-Lnative=/home/username/.xwin/crt/lib/x86\_64",
        "-Lnative=/home/username/.xwin/sdk/lib/um/x86\_64",
        "-Lnative=/home/username/.xwin/sdk/lib/ucrt/x86_64"
    ]
    ```
    Don't forget to switch the `username` to your specific username.

5) Navigate to `org-manager/src-tauri`. Enter `tauri.conf.json` using your preferred text editor and find the `identifier` key under the `tauri` key and switch it to a unique string.

6) To compile an application targeting Windows, run the following command:
    ```
    cargo tauri build --runner cargo-xwin --target x86_64-pc-windows-msvc
    ```
    ***Note:*** An error was occured during testing of this feature. Please refer to [Install Rust and Cargo](#install-rust-and-cargo) and the [following bug report](https://github.com/tauri-apps/tauri/issues/7816) in order to ensure that you are correctly able to compile for Windows. In short, run the following command to ensure a successful compilation:
    ```
    rustup update
    ```

### Back-End (Server)

#### Install MySQL

Our database-of-choice was [MySQL](https://www.mysql.com/). Specifically, a popular fork of MySQL was implemented called [MariaDB](https://mariadb.org/). To install MariaDB, enter the following commands:

1) Install MariaDB:
    ```
    sudo apt install mariadb-server
    ```
2) Run Maria DB and configure it to automatically run at start-up:
    ```
    sudo systemctl enable --now mariadb
    ```
3) Run the MySQL installer with the following command:
    ```
    sudo mysql_secure_installation
    ```
    Complete the installation process by answering the following questions as they appear:
	- Enter the current password for root: `[Press ENTER to skip]`
	- Switch to unix socket authentication? `n`
	- Change the root password? `n`
	- Remove anonymous users? `n`
	- Disallow root login remotely? `y`
	- Remove test database and access to it? `y`
	- Reload privilege tables now? `y`
4) Enter the MySQL database with the following command:
    ```
    sudo mysql
    ```
5) Run the following command within MySQL to create an administrator:
    ```
    grant all on *.* to 'admin' identified by 'admin' with grant option;
    ```
6) Exit MySQL using the following:
    ```
    exit;
    ```

#### Install Python 3.xx

[Python](https://www.python.org/) is a high-level and general-purpose language useful in many areas. Over its lifetime it has a variety of packages and libraries which greatly aid in the development process. The main package manager used with Python is [PIP](https://pypi.org/project/pip/).

1) Install Python 3.xx and its dependencies with the following command:
	```
    sudo apt install python3 \
        python3-pip \
        build-essential \
        pkg-config \
        python3-dev \
        default-libmysqlclient-dev
    ```
2) Python offers lightweight "virtual environments" which allow projects to have independent and isolated packages and dependencies. Create a Python virtual environment with the following commands:
    ```
    sudo apt install python3-venv
    python3 -m venv .venv
    ```

    Activate the virtual environment by entering the following:
    ```
    source .venv/bin/activate
    ```
    ***Note:*** To exit the virtual environment and return to your base Python, type the following:
    ```
    deactivate
    ```

3) After downloading a local version of the [Github repository](https://github.com/jaq-lagnirac/cs370-swe), navigate to the directory `database-server` and run the following command to install the required Python packages and dependencies into your virtual environment using the PIP package manager:
    ```
    pip install -r requirements.txt
    ```

## Thank you!

Thank you for reading through, and we hope that you find use in this tool!

<p align="center">
    <img src="papers/images/standup1.jpg" width="450" alt="First Standup">
</p>