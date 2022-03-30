from django.contrib import admin
from django.urls import path, include, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from todoapp.views import ToDoViewSet, ProjectViewSet
from users.views import RestUserViewSet

router = DefaultRouter()
router.register('users', RestUserViewSet)
router.register('todo', ToDoViewSet)
router.register('projects', ProjectViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="Toto application backend",
        default_version='0.1',
        description="Documentation to out project",
        contact=openapi.Contact(email="admin@admin.local"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include(router.urls)),
    path('api-auth-token/', obtain_auth_token),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$',
            schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema-redoc'),
    # http://127.0.0.1:8009/api/0.2/users/
    # re_path(r'^api/(?P<version>\d\.\d)/users/$', RestUserViewSet.as_view()),

    # http://127.0.0.1:8009/api/users/0.1
    # path('api/users/0.1', include('users.urls', namespace='0.1')),
    # path('api/users/0.2', include('users.urls', namespace='0.2')),
]
