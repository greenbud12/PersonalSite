# Author: Bailey Bakerson <bailey.bakerson@gmail.com>
from flask import current_app as app
from flask import render_template, redirect, request, session, url_for
from flask import jsonify, copy_current_request_context
#from flask_socketio import SocketIO, emit, join_room, leave_room, close_room, rooms, disconnect
from werkzeug.datastructures import ImmutableMultiDict
from pprint import pprint
import json
import random
import functools
import datetime
import base64
import requests
#from . import socketio



#######################################################################################
# OTHER
#######################################################################################

@app.route('/')
def root():
	return redirect('/home')

@app.route('/home')
def home():

	x = random.choice(['I created an idea of an application and deliverd it in 24 hours!','I "never" went to highschool.','I love playing games!'])
	return render_template('home.html', fun_fact = x)

@app.route('/projects')
def projects():	

	return render_template('projects.html')

@app.route('/calculator')
def calculator():	

	return render_template('calculator.html')


# @app.route("/static/<path:path>")
# def static_dir(path):
#     return send_from_directory("static", path)

@app.after_request
def add_header(r):
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    return r
