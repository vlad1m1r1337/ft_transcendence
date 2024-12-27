from django.db import models
from intrauth.models import IntraUser


class PongPlayer(models.Model):
    user = models.ForeignKey(IntraUser, related_name='pong_players', on_delete=models.CASCADE)
    nickname = models.CharField(max_length=100)
    rating = models.IntegerField(default=0)
    total_games = models.IntegerField(default=0)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)

    def win_rate(self):
        if self.total_games > 0:
            return (self.wins / self.total_games) * 100
        return 0
    def __str__(self):
        return self.nickname

class PongGame(models.Model):
    player1 = models.ForeignKey(PongPlayer, related_name='games_as_player1', on_delete=models.CASCADE)
    player2 = models.ForeignKey(PongPlayer, related_name='games_as_player2', on_delete=models.CASCADE)
    score1 = models.IntegerField(default=0)
    score2 = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.player1.nickname} vs {self.player2.nickname}"