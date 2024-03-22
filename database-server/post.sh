#!/bin/bash

if [[ -z $1 ]]; then
	echo "Missing name"
	exit 1
fi

if [[ -z $2 ]]; then
	echo "Missing JSON"
	exit 2
fi

curl -i -X POST -H "Content-Type: application/json" -d $2 http://127.0.0.1:8080/api/$1
echo ""
