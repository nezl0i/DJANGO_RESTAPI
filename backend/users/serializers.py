from rest_framework.serializers import ModelSerializer

from users.models import RestUser


class RestUserSerializer(ModelSerializer):

    class Meta:
        model = RestUser
        fields = ('username', 'first_name', 'last_name', 'email')