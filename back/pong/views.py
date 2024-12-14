from rest_framework import viewsets
from .models import PongGame, PongPlayer
from .serializers import GameSerializer, PongPlayerSerializer


class GameViewSet(viewsets.ModelViewSet):
    queryset = PongGame.objects.all()
    serializer_class = GameSerializer

class PongPlayerViewSet(viewsets.ModelViewSet):
    queryset = PongPlayer.objects.all()
    serializer_class = PongPlayerSerializer
