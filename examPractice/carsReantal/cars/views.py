from django.shortcuts import render
from rest_framework import generics
from .serializers import CarSerializer
from .models import Car
from rest_framework import status
from rest_framework.response import Response

# Create your views here.

class CarsAPI(generics.ListCreateAPIView):
    serializer_class = CarSerializer
    queryset = Car.objects.all()


class CarAPI(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CarSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_202_ACCEPTED)

    def get_queryset(self):
        pk = self.kwargs.get('pk', None)
        return Car.objects.filter(pk=pk)
