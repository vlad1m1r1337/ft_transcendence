from django.urls import path
from . import views

urlpatterns = [
    # Define your API endpoints here, e.g.,
    path('example/', views.example_view, name='example'),
    path('testview/', views.test, name='testview'),
]
