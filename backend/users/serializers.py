from rest_framework.serializers import ModelSerializer
from django.contrib.auth.hashers import make_password
from users.models import RestUser


class RestUserSerializer(ModelSerializer):

    class Meta:
        model = RestUser
        fields = ('id', 'username', 'first_name', 'last_name', 'email')

        def create(self, validated_data):
            user = RestUser.objects.create(validated_data['email'], None, make_password(validated_data['password']))
            return user
