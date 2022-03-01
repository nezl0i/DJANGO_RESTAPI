from rest_framework import mixins, viewsets
from rest_framework.pagination import PageNumberPagination

from .models import RestUser
from .serializers import RestUserSerializer


class RestUserPagination(PageNumberPagination):
    page_size = 10


class RestUserViewSet(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      viewsets.GenericViewSet):
    queryset = RestUser.objects.all()
    serializer_class = RestUserSerializer
    pagination_class = RestUserPagination
