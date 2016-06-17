import os

import apache_log_parser
from pymongo import MongoClient

from cluemetric.config import MONGO_DB, MONGO_HOST, PARSER_LOG_FORMAT, \
    PARSER_WORK_DIR, PARSER_LOG_FILE_NAME


# Setup pymongo connection
client = MongoClient(MONGO_HOST)
db = client.get_database(MONGO_DB)
print MONGO_HOST
print MONGO_DB

# Setup apache parser
parser = apache_log_parser.make_parser(PARSER_LOG_FORMAT)

def present(url, *strings):
	return any(s in url for s in strings)

#determine the category
def get_categ(url):
	if present(url, 'login_handler'):
		return 'LOGIN'
	elif present(url, '/snapshots', '/studies/', '/datasources'):
		return 'GENERAL-BROWSING'
	elif present(url, '/analyses', '/signals', '/actions'):
		return 'SIGNAL-REVIEW'
	elif present(url, '/variables', '/datasets/')l:
		return 'DATA-SETUP'
	else:
		return 'OTHER'

# determine the type of category the user browsed,thanks to the URL and the method used
def get_type(method, url):
    if method == 'GET' and url.startswith('/lib/') or url.startswith('/css/'):
        return 'STATIC'
    else:
        return 'API'

log_file_path = os.path.join(PARSER_WORK_DIR, PARSER_LOG_FILE_NAME)
print log_file_path

skipped = 0
#browse the log Apache line by line
with open(log_file_path, 'r') as f:
    print 'Start inserting logs...'
    for index, line in enumerate(f):
        log = parser(line)
        try:
            user_id = log['cookie_cwp']
            timestamp = log['time_received_utc_datetimeobj']
            server = log['request_header_referer']
            rqst_url = log['request_url_path']
            rqst_method = log['request_method']
            user_ip = log['remote_host']
        except KeyError:
            skipped += 1
            continue

        rqst_categ = get_categ(rqst_url)
        rqst_type = get_type(rqst_method, rqst_url)

        doc = {'user_id': user_id,
               'user_ip': user_ip,
               'server': server,
               'timestamp': timestamp,
               'request': {
                   'type': rqst_type,
                   'method': rqst_method,
                   'url': rqst_url,
                   'categ': rqst_categ,
                   },
               }

        # Inserts in collection logs from logapache database
        db.logs.insert_one(doc)

        # Log progression
        if index % 2000 == 0:
				print 'Progress {}...'.format(index)
				
    print 'skipped {} logs', skipped
    print 'Done inserting logs'
