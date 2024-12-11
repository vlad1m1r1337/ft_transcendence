from rest_framework import serializers
from .models import Match, ClickerPlayer

class MatchSerializer(serializers.ModelSerializer):
    players = serializers.PrimaryKeyRelatedField(
        many=True, queryset=ClickerPlayer.objects.all()
    )
    clicks = serializers.ListField(child=serializers.IntegerField())

    class Meta:
        model = Match
        fields = ['id', 'players', 'clicks', 'time']