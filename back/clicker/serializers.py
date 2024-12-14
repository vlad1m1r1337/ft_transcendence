from rest_framework import serializers
from .models import ClickerGame, ClickerPlayer

class ClickerGameSerializer(serializers.ModelSerializer):
    players = serializers.PrimaryKeyRelatedField(
        many=True, queryset=ClickerPlayer.objects.all()
    )
    clicks = serializers.ListField(child=serializers.IntegerField())

    class Meta:
        model = ClickerGame
        fields = ['id', 'players', 'clicks', 'time']

class ClickerPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClickerPlayer
        fields = ['__all__']

    def create(self, validated_data):
        user = ClickerPlayer.objects.create_user(**validated_data)
        return user