from django.shortcuts import render
from rest_framework import generics
from .serializers import GenereSerializer, SongSerializer
from .models import Genere, Song
from rest_framework import status
from rest_framework.response import Response

# Create your views here.

class GeneresAPI(generics.ListCreateAPIView):
    serializer_class = GenereSerializer
    queryset = Genere.objects.all()


class GenereAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GenereSerializer
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_202_ACCEPTED)

    def get_queryset(self):
        pk = self.kwargs.get('pk', None)
        return Genere.objects.filter(pk=pk)


class SongsAPI(generics.ListCreateAPIView):
    serializer_class = SongSerializer
    
    def get_queryset(self):
        queryset = Song.objects.all()
        genere = self.request.query_params.get('genere', None)
        if genere is not None:
            queryset = queryset.filter(genere=genere)
        return queryset


class SongAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SongSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_202_ACCEPTED)

    def get_queryset(self):
        pk = self.kwargs.get('pk', None)
        return Song.objects.filter(pk=pk)
