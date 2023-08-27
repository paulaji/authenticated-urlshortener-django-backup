from django.urls import path
from . import views
# importing the customized token
from . views import MyTokenObtainPairView

# built-in authentication view/function of simplejwt
# for obtaining the access key / refresh key 
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    # in the root url, implement the getRoutes function
    path('', views.getRoutes),
    # url to access the serialized notes incase notes url is made
    # path('notes/', views.getNotes),
    # urls to access the built-in views of simplejwt
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), # here, we display the customized token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]