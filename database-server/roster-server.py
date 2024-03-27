#!/bin/python3

#Config variables
PORT = 8080
MAX_STRING_LENGTH = 100

from bottle import Bottle, get, post, put, delete, request, abort
from bottle.ext import sqlalchemy
from sqlalchemy import create_engine, Column, Integer, String
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
	name = Column(String(MAX_STRING_LENGTH))
	email = Column(String(MAX_STRING_LENGTH))

#If the roster database does not yet exist, create it now
if not database_exists(engine.url):
	create_database(engine.url)
	base.metadata.create_all(engine, base.metadata.tables.values(), checkfirst=True)

#Helper functions
def validate_content_type():
	if request.content_type != "application/json":
		abort(400, "content-type not equal to application/json")
	return

def read_json(names, types):
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
	table_data = db.query(members)
	results = []
	for x in table_data:
		results.append({ "id":x.id, "name":x.name, "email":x.email })
	return {"members" : results}

@app.post("/api/members")
def post_members(db):
	id, name, email = read_json(["id", "name", "email"], [int, str, str])
	if db.query(members).filter_by(id = id).all() != []:
		abort(409, f"A row with primary key {id} already exists. Use PUT to update a row")
	new_row = members(id = id, name = name, email = email)
	db.add(new_row)
	db.commit()
	return get_members(db)

@app.put("/api/members")
def put_members(db):
	id, name, email = read_json(["id", "name", "email"], [int, str, str])
	if db.query(members).filter_by(id = id).all() == []:
		abort(409, f"A row with primary key {id} does not exist. Use POST to add a new row")
	row = db.query(members).filter_by(id = id).first()
	row.name, row.email = name, email
	db.commit()
	return get_members(db)

@app.delete("/api/members")
def delete_members(db):
	id = read_json(["id"], [int])
	db.query(members).filter_by(id = id).delete()
	db.commit()
	return get_members(db)

app.run(host="0.0.0.0", port=PORT)