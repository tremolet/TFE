'''
Created on Apr 27, 2016

'''
from mongoengine.fields import EmbeddedDocument, EmbeddedDocumentField, StringField, \
    DateTimeField, Document


class Request(EmbeddedDocument):
    type = StringField()
    method = StringField()
    url = StringField()
    categ = StringField()


class Log(Document):
    user_id = StringField(required=True)
    timestamp = DateTimeField()
    server = StringField()
    user_ip = StringField()
    request = EmbeddedDocumentField(Request)

    meta = {'collection': 'logs'}

    def to_dict(self):
        return {'user_id': self.user_id,
                'timestamp': self.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
                'server': self.server,
                'user_ip': self.user_ip,
                'request': {
                    'type': self.request.type,
                    'method': self.request.method,
                    'url': self.request.url,
                    'categ': self.request.categ,
                    },
                }
