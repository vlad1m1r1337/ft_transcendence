from django.contrib import admin
from .models import PongPlayer, Game

admin.site.register(PongPlayer)
admin.site.register(Game)