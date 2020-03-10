from django.db import models

# Create your models here.

class Genere(models.Model):
    name = models.CharField(max_length=255)

class Song(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    album = models.CharField(max_length=255)
    year = models.IntegerField()
    genere = models.ForeignKey(Genere, on_delete=models.CASCADE)
