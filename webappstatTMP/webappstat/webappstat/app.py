from flask import Flask, jsonify, request
from flask_mongoengine import MongoEngine

from webappstat.config import MONGO_DB, MONGO_HOST, SERVER_HOST, SERVER_PORT
from webappstat.model.log import Log
from flask.templating import render_template

app = Flask(__name__)

app.config['MONGODB_DB'] = MONGO_DB
app.config['MONGODB_HOST'] = MONGO_HOST

db = MongoEngine(app)


# @app.route('/')
# def hello_world():
#     return 'Hello World!'


@app.errorhandler(500)
def internal_error(error):
    return "Internal Server error"


@app.errorhandler(404)
def not_found(error):
    return "Not Found", 404


@app.route('/', methods=['GET'])
def index():
#     return app.send_static_file('index.html')
    return render_template('index.html')

@app.route('/users', methods=['GET'])
def get_logs():
    users = []
    filters = {}

    user_id = request.args.get('userToSearch')
    from_ = request.args.get('_from')
    until = request.args.get('_to')

    if user_id:
        filters['user_id'] = user_id
    if from_:
        filters['timestamp__gte'] = from_
    if until:
        filters['timestamp__lte'] = until

    query = Log.objects(**filters)
#     for log in Log.objects(**filters).limit(50):
#         logs.append(log.to_dict())

    agg_pipeline = {'$group': {'_id': { '$dayOfYear': "$timestamp"},
                               'logs': { '$sum': 1 },
                               'day' : { '$first': {'$dateToString': {'format': '%Y-%m-%d', 'date': '$timestamp'}} }
                               }
                    }
    results = list(query.aggregate(agg_pipeline))

    # {u'_id': 40, u'logs': 3148, u'day': u'20160209'}
    counts = []
    for res in results:
        counts.append({'nbLog':res['logs'],'day':res['day']}) 

    response = {'success': True, 'usersToShow': counts,'dateMin':,'usersFilter':}
    return jsonify(**response)
@app.route('/activities', methods=['GET'])
def get_logs():
    users = []
    filters = {}

    user_id = request.args.get('userToSearch')
    from_ = request.args.get('_from')
    until = request.args.get('_to')

    if user_id:
        filters['user_id'] = user_id
    if from_:
        filters['timestamp__gte'] = from_
    if until:
        filters['timestamp__lte'] = until

    query = Log.objects(**filters)
#     for log in Log.objects(**filters).limit(50):
#         logs.append(log.to_dict())

    agg_pipeline = {'$group': {'_id': { '$dayOfYear': "$timestamp"},
                               'logs': { '$sum': 1 },
                               'day' : { '$first': {'$dateToString': {'format': '%Y-%m-%d', 'date': '$timestamp'}} }
                               }
                    }
    results = list(query.aggregate(agg_pipeline))

    # {u'_id': 40, u'logs': 3148, u'day': u'20160209'}
    counts = []
    for res in results:
        counts.append({'nbLog':res['logs'],'day':res['day']}) 

    response = {'success': True, 'usersToShow': counts,'dateMin':,'usersFilter':}
    return jsonify(**response)



@app.route('/logs', methods=['GET'])
def get_logs():
    logs = []
    filters = {}

    user_id = request.args.get('userID')
    from_ = request.args.get('from')
    until = request.args.get('until')
    rqst_categ = request.args.get('request_categ')

    if user_id:
        filters['user_id'] = user_id
    if from_:
        filters['timestamp__gte'] = from_
    if until:
        filters['timestamp__lte'] = until
    if rqst_categ:
        filters['request__categ'] = rqst_categ

    query = Log.objects(**filters)
#     for log in Log.objects(**filters).limit(50):
#         logs.append(log.to_dict())

    agg_pipeline = {'$group': {'_id': { '$dayOfYear': "$timestamp"},
                               'logs': { '$sum': 1 },
                               'day' : { '$first': {'$dateToString': {'format': '%Y-%m-%d', 'date': '$timestamp'}} }
                               }
                    }
    results = list(query.aggregate(agg_pipeline))

    # {u'_id': 40, u'logs': 3148, u'day': u'20160209'}
    counts = []
    for res in results:
        counts.append({'nbLog':res['logs'],'day':res['day']}) 

    response = {'success': True, 'logs': counts}
    return jsonify(**response)


if __name__ == '__main__':
    app.run(host=SERVER_HOST, port=SERVER_PORT, debug=True)
