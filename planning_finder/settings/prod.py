from .base import *
import dj_database_url
from decouple import config

print("Using Production Settings")
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

DATABASES = {
   'default': dj_database_url.parse(config("DATABASE_URL"))
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/
STATIC_URL = '/static/'
STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static'), )
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
