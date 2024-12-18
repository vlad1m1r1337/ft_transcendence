from rest_framework import viewsets
from .models import PongGame, PongPlayer
from .serializers import PongGameSerializer, PongPlayerSerializer


class PongGameViewSet(viewsets.ModelViewSet):
    queryset = PongGame.objects.all()
    serializer_class = PongGameSerializer

class PongPlayerViewSet(viewsets.ModelViewSet):
    queryset = PongPlayer.objects.all()
    serializer_class = PongPlayerSerializer
