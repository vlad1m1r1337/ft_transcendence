from django.contrib import admin
from .models import PongPlayer, PongGame

admin.site.register(PongPlayer)
admin.site.register(PongGame)