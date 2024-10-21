from django.contrib import admin
from .models import Player, Game, HighScore, Setting

admin.site.register(Player)
admin.site.register(Game)
admin.site.register(HighScore)
admin.site.register(Setting)
