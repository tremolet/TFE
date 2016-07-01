import unittest
import requests
import os

from cluemetric.app import to_date,get_logs,get_activities,get_request
from cluemetric.parser.parser import present,get_categ,get_type
from datetime import datetime

class TestUtils(unittest.TestCase):
    def test_to_date_valid_date(self):
        s = '2016-02-01'
        date = to_date(s)
        self.assertIsInstance(date, datetime)
        self.assertEqual(date.year, 2016)
    def test_present(self):
        isPresent = present('http://0.0.0.0:5000/helloCluepoints','Cluepoints')
        self.assertEqual(isPresent,True)
        self.assertIsInstance(isPresent,bool)
    def test_get_categ(self):
		categTest1 = get_categ('www.cluepoints.com/snapshots')
		self.assertEqual(categTest1, 'GENERAL-BROWSING')
		categTest2 = get_categ('www.google.fr/signal')
		self.assertEqual(categTest2, 'OTHER')
		categTest3 = get_categ('www.facebook.com/0336547869/variables')
		self.assertEqual(categTest3, 'DATA-SETUP')
    def test_get_type(self):
		type1 = get_type('GET', 'www.google.fr/lib/')
		self.assertEqual(type1, 'API')
		type2 = get_type('GET', '/css/0565742')
		self.assertEqual(type2, 'STATIC')
	

class TestFunctional(unittest.TestCase):

    def test_get_users(self):
	 r = requests.get('http://0.0.0.0:5000/users')
	 r.status_code
	 d = r.json()
	 self.assertTrue(d['success'])

    def tests_get_log(self):
		r = requests.get('http://0.0.0.0:5000/logs?userID=mguy')
		r.status_code
		d = r.json()
		self.assertTrue(d['success'])
		j = requests.get('http://0.0.0.0:5000/logs?userID=mguy&from=2015-01-20&to=2016-02-30')
		j.status_code
		b = j.json()		
			
    def tests_get_activities(self):
		r = requests.get('http://0.0.0.0:5000/activities?from=2016-01-01')
		r.status_code
		d = r.json()
		self.assertTrue(d['success'])
    def tests_get_requests(self):
		r = requests.get('http://0.0.0.0:5000/requests?from=2015-08-32')
		self.assertEqual(r.status_code,500)
		
if __name__ == '__main__':
    unittest.main()		