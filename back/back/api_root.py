from rest_framework.response import Response
from rest_framework.views import APIView
from django.urls import reverse
from django.conf import settings

class CustomAPIRootView(APIView):

    def get(self, request, format=None):
        base_url = f"{request.scheme}://localhost:8081/api/"

        endpoints = {
            'clicker-players': f'{base_url}clicker-players/',
            'clicker-games': f'{base_url}clicker-games/',
            'clicker-matches': f'{base_url}clicker-matches/',
            'pong-players': f'{base_url}pong-players/',
            'pong-games': f'{base_url}pong-games/',
        }

        return Response(endpoints)