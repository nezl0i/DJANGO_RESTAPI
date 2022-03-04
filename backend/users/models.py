from django.db import models
from django.contrib.auth.models import AbstractUser


class RestUser(AbstractUser):
    email = models.EmailField(unique=True)
    birth_date = models.DateField(null=True, blank=True)
    age = models.PositiveSmallIntegerField(default=18)

    def __str__(self):
        return self.username

    def delete(self, *args, **kwargs):
        self.is_active = False
        self.save()


