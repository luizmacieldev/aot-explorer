from rest_framework.decorators import api_view
from rest_framework.response import Response

from .services import (
    get_gender_distribution,
    get_status_distribution,
    get_top_characters_by_appearances,
    get_top_episodes
)

@api_view(['GET'])
def gender_distribution_view(request):
    return Response(get_gender_distribution())

@api_view(['GET'])
def status_distribution_view(request):
    return Response(get_status_distribution())


@api_view(['GET'])
def top_episodes_view(request):
    return Response(get_top_episodes())

@api_view(['GET'])
def top_characters(request):
    return Response(get_top_characters_by_appearances())