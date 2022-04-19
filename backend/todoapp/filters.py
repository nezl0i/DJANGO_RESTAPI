from django_filters import rest_framework as filters
from .models import ToDo


class TodoFilter(filters.FilterSet):
    on_date = filters.DateTimeFilter(field_name="create", lookup_expr='gte', input_formats=['%Y-%m-%dT%H:%M'])
    off_date = filters.DateTimeFilter(field_name="create", lookup_expr='lte', input_formats=['%Y-%m-%dT%H:%M'])
    create = filters.DateFromToRangeFilter()

    class Meta:
        model = ToDo
        fields = ['project', 'create']
