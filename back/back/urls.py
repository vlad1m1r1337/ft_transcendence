from clicker.views import ClickerPlayerViewSet
from rest_framework.routers import DefaultRouter
from django.contrib import admin
from django.urls import path, include

router = DefaultRouter()
router.register(r'clicker-players', ClickerPlayerViewSet, basename='clicker-players')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]