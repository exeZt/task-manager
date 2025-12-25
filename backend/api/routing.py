from django.urls import path
from .views import task_list, task_create, task_delete

urlpatterns = [
    path('task/', task_list),
    path('task/create', task_create),
    path('task/delete', task_delete),
]