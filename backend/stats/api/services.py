from django.db.models import Count, Value
from django.db.models.functions import Coalesce
from aot.models import Character, Episode

def get_top_characters_by_appearances(limit=10):
    return list(
        Character.objects
        .annotate(appearances=Count('episodes'))
        .order_by('-appearances')[:limit]
        .values('name', 'appearances')
    )

def get_gender_distribution():
    allowed_genders = ["Male", "Female", "unknown"]

    return list(
        Character.objects
        .filter(gender__in=allowed_genders)
        .values('gender')
        .annotate(total=Count('id'))
        .order_by('-total')
    )



def get_status_distribution():
    return list(
        Character.objects
        .annotate(
            status_clean=Coalesce('status', Value('Unknown'))
        )
        .values('status_clean')
        .annotate(total=Count('id'))
        .order_by('-total')
    )


def get_top_episodes(limit=10):
    return list(
        Episode.objects
        .annotate(total_characters=Count('characters_in_episode'))
        .order_by('-total_characters')[:limit]
        .values('id', 'name', 'episode_code', 'total_characters')
    )