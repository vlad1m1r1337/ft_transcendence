from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User

class ClickerPlayer (models.Model):
    user = models.ForeignKey(User, related_name='clicker_players', on_delete=models.CASCADE)
    nickname = models.CharField(max_length = 100)
    number_of_matches = models.IntegerField()
    average_click_speed = models.FloatField()

    def __str__(self): return self.nickname

class ClickerGame (models.Model):
    players = models.ManyToManyField(ClickerPlayer, related_name='clicker_games')
    clicks = ArrayField(models.IntegerField())
    time = models.IntegerField()
