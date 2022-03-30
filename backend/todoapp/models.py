from django.db import models
from users.models import RestUser


class Project(models.Model):
    name = models.CharField(max_length=32, unique=True)
    users = models.ManyToManyField(RestUser)
    repository = models.URLField(blank=True)

    def __str__(self):
        return f'{self.name}: {self.repository}'

    def get_users(self):
        return ','.join([str(p) for p in self.users.all()])


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    create = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    creator = models.ForeignKey(RestUser, on_delete=models.PROTECT)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.project}: {self.creator} || {self.text}'
