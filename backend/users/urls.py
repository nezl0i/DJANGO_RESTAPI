from django.urls import path
from .views import RestUserViewSet

app_name = 'users'

urlpatterns = [
    path('', RestUserViewSet.as_view()),
]
