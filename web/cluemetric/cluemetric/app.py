from flask import Flask, jsonify, request,redirect
from flask_mongoengine import MongoEngine
from datetime import datetime
import urllib 
from cluemetric.config import MONGO_DB, MONGO_HOST, SERVER_HOST, SERVER_PORT
from cluemetric.model.log import Log
from flask.templating import render_template
from datetime import datetime, timedelta

app = Flask(__name__)

app.config['MONGODB_DB'] = MONGO_DB
app.config['MONGODB_HOST'] = MONGO_HOST

#connection to the database
db = MongoEngine(app)

# in case of server error
@app.errorhandler(500)
def internal_error(error):
    return "Internal Server error"

# in case of non-existing page searched
@app.errorhandler(404)
def not_found(error):
    return "Not Found", 404


@app.route('/', methods=['GET'])
def index():
#     return app.send_static_file('index.html')
    return render_template('index.html')

# search all the userID,the maximum and the minimum date,to initalize the differents forms (filters) in the front-end 
@app.route('/users', methods=['GET'])
def get_users():
		query = Log.objects.distinct("user_id")
		query.sort()	
		agg_date = {'$group':
							  {'_id': { '$dayOfYear': "$timestamp"},
							  'day' : { '$first': {'$dateToString': {'format': '%Y/%m/%d', 'date': '$timestamp'}} }
							  }
					}		  
		minDateObj = Log.objects.order_by("+timestamp").limit(1)
		maxDateObj = Log.objects.order_by("-timestamp").limit(1)
		minDate=list(minDateObj.aggregate(agg_date))[0]['day']
		maxDate=list(maxDateObj.aggregate(agg_date))[0]['day']
		response = {'success': True, 'users': query,'minDate':minDate,'maxDate':maxDate}
		return jsonify(**response)

#redirect to the right url
@app.route('/showActivities', methods=['GET'])
def goToLog():
    return redirect("/#/showActivities", code=302)

#redirect to the right url
@app.route('/showRequests', methods=['GET'])
def goToRequests():
    return redirect("/#/showRequests", code=302)	

#redirect to the right url
@app.route('/showLogs', methods=['GET'])
def goToActivities():
    return redirect("/#/showLogs", code=302)

#Convert a datetime to string,in the format given	
def to_date(date):
#:type:date:Datetime
	
	return datetime.strptime(date, '%Y-%m-%d')


#get the number of logins by day,with the possible filters (user_id,minimum date,maximum date)
@app.route('/logs', methods=['GET'])
def get_logs():
		logs = []
		filters = {}
		user_id = request.args.get('userID')
		from_ = request.args.get('from')
		until = request.args.get('until')
		if user_id:
			filters['user_id'] = user_id
		if from_:
			filters['timestamp__gte'] = to_date(from_)		
		if until:
			filters['timestamp__lte'] = to_date(until) + timedelta(days=1)	# otherwise 00:00:00 is taking into account
		query = Log.objects(**filters)
		agg_pipeline = {'$group': {'_id': { '$dayOfYear': "$timestamp"},
								   'logs': { '$sum': 1 },
								   'day' : { '$first': {'$dateToString': {'format': '%Y-%m-%d', 'date': '$timestamp'}} }
								   }
						}
		results = list(query.aggregate(agg_pipeline))
		counts = []
		for res in results:
			counts.append({'nbLog':res['logs'],'day':res['day']}) 

		response = {'success': True, 'logs': counts}
		return jsonify(**response)

#get the categories,with the possible filters (user_id,minimum date,maximum date)
@app.route('/activities', methods=['GET'])
def get_activities():
    logs = []
    filters = {}
    user_id = request.args.get('userID')
    from_ = request.args.get('from')
    until = request.args.get('until')
    if user_id:
        filters['user_id'] = user_id
    if from_:
        filters['timestamp__gte'] = to_date(from_)		
    if until:
        filters['timestamp__lte'] = to_date(until) + timedelta(days=1)	# otherwise 00:00:00 is taking into account

    query = Log.objects(**filters)

    agg_pipeline = {'$group': {'_id':"$request.categ",
								'count': {'$sum': 1}
                              }
                   }
    results = list(query.aggregate(agg_pipeline))
    counts = []
    for res in results:
        counts.append({'count':res['count'],'categ':res['_id']})
    response = {'success': True, 'logs': counts}
    return jsonify(**response)	

#get the number of requests per day,per category,with the possible filters (user_id,minimum date,maximum date)

@app.route('/requests', methods=['GET'])
def get_request():
		logs = []
		filters = {}
		user_id = request.args.get('userID')
		from_ = request.args.get('from')
		until = request.args.get('until')
		if user_id:
			filters['user_id'] = user_id
		if from_:
			filters['timestamp__gte'] = to_date(from_)		
		if until:
			filters['timestamp__lte'] = to_date(until) + timedelta(days=1)	# otherwise 00:00:00 is taking into account
		query = Log.objects(**filters)
		agg_pipeline = {'$group': {'_id':{"cat":"$request.categ","date": {"$dateToString": {"format": "%Y-%m-%d", "date": "$timestamp"}}},
									'count': {'$sum': 1}
								  }
						}		  
					  
		results = list(query.aggregate(agg_pipeline))
		counts = []
		for res in results:
				counts.append({'nbRequest':res['count'],'categ':res['_id']['cat'],'day':res['_id']['date']})
		response = {'success': True, 'logs': counts}
		return jsonify(**response)	
   	

#Run the application
if __name__ == '__main__':
    app.run(host=SERVER_HOST, port=SERVER_PORT, debug=True)
