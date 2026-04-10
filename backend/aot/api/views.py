from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from aot.models import Titan, Character, Organization, Location, Episode
from .serializers import (
    TitanSerializer,
    CharacterSerializer,
    OrganizationSerializer,
    LocationSerializer,
    EpisodeSerializer
)


class AttackOnTitanApiPagination(PageNumberPagination):
    """ https://api.attackontitanapi.com (info + results)."""

    page_size = 20
    page_query_param = "page"
    max_page_size = 200

    def get_paginated_response(self, data):
        paginator = self.page.paginator
        return Response(
            {
                "info": {
                    "count": paginator.count,
                    "pages": paginator.num_pages,
                    "next_page": self.get_next_link(),
                    "prev_page": self.get_previous_link(),
                },
                "results": data,
            }
        )


class TitanViewSet(viewsets.ModelViewSet):
    queryset = (
        Titan.objects.all()
        .select_related("current_inheritor")
        .prefetch_related("former_inheritors")
        .order_by("api_id", "id")
    )
    serializer_class = TitanSerializer
    pagination_class = AttackOnTitanApiPagination


class CharacterViewSet(viewsets.ModelViewSet):
    queryset = (
        Character.objects.all()
        .prefetch_related("relatives", "episodes")
    )
    serializer_class = CharacterSerializer
    pagination_class = AttackOnTitanApiPagination


class OrganizationViewSet(viewsets.ModelViewSet):
    queryset = (
        Organization.objects.all()
        .select_related("debut")
        .prefetch_related("notable_members")
    )
    serializer_class = OrganizationSerializer
    pagination_class = AttackOnTitanApiPagination


class LocationViewSet(viewsets.ModelViewSet):
    queryset = (
        Location.objects.all()
        .select_related("debut")
        .prefetch_related("notable_inhabitants")
)
    serializer_class = LocationSerializer
    pagination_class = AttackOnTitanApiPagination


class EpisodeViewSet(viewsets.ModelViewSet):
    queryset = (
        Episode.objects.all()
        .prefetch_related("characters")
        .order_by("api_id", "id")
    )
    serializer_class = EpisodeSerializer
    pagination_class = AttackOnTitanApiPagination
    