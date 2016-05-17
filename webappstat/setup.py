from setuptools import setup, find_packages

setup(name='webappstat',
      version='0.1',
      description='Cluepoints Web Application Statistics Cruncher',
      author='Cluepoints',
      author_email='setup.py',
      url='http://www.cluepoints.com',
      install_requires=[
          "pymongo==3.2.2",
          "mongoengine==0.10.6",
          "flask==0.10.1",
          "flask-mongoengine==0.7.5",
          "apache_log_parser==1.7.0"
          ],
      packages=find_packages(exclude=['ez_setup']),
      include_package_data=True)
