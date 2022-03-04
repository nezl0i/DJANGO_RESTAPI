from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import RestUser


class UserAdmin(BaseUserAdmin):

    list_display = ['username', 'email', 'first_name', 'last_name', 'is_staff', 'is_superuser', 'is_active']
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)


admin.site.register(RestUser, UserAdmin)

