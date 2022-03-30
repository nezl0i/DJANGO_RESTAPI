from django.contrib import admin
from .models import Project, ToDo


class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'get_users', 'repository']


class TodoAdmin(admin.ModelAdmin):
    list_display = ['project', 'text', 'create', 'update', 'creator', 'is_active']


admin.site.register(Project, ProjectAdmin)
admin.site.register(ToDo, TodoAdmin)
