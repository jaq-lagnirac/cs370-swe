#!/bin/python3

#Config variables
PORT = 8080
STRING_LENGTH = 50
NOTE_LENGTH = 500

from bottle import Bottle, get, post, put, delete, request, abort
from bottle.ext import sqlalchemy
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import declarative_base
from sqlalchemy_utils import database_exists, create_database

base = declarative_base()
engine = create_engine("mysql://admin:admin@localhost/roster")
app = Bottle()
plugin = sqlalchemy.Plugin(engine, keyword='db')
app.install(plugin)

#Define the tables in the database
class members(base):
	__tablename__ = "members"
	id = Column(Integer, primary_key=True)
	name = Column(String(STRING_LENGTH))
	email = Column(String(STRING_LENGTH))
	role = Column(Integer)
	note = Column(String(NOTE_LENGTH))

class attendance(base):
	__tablename__ = "attendance"
	date = Column(DateTime(timezone=True), server_default=func.now(), primary_key=True)

#If the roster database does not yet exist, create it now
if not database_exists(engine.url):
	create_database(engine.url)
	base.metadata.create_all(engine, base.metadata.tables.values(), checkfirst=True)

#Helper functions
def validate_content_type():
	"""
	A simple function that checks the content_type, and aborts if it's incorrect.

	Args: None
	Returns: void
	"""
	if request.content_type != "application/json":
		abort(400, "content-type not equal to application/json")
	return

def read_json(names, types):
	"""
	A function that automates reading from request.json.
	Provided variable names and expected datatypes,
	it will return the data or error as needed.

	Args:
		names (list): A list of variable names
		types (list): A list of datatypes corresponding to the variable names.
			These two lists should be the same length

	Returns:
		A tuple containing your variables in the same order as listed
	"""
	validate_content_type()
	ret = []
	for i in range(len(names)):
		x = None
		try:
			x = request.json[names[i]]
		except:
			abort(400, f"Unable to parse {names[i]}")

		if type(x) != types[i]:
			abort(400, f"Unexpected datatype for var {names[i]}")
		ret.append(x)

	return tuple(ret)

#Define access methods
@app.get("/api/members")
def get_members(db):
	"""
	Queries the members table and returns the data in a dict.
	Dicts are automatically converted to JSON by Bottle
	"""
	table_data = db.query(members)
	results = []
	for x in table_data:
		results.append({ "id":x.id, "name":x.name, "email":x.email, "role":x.role, "note":x.note })
	return {"members" : results}

@app.post("/api/members")
def post_members(db):
	"""
	Adds a new row to the members table.
	Another member with the same banner id cannot already exist in the system
	Returns the updated table by calling get_members
	"""
	id, name, email, role, note = read_json(["id", "name", "email", "role", "note"], [int, str, str, int, str])
	if db.query(members).filter_by(id = id).all() != []:
		abort(409, f"A row with primary key {id} already exists. Use PUT to update a row")
	new_row = members(id = id, name = name, email = email, role = role, note = note)
	db.add(new_row)
	db.commit()
	return get_members(db)

@app.put("/api/members")
def put_members(db):
	"""
	Update an existing row in the members table with new data.
	Returns the updated table by calling get_members
	"""
	id, name, email, role, note = read_json(["id", "name", "email", "role", "note"], [int, str, str, int, str])
	if db.query(members).filter_by(id = id).all() == []:
		abort(409, f"A row with primary key {id} does not exist. Use POST to add a new row")
	row = db.query(members).filter_by(id = id).first()
	row.name, row.email, row.role, row.note = name, email, role, note
	db.commit()
	return get_members(db)

@app.delete("/api/members")
def delete_members(db):
	"""
	Delete a row from the members table.
	Returns the updated table by calling get_members
	"""
	id = read_json(["id"], [int])
	db.query(members).filter_by(id = id).delete()
	db.commit()
	return get_members(db)


@app.get("/api/attendance")
def get_attendance(db):
	"""
	Queries the attendance table and returns the data in JSON
	"""
	table_data = db.query(attendance)
	results = []
	for x in table_data:
		results.append({ "date":str(x.date) })
	return {"attendance" : results}

@app.post("/api/attendance")
def post_attendance(db):
	"""
	Adds a new row to the attendance table.
	No data is needed for this POST request,
	the time stamp is calculated by the server itself.
	Returns the updated table by calling get_attendance
	"""
	new_row = attendance()
	db.add(new_row)
	db.commit()
	return get_attendance(db)

@app.delete("/api/attendance")
def delete_attendance(db):
	"""
	Remove an entry from the attendance table
	The date type is passed in JSON as a string.
	The string should be the same as what's returned by calling get_attendance
	Returns the updated table
	"""
	date = read_json(["date"], [str])
	db.query(attendance).filter_by(date = date).delete()
	db.commit()
	return get_attendance(db)



app.run(host="0.0.0.0", port=PORT)
