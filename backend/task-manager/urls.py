from django.contrib import admin
from django.urls import path, include

# Добавляем пути приложения
urlpatterns = [
    path('api/', include('api.routing')),
    path('admin/', admin.site.urls),
]

