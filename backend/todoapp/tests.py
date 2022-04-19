from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase, force_authenticate
from .views import ProjectViewSet
from .models import Project, ToDo
from users.models import RestUser
from mixer.backend.django import mixer


class TestProjectApi(TestCase):

    def setUp(self) -> None:
        self.admin = RestUser.objects.create_superuser('admin', email='admin@gb.local', password='restapi')

    def test_api(self):
        factory = APIRequestFactory()
        request = factory.get('/api/users')
        force_authenticate(request, self.admin)
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_api_1(self):
        factory = APIRequestFactory()
        request = factory.get('/api/projects')
        force_authenticate(request, self.admin)
        view = ProjectViewSet.as_view({'get': 'list'})
        Project.objects.create(name='Project_9')
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_api_2(self):
        client = APIClient()
        response = client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(len(response.data), 1)

    def test_api_3(self):
        client = APIClient()
        ToDo.objects.create(text='Cool_Text', creator_id=3, project_id=2)
        response = client.get('/api/todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class TestProjectClientApi(APITestCase):
    def setUp(self) -> None:
        self.user = mixer.blend(RestUser, username='bob')
        self.project = mixer.blend(ToDo, creator__id=6)
        self.admin = RestUser.objects.create_superuser('admin', email='admin@gb.local', password='restapi')

    def test_client_api(self):
        self.client.login(username='admin', password='restapi')
        self.client.logout()
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_client_api_1(self):
        self.client.force_login(self.admin)
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
