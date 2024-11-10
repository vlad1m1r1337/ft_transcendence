from rest_framework import serializers
from .models import PongPlayer, Game

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class PongPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PongPlayer
        fields = '__all__'

    def create(self, validated_data):
        user = PongPlayer.objects.create_user(**validated_data)
        return user