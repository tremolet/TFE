import os

import apache_log_parser
from pymongo import MongoClient

from webappstat.config import MONGO_DB, MONGO_HOST, PARSER_LOG_FORMAT, \
    PARSER_WORK_DIR, PARSER_LOG_FILE_NAME


# Setup pymongo connection
client = MongoClient(MONGO_HOST)
db = client.get_database(MONGO_DB)


# Setup apache parser
parser = apache_log_parser.make_parser(PARSER_LOG_FORMAT)


def get_categ(url):
    if 'login_handler' in url:
        return 'LOGIN'
    else:
        return 'OTHER'


def get_type(method, url):
    if method == 'GET' and url.startswith('/lib/') or url.startswith('/css/'):
        return 'STATIC'
    else:
        return 'API'

log_file_path = os.path.join(PARSER_WORK_DIR, PARSER_LOG_FILE_NAME)

with open(log_file_path, 'r') as f:
    print 'Start inserting logs...'
    for index, line in enumerate(f):
        log = parser(line)
        user_id = log['cookie_cwp']
        timestamp = log['time_received_utc_datetimeobj']
        server = log['request_header_referer']

        rqst_url = log['request_url_path']
        rqst_method = log['request_method']
        user_ip = log['remote_host']

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
    print 'Done inserting logs'
