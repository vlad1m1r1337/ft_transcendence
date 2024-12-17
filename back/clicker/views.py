from rest_framework import viewsets
from .models import ClickerPlayer, ClickerGame, ClickerMatch
from .serializers import ClickerPlayerSerializer, ClickerGameSerializer, ClickerMatchSerializer


class ClickerPlayerViewSet(viewsets.ModelViewSet):
    queryset = ClickerPlayer.objects.all()
    serializer_class = ClickerPlayerSerializer

class ClickerGameViewSet(viewsets.ModelViewSet):
    queryset = ClickerGame.objects.all()
    serializer_class = ClickerGameSerializer

class ClickerMatchViewSet(viewsets.ModelViewSet):
    queryset = ClickerMatch.objects.all()
    serializer_class = ClickerMatchSerializer