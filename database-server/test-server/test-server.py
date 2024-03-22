#!/bin/python3

from bottle import Bottle, get, post, put, delete, request, abort
from bottle.ext import sqlalchemy
from sqlalchemy import create_engine, Column, Integer
from sqlalchemy.orm import declarative_base
from sqlalchemy_utils import database_exists, create_database, drop_database

base = declarative_base()
engine = create_engine("mysql://admin:admin@localhost/test_roster")
app = Bottle()
plugin = sqlalchemy.Plugin(engine, keyword='db')
app.install(plugin)


#Define the tables in the database
class test_table(base):
	__tablename__ = "test_table"
	test_column = Column(Integer, primary_key=True)


#If the roster database does not yet exist, create it now
if not database_exists(engine.url):
	create_database(engine.url)
	base.metadata.create_all(engine, base.metadata.tables.values(), checkfirst=True)


#Define access methods
@app.get("/")
def get_test_table(db):
	test_table_data = db.query(test_table)
	results = []
	for x in test_table_data:
		results.append(x.test_column)
	return {"test_column" : results}

@app.post("/")
def post_test_table(db):
	value = None
	try:
		value = request.json["value"]
	except:
		abort(400, "Invalid JSON")

	if type(value) != type(1):
		abort(400, "value is type int")

	if db.query(test_table).filter_by(test_column = value).all() != []:
		abort(409, "A row with this primary key already exists")

	new_row = test_table(test_column = value)
	db.add(new_row)
	db.commit()
	return get_test_table(db)

@app.put("/")
def put_test_table(db):
	abort(405, "Use POST with the test server. There is nothing to update.")

@app.delete("/")
def delete_test_table(db):
	value = None
	try:
		value = request.json["value"]
	except:
		abort(400, "Invalid JSON")

	if type(value) != type(1):
		abort(400, "value is type int")

	db.query(test_table).filter_by(test_column = value).delete()
	db.commit()
	return get_test_table(db)


app.run(host="0.0.0.0", port="8080")


#For testing purposes, delete the database when the server closes
#Obviously we don't want this in the end!
drop_database(engine.url)
