from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializer import TaskSerializer
from .lib.data.data_handler import DataHandler

# Create your views here.

data = DataHandler()

# Все задачи сохраненные в бд
@api_view(['GET'])
def task_list(request):
    return Response(data.execute("""SELECT * FROM "tasks";"""))

# POST Запрос на создание записи в базе данных 
@api_view(['POST'])
def task_create(request):
    d = request.data
    c = 0 if d['completed'] == "true" else 1
    return Response(data.execute("""
        INSERT INTO "tasks"("id","name","completed","date","priority") VALUES (?, ?, ?, ?, ?);
    """, (d['id'], d['name'], c, d['date'], d['priority'])))

# POST Запрос на удаление записи из базы данных
@api_view(['POST'])
def task_delete(request):
    d = request.data
    return Response(data.execute("""
        DELETE FROM "tasks" WHERE "id"=(?);
    """, (d['id'],)))