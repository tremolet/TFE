import os
import apache_log_parser
from pymongo import MongoClient
client = MongoClient('localhost')
db = client.logApache
WORK_DIR = 'home/ubuntu/Bureau'
file_path = os.path.join(WORK_DIR, 'access_log.txt')
log_format = '%h %{cwp}C %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"'
parser = apache_log_parser.make_parser(log_format)
f=open('access_log.txt', 'r')
content=f.readlines()
for i in range(0,len(content)):
	log = parser(content[i])
        user_id = log['cookie_cwp']
	timestamp = log['time_received_utc_datetimeobj']
	server = log['request_header_referer']
	rqst_verb = log['request_method']
        ip=log['remote_host']
        if user_id is not '-':
         rqst_categ='login'
        else:
         rqst_categ='other'
        if log['request_first_line'].startswith("GET /lib/"):
          rqst_type='STATIC'
        else:
          rqst_type='API'
        rqst_url=log['request_url_path']
        db.logApache.insert_one({"user_id":user_id,'timestamp':timestamp,'server':server,'ip_user':ip,'request':{'type':rqst_type,'verb':rqst_verb,'url':rqst_url,'categ':rqst_categ}})
f.close()


