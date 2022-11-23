#! /usr/bin/bash
#Group E
#CISC 3140
#Professor Katherine Chuang
#Due 11/23/2022

#checks OS of the device and returns as machine
unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=1;;                 #case for Linux
    Darwin*)    machine=2;;                 #case for Mac
    CYGWIN*)    machine=3;;                 #case for Windows
    MINGW*)     machine=3;;                 #case for Windows
    *)          machine=0
esac

#checks if PostgreSQL/Node/NPM is installed
postgresqlInstalled=false
nodeInstalled=false
npmInstalled=false

if ! command -v psql &> /dev/null
then
    echo "PostgreSQL not installed"
else
    postgresqlInstalled=true
fi

if ! command -v node &> /dev/null
then
    echo "Node could not be found"
else
    nodeInstalled=true
fi

if ! command -v npm &> /dev/null
then
    echo "NPM could not be found"
else
    npmInstalled=true
fi

#displays installation instructions for required dependencies
#(initially had the script install dependencies itself but concluded
#too intrusive)
case ${machine} in
    1)
        echo "Linux installation instructions for: " 
        if ! $postgresqlInstalled
        then
            echo "--------------------------------------------"
            echo "POSTGRESQL: "
            echo "Run 'sudo apt update' in terminal"
            echo "Run 'sudo apt postgresql postgresql-contrib' in terminal"
            echo "--------------------------------------------"
        fi

        if ! $nodeInstalled
        then
            echo "--------------------------------------------"
            echo "NODE: "
            echo "Run 'sudo apt install nodejs' in terminal"
            echo "--------------------------------------------"
        fi

        if ! $npmInstalled
        then
            echo "--------------------------------------------"
            echo "NPM: "
            echo "Run 'sudo apt install npm' in terminal"
            echo "--------------------------------------------"
        fi
    ;;
    2)
        echo "macOS installation instructions for: "
        if ! $postgresqlInstalled
        then
            echo "--------------------------------------------"
            echo "POSTGRESQL: "
            echo "Go to https://www.postgresql.org/download/"
            echo "Click on macOS install"
            echo "Drag dmg into application folder"
            echo "Go through the installation wizard"
            echo "Select installation location"
            echo "Set master password, port, and then install"
            echo "--------------------------------------------"
        fi

        if ! $nodeInstalled
        then
            echo "--------------------------------------------"
            echo "NODE: "            
            echo "Go to https://nodejs.org/en/download/"
            echo "Click on macOS installer"
            echo "Go through the installation wizard"
            echo "--------------------------------------------"
        fi

        if ! $npmInstalled
        then
            echo "--------------------------------------------"
            echo "NPM (NPM is usually installed when Node is installed): "
            echo "Input: 'npm install -g npm' in your terminal"
            echo "--------------------------------------------"
        fi
    ;;
    3)
        echo "Windows installation instructions for: "
        if ! $postgresqlInstalled
        then
            echo "--------------------------------------------"
            echo "POSTGRESQL: "
            echo "Go to https://www.postgresql.org/download/"
            echo "Click on Windows install"
            echo "Go through the installation wizard"
            echo "Select installation location"
            echo "Set master password, port, and then install"
            echo "--------------------------------------------"
        fi

        if ! $nodeInstalled
        then
            echo "--------------------------------------------"
            echo "NODE: "
            echo "Go to https://nodejs.org/en/download/"
            echo "Click on Windows installer"
            echo "Go through the installation wizard"
            echo "--------------------------------------------"
        fi

        if ! $npmInstalled
        then
            echo "--------------------------------------------"
            echo "NPM (NPM is usually installed when Node is installed): "
            echo "Input: 'npm install -g npm' in your terminal"
            echo "--------------------------------------------"
        fi
    ;;
    *)
        echo "UNABLE TO IDENTIFY OS"
        exit
    ;;
esac

#final check to see if all dependencies are installed
if ! $npmInstalled || ! $nodeInstalled || ! $postgresqlInstalled
then
    echo "Some dependencies are still missing, aborting script."
    exit
fi

username=""
password=""
#requests user's postgres name and master password
echo "Please enter the username you set for PostgreSQL (leave blank if you forgot/is default)"
read -r username
echo "Please enter the master password you set for PostgreSQL (leave blank if you forgot/is default)"
read -r password

if test -z "$username"
then
    username="postgres"
fi
if test -z "$password"
then
    password="postgres"
fi

#sets up database product
npm install

csvFile=""
#requests csv file to populate database 
echo "Please enter a proper CSV file to populate database with:"
echo "(in app.js file, make sure to assign correct argument for which database to be populated"
read csvFile
if [ "${csvFile##*.}" = "csv" ] 
then
    node app.js ${csvFile}
else
    echo "${csvFile%.*} is not a proper CSV file."
fi