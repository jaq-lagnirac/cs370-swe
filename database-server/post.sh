#!/bin/bash

if [[ -z "$1" ]]; then
	echo "Missing parameter"
	exit 1
fi

curl -i -X POST -H "Content-Type: application/json" -d "{\"value\": $1}" http://127.0.0.1:8080/
echo ""
