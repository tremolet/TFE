from flask import Flask
from flask import abort
from flask import make_response
from flask import url_for
from flask import Flask, jsonify, url_for, redirect, request,abort,make_response
from flask_pymongo import PyMongo
from flask_restful import Api, Resource
from flask.ext.httpauth import HTTPBasicAuth
from flask import Flask,flash,redirect,render_template
from flask.ext.mongoengine import MongoEngine
from flask.ext.mongoengine.wtf import model_form
from flask_wtf import Form
import get_log
app = Flask(__name__)
app.config["MONGO_DBNAME"] = "logApache"
APP_URL = "http://127.0.0.1:5000"
db=MongoEngine(app)

@app.route('/')
def getLogApache():
 logs = []
 filters = {}
 if request.args['user_id']:
     filters['user_id'] = request.args['userID']
 if request.args['from']:
     filters['timestamp__gte'] = req_args['from']
 if request.args['until']:
     filters['timestamp__lte'] = request.args['until']
 if request_args['request_categ']:
     filters['request__categ'] = request.args['request_categ']
 if request.args['timestamp']:
     filters['timestamp']=request.args['timestamp']
 if request.args['server']:
    filters['server']=request.args['server']
 if request.args['ip_user']:
    filters['ip_user']=request.args['ip_user']
 for log in logApache.objects(**filters):
    logs.append(log.to_dict())
 response={'success':True,'logs':logs}
 return flask.jsonify(**response)

if __name__ == '__main__':
    app.run(debug=True)
    api = Api(app)
