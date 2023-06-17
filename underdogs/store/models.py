from django.db import models

# Create your models here.
class User(models.Model):
    firstname = models.CharField(max_length=64)
    lastname = models.CharField(max_length=64)
    username = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.username}"