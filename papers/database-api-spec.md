# Roster Database API Specifications
If the server is running locally, it can be accessed at `http://127.0.0.1:8080/`. The port number is configurable at the top of `roster-server.py`. If the server is running on another machine on the LAN, you will need to know that machine's IP address as well.

## Tables
At the moment, there is only one table called `members`. The table contains id (int), name (str), and email (str). The id column is the primary key, meaning that each row is required to have a unique id.

## Request Format
In all cases, the server sends and expects to recieve JSON data. The "content-type" header of all non-GET requests should be `application/json`.
The database tables can be interfaced with at `/api/TABLE_NAME` by sending various HTTP requests.

For example, the members table can be accessed via `http://127.0.0.1:8080/api/members`.

## GET Requests
A GET request is used to read the database.
No data is required to be sent. The server will simply return the table in JSON format:
`{"members": [{"id": 0, "name": "Julian Williams", "email": "jaw6642@truman.edu"}, {"id": 1, "name": "Justin Caringal", "email": "jac5566@truman.edu"}]}`

## POST Requests
A POST request is used to create a new row in the database.
POST requests can fail in multiple ways:
- The content-type must be application/json (400 Bad Request)
- The JSON must contain all expected variables with the appropriate datatypes (400 Bad Request)
- The new row's primary key must not conflict with an existing row (409 Conflict)

Example data sent along with a POST request:
`{"id": 2, "name": "Andrew Ruff", "email": "abr8115@truman.edu"}`

Assuming all is in order, the server with return the new state of the table in the same way as a GET request.

## PUT Requests
A PUT request is used to update an existing row in the database.
PUT requests can fail in similar ways to POST:
- The content-type must be application/json (400 Bad Request)
- The JSON must contain all expected variables with the appropriate datatypes (400 Bad Request)
- The row to be updated must already exist in the database (409 Conflict)

The data sent and recieved with a PUT request looks exactly the same as a POST request.

## DELETE Requests
A DELETE request is used to remove a row from the database.
DELETE requests can fail in the following ways:
- The content-type must be application/json (400 Bad Request)
- The primary key must be included in the request with the correct datatype, other fields are not required (400 Bad Request)

Note that a DELETE request on a row that doesn't exist has no effect.

Example data for a DELETE request:
`{"id": 1}`

The server will return the updated state of the table in the same way as a GET request.
