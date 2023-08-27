# this file was created after the urls.py was modified to include this file
from django.urls import path
from . import views

# url shortening
from .views import shorten_url, redirect_to_original

urlpatterns = [
    path('registeruser/', views.register_user, name="register"),
    path('shorten/', shorten_url, name='shorten_url'),
    path('<str:short_code>/', redirect_to_original, name='redirect_to_original'),
]