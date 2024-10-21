from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

class Game(models.Model):
    player1 = models.ForeignKey(User, related_name='games_as_player1', on_delete=models.CASCADE)
    player2 = models.ForeignKey(User, related_name='games_as_player2', on_delete=models.CASCADE)
    score1 = models.IntegerField(default=0)
    score2 = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    test_value = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.player1.username} vs {self.player2.username}"

class Player(AbstractUser):
    score = models.IntegerField(default=0)
    total_games = models.IntegerField(default=0)
    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)

    password = models.CharField(max_length=128, default='temporarypassword')
    username = models.CharField(max_length=128, default='temporaryusername')
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='player_groups',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='player_permissions',
        blank=True
    )

    def win_rate(self):
        if self.total_games > 0:
            return (self.wins / self.total_games) * 100
        return 0
    def __str__(self):
        return self.username

class HighScore(models.Model):
    user_id = models.ForeignKey(Player, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user_id.username + " " + str(self.score)

class Setting(models.Model):
    user_id = models.ForeignKey(Player, on_delete=models.CASCADE)
    language = models.IntegerField(default=0)

    def __str__(self):
        return self.user_id.username + " " + str(self.language)

