from django.contrib import admin
from .models import PongPlayer, PongGame, testClass

admin.site.register(PongPlayer)
admin.site.register(PongGame)