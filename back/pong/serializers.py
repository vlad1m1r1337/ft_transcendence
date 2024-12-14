from rest_framework import serializers
from .models import PongPlayer, PongGame

class PongGameSerializer(serializers.ModelSerializer):
    class Meta:
        model = PongGame
        fields = '__all__'

class PongPlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PongPlayer
        fields = '__all__'

    def create_user(self, validated_data):
        user = PongPlayer.objects.create_user(**validated_data)
        return user