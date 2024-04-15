#!/bin/python3

#Config variables
PORT = 8080
STRING_LENGTH = 50
NOTE_LENGTH = 500
LOCAL_ONLY = False

from bottle import Bottle, get, post, put, delete, request, abort, template
from bottle.ext import sqlalchemy
from sqlalchemy import create_engine, Column, BigInteger, SmallInteger, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import declarative_base
from sqlalchemy_utils import database_exists, create_database
from send_email import send_email_from_json

base = declarative_base()
engine = create_engine("mysql://admin:admin@localhost/roster")
app = Bottle()
plugin = sqlalchemy.Plugin(engine, keyword='db')
app.install(plugin)

#Define the tables in the database
class members(base):
	__tablename__ = "members"
	id = Column(BigInteger(), primary_key=True)
	name = Column(String(STRING_LENGTH))
	email = Column(String(STRING_LENGTH))
	role = Column(SmallInteger())
	note = Column(String(NOTE_LENGTH))

class dates(base):
	__tablename__ = "dates"
	date = Column(DateTime(timezone=True), primary_key=True)

class attendance(base):
	__tablename__ = "attendance"
	date = Column(DateTime(timezone=True), primary_key=True)
	id = Column(BigInteger(), primary_key=True)

#If the roster database does not yet exist, create it now
if not database_exists(engine.url):
	create_database(engine.url)
	base.metadata.create_all(engine, base.metadata.tables.values(), checkfirst=True)

#Helper functions
def validate_content_type():
	"""
	A simple function that checks the content_type and aborts if it's incorrect.

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

	Example:
		id, name = read_json(["id", "name"], [int, str])

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
	Queries the dates/attendance tables and returns the data in JSON
	"""
	dates_data = db.query(dates)
	attendance_data = db.query(attendance)
	results = list()

	for i in dates_data:
		ids = list()
		for j in attendance_data.filter_by(date=i.date):
			ids.append(j.id)
		results.append({ "date":str(i.date), "ids":ids })

	return {"attendance" : results}

@app.post("/api/attendance")
def post_attendance(db):
	"""
	Adds a new date to the dates table.
	If no date is provided, the server will automatically use the current time.
	Returns by calling get_attendance
	"""
	date = None
	try:
		date = request.json["date"]
		date = read_json(["date"], [str])
	except:
		date = func.now()

	if db.query(dates).filter_by(date=date).all() != []:
		abort(409, f"DateTime {date} already exists")

	new_row = dates(date=date)
	db.add(new_row)
	db.commit()
	return get_attendance(db)

@app.put("/api/attendance")
def put_attendance(db):
	"""
	Add a new attendance record to the attendance table (ie an ID paired with a date)
	The date and id must already exist
	Returns by calling get_attendance
	"""
	date, id = read_json(["date", "id"], [str, int])

	if db.query(dates).filter_by(date=date).all() == []:
		abort(409, f"A row with primary key {date} does not exist. Use POST to add a new row")

	if db.query(members).filter_by(id=id).all() == []:
		abort(409, f"ID {id} does not exist in the members table")

	if db.query(attendance).filter_by(date=date, id=id).all() != []:
		abort(409, f"Attendance for ID {id} on {date} has already been recorded")

	new_row = attendance(date=date, id=id)
	db.add(new_row)
	db.commit()
	return get_attendance(db)

@app.delete("/api/attendance")
def delete_attendance(db):
	"""
	Remove a date and/or id from the dates/attendance tables
	The date type is passed in JSON as a string.

	If only an ID or date is provided, all rows associated with that ID or date will be deleted
	If both an ID and date are provided, only that one row that matches both will be deleted

	Returns the updated table
	"""
	date = id = None
	try:
		date = request.json["date"]
		date = read_json(["date"], [str])
	except:
		pass

	try:
		id = request.json["id"]
		id = read_json(["id"], [int])
	except:
		pass

	if date == None and id == None:
		abort(400, "Unable to parse date or id")

	dates_query = db.query(dates)
	attendance_query = db.query(attendance)

	if date == None:
		attendance_query.filter_by(id=id).delete()
	elif id == None:
		dates_query.filter_by(date=date).delete()
		attendance_query.filter_by(date=date).delete()
	else:
		attendance_query.filter_by(id=id, date=date).delete()

	db.commit()
	return get_attendance(db)

@app.post("/api/email")
def post_email(db):
	"""
	Calls Justin's send email function with the provided JSON data
	Pass the return value back to the user to indicate failure/success
	"""
	validate_content_type()
	with open(".tmp.json", "wb") as file:
		file.write(request.body.getbuffer())
	return str(send_email_from_json(".tmp.json"))

@app.get("/signin")
def get_signin(db):
	"""
	URL for attendance signin
	The signin date by default is the most recent meeting
	However, the date can be provided in the URL ?date=x
	When the HTML form is filled, the data is received by the POST method
	"""

	#Get the date from the URL, or the most recent one
	date = request.query.date or str(db.query(dates).all()[-1].date)

	#This should only happen if a date isn't provided AND no dates exist in the db
	if date == None:
		abort(400, "No dates exist yet!")

	#HTML for a basic form
	return template("signin", date=date, name="", error=None)

@app.post("/signin")
def post_signin(db):
	"""
	This function is called along side data from the signin form
	I don't expect anyone to call this function otherwise
	"""
	date = request.forms.get("date")
	name = request.forms.get("name")

	#Check that the provided name and date are valid
	if db.query(members).filter_by(name=name).all() == []:
		return template("signin", date=date, name=name, error="name")

	if db.query(dates).filter_by(date=date).all() == []:
		return template("signin", date=date, name=name, error="date")

	#Get the member's id based on the name provided
	#What to do about duplicate names?
	id = db.query(members).filter_by(name=name).first().id

	#Only sign them in if they weren't already
	if db.query(attendance).filter_by(date=date, id=id).all() == []:
		new_row = attendance(date=date, id=id)
		db.add(new_row)
		db.commit()

	return f"<p>Attendance recorded for {name} on {date}</p>"

@app.get("/signup")
def get_signup(db):
	"""
	URL for member signup
	When the HTML formed is filled, the data will be received by the POST method below
	"""
	return template("signup", error=None)

@app.post("/signup")
def post_signup(db):
	"""
	This function is called when the signup form is submitted
	Nobody else should call this function
	"""
	id = request.forms.get("id")
	name = request.forms.get("name")
	email = request.forms.get("email")
	role = 2 #Member role value
	note = request.forms.get("note")

	if db.query(members).filter_by(id=id).all() != []:
		return template("signup", error="id")

	new_row = members(id=id, name=name, email=email, role=role, note=note)
	db.add(new_row)
	db.commit()
	return f"<p>{name} is now a member!</p>"

app.run(host = "127.0.0.1" if LOCAL_ONLY else "0.0.0.0", port=PORT)
