#!/bin/python3

from bottle import Bottle, get, post, delete, request
from bottle.ext import sqlalchemy
from sqlalchemy import create_engine, Column, Integer
from sqlalchemy.orm import declarative_base
from sqlalchemy_utils import database_exists, create_database, drop_database

base = declarative_base()
engine = create_engine("mysql://admin:admin@localhost/roster")
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
	return {"test_table" : results}

@app.post("/")
def post_test_table(db):
	value = int(request.json["value"])
	new_row = test_table(test_column = value)
	db.add(new_row)
	db.commit()
	return get_test_table(db)

@app.delete("/")
def delete_test_table(db):
	value = int(request.json["value"])
	db.query(test_table).filter_by(test_column = value).delete()
	db.commit()
	return get_test_table(db)


app.run(host="0.0.0.0", port="8080")


#For testing purposes, delete the database when the server closes
#Obviously we don't want this in the end!
drop_database(engine.url)
