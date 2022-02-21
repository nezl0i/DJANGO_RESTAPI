import json
from django.conf import settings
from django.core.management import BaseCommand

from users.models import RestUser


def load_from_json(file_name):
    with open(f'{settings.BASE_DIR}/json/{file_name}.json', encoding='utf-8') as json_file:
        return json.load(json_file)


class Command(BaseCommand):

    def handle(self, *args, **options):
        users = load_from_json('users')
        RestUser.objects.all().delete()
        for user in users:
            RestUser.objects.create(**user)

        rest_user = RestUser.objects.create_superuser(
            username='admin',
            password='restapi',
            email='admin2@gb.local'
        )
