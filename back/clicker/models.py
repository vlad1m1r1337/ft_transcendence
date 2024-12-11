from django.db import models
from django.contrib.postgres.fields import ArrayField

class ClickerPlayer (models.Model):
    nickname = models.CharField(max_length = 100)
    number_of_matches = models.IntegerField()
    average_click_speed = models.FloatField()

class Match (models.Model):
    players = models.ManyToManyField(ClickerPlayer)
    clicks = ArrayField(models.IntegerField())
    time = models.IntegerField()
