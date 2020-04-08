from django.contrib.auth.models import User
from django.contrib.gis.db import models


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.PointField()
