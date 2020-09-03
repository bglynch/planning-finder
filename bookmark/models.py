from django.db import models
from users.models import CustomUser


class Favourite(models.Model):
    planning_id = models.CharField(max_length=15)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
