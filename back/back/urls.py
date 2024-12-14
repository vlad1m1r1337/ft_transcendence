from clicker.views import ClickerPlayerViewSet, ClickerGameViewSet
from pong.views import PongPlayerViewSet, PongGameViewSet
from rest_framework.routers import DefaultRouter
from django.contrib import admin
from django.urls import path, include

router = DefaultRouter()
router.register(r'clicker-players', ClickerPlayerViewSet, basename='clicker-players')
router.register(r'clicker-games', ClickerGameViewSet, basename='clicker-games')
router.register(r'pong-players', PongPlayerViewSet, basename='pong-players')
router.register(r'pong-games', PongGameViewSet, basename='pong-games')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]