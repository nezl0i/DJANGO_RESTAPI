from rest_framework import mixins, viewsets, generics
from rest_framework.pagination import PageNumberPagination

from backend import settings
from .models import RestUser
from .serializers import RestUserSerializer, RestUserFullSerializer


class RestUserPagination(PageNumberPagination):
    page_size = 10


class RestUserViewSet(viewsets.ModelViewSet):
    queryset = RestUser.objects.all()
    # serializer_class = RestUserSerializer
    # pagination_class = RestUserPagination

    def get_serializer_class(self):
        if self.request.version == settings.REST_VERSION:
            return RestUserFullSerializer
        return RestUserSerializer

