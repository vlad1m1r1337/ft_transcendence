from rest_framework import viewsets
from .models import Game, PongPlayer
from .serializers import GameSerializer


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

#class PlayerViewSet(viewsets.ModelViewSet):
#    queryset = Player.objects.all()
#    serializer_class = PlayerSerializer
