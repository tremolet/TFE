from flask import Flask
from flask import abort
from flask import make_response
from flask import url_for
from flask import Flask, jsonify, url_for, redirect, request,abort,make_response
from flask_pymongo import PyMongo
from flask_restful import Api, Resource
from flask.ext.httpauth import HTTPBasicAuth
from falsk import Flask,flash,redirect,render_template
from flask.ext.mongoengine import MongoEngine
from flask.ext.mongoengine.wtf import model_form
from flask_wtf import Form

$ flask/bin/pip install flask-httpauth ->for the authentification

app = Flask(__name__)
app=Flask(__name__)
app.config['SECRET_KEY']='secret'
app.config['MONGODB_SETTINGS']={
  'db','logApache',
  'host':localhost,
  'username':'',
  'password':''
db.MongoENgine(app)
app.config["MONGO_DBNAME"] = "logApache"
mongo = PyMongo(app, config_prefix='MONGO')
APP_URL = localhost+':5000"

@app.route('/')
def index():
    return "Hello, you!"

->$ curl -i -H "Content-Type: application/json" -X POST -d '{"title":"Read a book"}' http://localhost:5000/todo/api/v1.0/tasks


@auth.login_required
@app.route('/logApache', methods=['GET']) ->retrieve list of task
def get_log():  ->get tasks associated with the todo/api/v1.0/tasks with get
    return jsonify({'logApache': logApache})


@app.route('/logApache/<String:user_id>', methods=['GET']) ->retrieve the data of a single task
def get_log(user_id):
    logApache = [log for log in logApa if log['user_id'] == user_id]
    if len(logApache) == 0:
        abort(404) ->will create a template not found !!!
    return jsonify({'logApache': logApache})  

@app.route('/logApache', methods=['GET'])
def get_tasks():
      logAp=[make_log(log) for log in logApache]
      if len(logAp-==0:
         abort(404)
      else jsonify({'logApache': logAp}) 

def make_log(log):
    new_log = {}
    for field in task:
        if field == 'user_id':
            new_log['uri'] = url_for('get_log', user_id=log['user_id'], _external=True)
        else:
            new_log[field] = log[field]
    return new_log



auth = HTTPBasicAuth()
@auth.error_handler(403)
def unauthorized():
    return make_response(jsonify({'error': 'Unauthorized access'}), 403)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)  ->will create a much more API friendly error response,with the abort above   

@auth.get_password
def get_password(username):
    if username == 'bastien' && password='erik':
        session['logged_in']=True
    else
         session['logged_in']=False    
    return session['logged_in']

class userInfo(Resource):
    def get(self, dateUser=None, user_id=None):
        data = []

        if dateUser:
            user_info = mongo.db.logApache.find({"timestamp": dateUser})
            if user_info:
                return jsonify({"status": "ok", "data": user_info})
            else:
                return {"response": "no info found for {}".format(dateUser)}

        elif login:
            cursor = mongo.db.logApache.find({"user_id": user_id}
            for info in cursor:
                user['url'] = APP_URL + url_for('user') + "/" + user.get('dateUser')
                data.append(user)

            return jsonify({"user_id": user_id, "response": data})

        else:
            cursor = mongo.db.logApache.find()

            for user in cursor:
                user['url'] = APP_URL + url_for('user') + "/" + user.get('dateUser')
                data.append(user)

            return jsonify({"response": data})
@app.route('/logout')
def logout():
 session.pop('logged_in',None)
 return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
    api = Api(app)
    api.add_resource(userInfo, "/api/<datetime:dateUser>", endpoint="dateUser")
    api.add_resource(userInfo, "/api/<String:user_id>", endpoint="user_id")


