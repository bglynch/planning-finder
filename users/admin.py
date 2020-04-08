from django.contrib import admin
from django.contrib.gis.admin import OSMGeoAdmin
from .models import Profile


# Register your models here.
@admin.register(Profile)
class ShopAdmin(OSMGeoAdmin):
    list_display = ('user', 'location')
