#!/bin/bash

if [[ -z $1 ]]
then
	echo "Missing parameter"
	exit 1
fi

curl -i -X GET http://127.0.0.1:8080/api/$1
echo ""
