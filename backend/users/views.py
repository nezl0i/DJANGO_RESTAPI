from rest_framework import mixins, viewsets

from .models import RestUser
from .serializers import RestUserSerializer


class RestUserViewSet(mixins.ListModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      viewsets.GenericViewSet):
    queryset = RestUser.objects.all()
    serializer_class = RestUserSerializer
