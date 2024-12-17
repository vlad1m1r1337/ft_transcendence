from rest_framework import serializers
from .models import ClickerGame, ClickerPlayer, ClickerPlayerInfo, ClickerMatch


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
        fields = '__all__'

    def create_user(self, validated_data):
        user = ClickerPlayer.objects.create_user(**validated_data)
        return user

class ClickerPlayerInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClickerPlayerInfo
        fields = ['name', 'clicks']

class ClickerMatchSerializer(serializers.ModelSerializer):
    players_info = ClickerPlayerInfoSerializer(many=True, source='clicker_player_info')
    class Meta:
        model = ClickerMatch
        fields = ['time' ,'players_info']

    def create(self, validated_data):
        players_info_data = validated_data.pop('clicker_player_info')
        match = ClickerMatch.objects.create(**validated_data)
        for player_info in players_info_data:
            ClickerPlayerInfo.objects.create(match=match, **player_info)
        return match

# class ClickerMatchSerializer(serializers.ModelSerializer):
#     players_info = ClickerPlayerInfoSerializer(many=True, source='clicker_player_info')
#
#     class Meta:
#         model = ClickerMatch
#         fields = ['time', 'players_info']
#
#     def create(self, validated_data):
#         # Extract players_info from the validated data
#         players_info_data = validated_data.pop('clicker_player_info')
#
#         # Create the ClickerMatch object
#         match = ClickerMatch.objects.create(**validated_data)
#
#         # Create ClickerPlayerInfo objects for each player
#         for player_info in players_info_data:
#             ClickerPlayerInfo.objects.create(
#                 match=match,
#                 name=player_info['name'],
#                 clicks=player_info['clicks']
#             )
#
#         return match
