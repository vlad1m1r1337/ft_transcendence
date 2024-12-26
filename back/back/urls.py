from clicker.views import ClickerPlayerViewSet, ClickerGameViewSet, ClickerMatchViewSet
from pong.views import PongPlayerViewSet, PongGameViewSet
from rest_framework.routers import DefaultRouter
from django.contrib import admin
from django.urls import path, include
from intrauth.views import home, intra_login, intra_login_redirect, get_authenticated_user

router = DefaultRouter()
router.register(r'clicker-players', ClickerPlayerViewSet, basename='clicker-players')
router.register(r'clicker-games', ClickerGameViewSet, basename='clicker-games')
router.register(r'clicker-matches', ClickerMatchViewSet, basename='clicker-matches')
router.register(r'pong-players', PongPlayerViewSet, basename='pong-players')
router.register(r'pong-games', PongGameViewSet, basename='pong-games')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('auth/user/', get_authenticated_user, name='get_authenticated_user'),
    path('oauth/', home, name='oauth'),
    path('oauth/login/', intra_login, name='oauth_login'),
    path('oauth/login/redirect/', intra_login_redirect, name='oauth_login_redirect'),
]