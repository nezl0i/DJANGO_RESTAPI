from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import RestUser
from .serializers import RestUserSerializer


class RestUserViewSet(ModelViewSet):
    queryset = RestUser.objects.all()
    serializer_class = RestUserSerializer
    