from .base import *

DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'todo',
        'USER': 'admin',
        'PASSWORD': 'restapi',
        'HOST': 'db',
        'PORT': '5432'
    }
}

