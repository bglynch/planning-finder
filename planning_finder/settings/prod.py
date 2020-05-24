from .base import *
import re
from decouple import config

print("Using Production Settings")
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

Database = re.split(r"(:\/\/|@|:)", config('DATABASE_URL'))

DATABASES = {
   'default': {
      'ENGINE': 'django.contrib.gis.db.backends.postgis',
      'NAME': Database[-1].split("/")[-1],
      'USER': Database[2],
      'PASSWORD': Database[4],
      'HOST': Database[6],
      'PORT': Database[-1].split("/")[0]
   }
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/
STATIC_URL = '/static/'
STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static'), )
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
