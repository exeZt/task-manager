from django.db import models

class Task(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)
    id = models.CharField(max_length=100, unique=True, primary_key=True)
    completed = models.BooleanField()
    priority = models.CharField(max_length=10)

    def __str__(self):
        return self.name()