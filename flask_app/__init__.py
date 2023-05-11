# Author: Bailey Bakerson <bailey.bakerson@gmail.com>

#--------------------------------------------------
# Import Requirements
#--------------------------------------------------
import os
from flask import Flask
#from flask_socketio import SocketIO
from flask_failsafe import failsafe

#socketio = SocketIO()

#--------------------------------------------------
# Create a Failsafe Web Application
#--------------------------------------------------
@failsafe
def create_app(debug=False):
	app = Flask(__name__)

	# This will prevent issues with cached static files
	app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
	app.debug = debug
	app.secret_key = 'AKWNF1231082fksejfOSEHFOISEHF24142124124124124iesfhsoijsopdjf'
	# ----------------------------------------------

	#socketio.init_app(app)

	with app.app_context():
		from . import routes
		return app
