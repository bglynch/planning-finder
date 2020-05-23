import dj_database_url

from .base import *

print("Using Local Settings")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.contrib.gis.db.backends.spatialite',
#         'NAME': os.path.join(BASE_DIR, 'db4.sqlite3'),
#     }
# }

DATABASES = {
   'default': dj_database_url.parse("spatialite:///db4.sqlite3")
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/
STATIC_URL = '/static/'
STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static'), )
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

SPATIALITE_LIBRARY_PATH = '/usr/local/lib/mod_spatialite.dylib'
