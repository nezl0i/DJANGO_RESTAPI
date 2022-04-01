import graphene
from graphene_django import DjangoObjectType
from .models import Project, ToDo
from users.models import RestUser
from django.contrib.auth.hashers import make_password


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class RestUsersType(DjangoObjectType):
    class Meta:
        model = RestUser
        fields = '__all__'


class Query(graphene.ObjectType):
    projects = graphene.List(ProjectType)

    def resolve_projects(root, info):
        return Project.objects.all()

    todos = graphene.List(ToDoType)

    def resolve_todos(root, info):
        return ToDo.objects.all()

    users = graphene.List(RestUsersType)

    def resolve_users(root, info):
        return RestUser.objects.all()


class RestUserCreateMutation(graphene.Mutation):
    """
        mutation createUser {
        createUser (password: "12345", username: "Vivaldy", firstName: "viva", lastName: "vivaldy", email: "viva@gmail.com"){
        restUser {
          id
          username
          firstName
          lastName
          email
          password
          }
        }
    }
    """
    class Arguments:
        password = graphene.String(required=True)
        username = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        email = graphene.String(required=True)

    rest_user = graphene.Field(RestUsersType)

    @classmethod
    def mutate(cls, root, info, password, username, first_name, last_name, email):
        rest_user = RestUser(
            password=make_password(password),
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email)

        rest_user.save()
        return cls(rest_user)


class RestUserUpdateMutation(graphene.Mutation):
    """
    mutation updateUser {
        updateUser (pk: 17, password: "12345"){
        restUser {
          id
          username
          firstName
          lastName
          email
          password
            }
         }
       }

    """
    class Arguments:
        pk = graphene.Int(required=True)
        username = graphene.String(required=False)
        password = graphene.String(required=False)
        first_name = graphene.String(required=False)
        last_name = graphene.String(required=False)
        email = graphene.String(required=False)

    rest_user = graphene.Field(RestUsersType)

    @classmethod
    def mutate(cls, root, info, pk, username=None, password=None, first_name=None, last_name=None, email=None):
        rest_user = RestUser.objects.get(pk=pk)
        if username:
            rest_user.username = username
        if password:
            rest_user.password = make_password(password)
        if first_name:
            rest_user.first_name = first_name
        if last_name:
            rest_user.last_name = last_name
        if email:
            rest_user.email = email
        if username or password or first_name or last_name or email:
            rest_user.save()
        return cls(rest_user)


class Mutations(graphene.ObjectType):
    create_user = RestUserCreateMutation.Field()
    update_user = RestUserUpdateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
