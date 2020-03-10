from rest_framework import serializers
from .models import Genere, Song

class GenereSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genere
        fields = ['id', 'name']


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['id', 'title', 'description', 'album', 'year', 'genere']
