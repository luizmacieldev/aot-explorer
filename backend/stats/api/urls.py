from django.urls import path
from .views import (
    top_characters,
    gender_distribution_view,
    status_distribution_view,
    top_episodes_view
)

urlpatterns = [
    path('top-characters/', top_characters),
    path('gender-distribution/', gender_distribution_view),
    path('status-distribution/', status_distribution_view),
    path('top-episodes/', top_episodes_view),
]