'''
Created on Apr 27, 2016

'''

SERVER_HOST = '0.0.0.0'
SERVER_PORT = 5000

MONGO_HOST = 'localhost'
MONGO_DB = 'webappstat'


PARSER_WORK_DIR = '/home/stremolet/Desktop/webappstat/webappstat/'
PARSER_LOG_FORMAT = '%h %{cwp}C %l %u %t \"%r\" %>s %b \"%{Referer}i\" \"%{User-Agent}i\"'
PARSER_LOG_FILE_NAME = 'access_log.txt'
