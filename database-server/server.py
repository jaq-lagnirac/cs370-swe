#!/bin/python3

from bottle import Bottle
from bottle.ext import sqlalchemy
from sqlalchemy import create_engine, Column, Integer
from sqlalchemy.orm import declarative_base

base = declarative_base()
engine = create_engine("mysql://admin:admin@localhost/test")

app = Bottle()
plugin = sqlalchemy.Plugin(engine, keyword='db')
app.install(plugin)


#This class represents the table MyTable in the database
class MyTable(base):
	__tablename__ = "MyTable"
	MyColumn = Column(Integer, primary_key=True)


@app.get("/")
def show(db):
	table_data = db.query(MyTable)

	results = []
	for x in table_data:
		results.append(x.MyColumn)

	return {"MyTable" : results}


#This will eventually be a POST request
@app.get("/add/<val>")
def add(val, db):
	table_row = MyTable(MyColumn=int(val))
	db.add(table_row)
	db.commit()

	return f"Added {val}"


#This will eventually be a DELETE request
@app.get("/delete/<val>")
def remove(val, db):
	db.query(MyTable).filter_by(MyColumn=int(val)).delete()
	db.commit()

	return f"Deleted {val}"


app.run(host="0.0.0.0", port="8080", debug=True, reloader=True)
