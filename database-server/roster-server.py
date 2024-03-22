#!/bin/python3

from bottle import Bottle, get, post, put, delete, request, abort
from bottle.ext import sqlalchemy
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base
from sqlalchemy_utils import database_exists, create_database, drop_database

base = declarative_base()
engine = create_engine("mysql://admin:admin@localhost/roster")
app = Bottle()
plugin = sqlalchemy.Plugin(engine, keyword='db')
app.install(plugin)


#Define the tables in the database
class members(base):
	__tablename__ = "members"
	id = Column(Integer, primary_key=True)
	email = Column(String(50))
	name = Column(String(50))


#If the roster database does not yet exist, create it now
if not database_exists(engine.url):
	create_database(engine.url)
	base.metadata.create_all(engine, base.metadata.tables.values(), checkfirst=True)


#Define access methods
@app.get("/api/members")
def get_members(db):
	table_data = db.query(members)
	results = []
	for x in table_data:
		results.append(x)
	return {"members" : results}

@app.post("/api/members")
def post_members(db):
	id = None
	email = None
	name = None
	try:
		id = request.json["id"]
		email = request.json["email"]
		name = request.name["name"]
	except:
		abort(400, "Invalid JSON")

	if type(id) != int:
		abort(400, "id is type int")
	if type(email) != str:
		abort(400, "email is type string")
	if type(name) != str:
		abort(400, "name is type string")

	if db.query(members).filter_by(id = id).all() != []:
		abort(409, "A row with this primary key already exists")

	new_row = test_table(id = id, email = email, name = name)
	db.add(new_row)
	db.commit()
	return get_members(db)

@app.put("/api/members")
def put_test_table(db):
	abort(405, "WIP")

@app.delete("/api/members")
def delete_test_table(db):
	id = None
	try:
		id = request.json["id"]
	except:
		abort(400, "Invalid JSON")

	if type(id) != int:
		abort(400, "id is type int")

	db.query(members).filter_by(id = id).delete()
	db.commit()
	return get_test_table(db)


app.run(host="0.0.0.0", port="8080")


drop_database(engine.url)
