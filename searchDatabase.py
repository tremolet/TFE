from mongoengine import *
connect('...)
class logApacheIdentity(db.Document)
   user_id=db.StringField(required=True)
   timestamp=db.DateTimeField(required=True)
   server=db.StringField(required=True) 
   ip_user=db.StringField(required=True)
   request_type=db.StringField(required=True)
   request_verb=db.StringField(required=True)
   request_url=db.StringField(required=True)
   request_categ=db.StringField(required=True)
 def get_log(dateUser=None, user_id=None,categ=None)
   if not dateUser && not user_id && not categ:
     logFound=logApacheIdentity.objects()
   if user_id:
     logFound=logApacheIdentity.objects(user_id=user_id)
   if dateUser:
     logFound=logApacheIdentity.objects(timestamp<=dateUser)
   if categ:
     logFound=logApacheIdentity.objects(request.categ=categ)
   if len(logFound)>0:
     return logFound
   else:
     return None

