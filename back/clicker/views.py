from rest_framework import viewsets
from .models import ClickerPlayer, ClickerGame
from .serializers import ClickerPlayerSerializer, ClickerGameSerializer

class ClickerPlayerViewSet(viewsets.ModelViewSet):
    queryset = ClickerPlayer.objects.all()
    serializer_class = ClickerPlayerSerializer

class ClickerGameViewSet(viewsets.ModelViewSet):
    queryset = ClickerGame.objects.all()
    serializer_class = ClickerGameSerializer