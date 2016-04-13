from flask import Flask, jsonify, url_for, redirect, request
from flask_pymongo import PyMongo
from flask_restful import Api, Resource

app = Flask(__name__)
app.config["MONGO_DBNAME"] = "logApache"
mongo = PyMongo(app, config_prefix='MONGO')
APP_URL = "http://127.0.0.1:5000"

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

api = Api(app)
api.add_resource(userInfo, "/api/<datetime:dateUser>", endpoint="dateUser")
api.add_resource(userInfo, "/api/<String:user_id>", endpoint="user_id")
