from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token
from todoapp.views import ToDoViewSet, ProjectViewSet
from users.views import RestUserViewSet

router = DefaultRouter()
router.register('users', RestUserViewSet)
router.register('todo', ToDoViewSet)
router.register('projects', ProjectViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-auth-token/', obtain_auth_token),
    path('api-jwt-auth-token/', obtain_jwt_token),
    path('api-jwt-token-refresh/', refresh_jwt_token),
    path('api-jwt-token-verify/', verify_jwt_token),
]
