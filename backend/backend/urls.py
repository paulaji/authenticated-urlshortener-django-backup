from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # setting the path to urls.py in the newly created api folder inside application
    path('api/', include('application.api.urls')),
    # manually writing a register user functionality, we can always use the django admin panel to add more users
    path('register/', include('application.urls')),
]
