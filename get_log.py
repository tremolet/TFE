from mongoengine import *
class Request(db.EmbeddedDocument):
   type=db.StringField()
   verb=db.StringField()
   url=db.StringField()
   categ=db.StringField()
class logApache(db.Document):
   user_id=db.StringField(required=True)
   timestamp=db.DateTimeField(required=True)
   server=db.StringField(required=True) 
   ip_user=db.StringField(required=True)
   request=db.EmbeddedDocumentField(Request)
   def to_dict(self):
        return {'user_id': self.user_id,'timestamp': self.timestamp.strftime('%Y-%m-%d %H:%M:%S'),'server':self.server,'ip_user':self.ip_user,'request'{'type':self.request.type,'verb':self.request.verb,'url':self.request.url,'categ':self.request.categ}}
   

   
        
