from flask import Flask, jsonify, request
from flask_mongoengine import MongoEngine

from webappstat.config import MONGO_DB, MONGO_HOST, SERVER_HOST, SERVER_PORT
from webappstat.model.log import Log

app = Flask(__name__)

app.config['MONGODB_DB'] = MONGO_DB
app.config['MONGODB_HOST'] = MONGO_HOST

db = MongoEngine(app)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.errorhandler(500)
def internal_error(error):
    return "Internal Server error"


@app.errorhandler(404)
def not_found(error):
    return "Not Found", 404


@app.route('/logs', methods=['GET'])
def get_logs():
    print 'you'
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

    for log in Log.objects(**filters).limit(50):
        logs.append(log.to_dict())
    response = {'success': True, 'logs': logs}
    print response
    json_response=json.dumps(response)
    response2=Response(json_response,content_type='application/json; charset=utf-8')
    response2.headers.add('content-length',len(json_response))
    response2.status_code=200
    return response2
    #Response(json.dumps(response),  mimetype='application/json')
    #return jsonify(**response)


if __name__ == '__main__':
    app.run(host=SERVER_HOST, port=SERVER_PORT, debug=True)
