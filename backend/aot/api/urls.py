from rest_framework.routers import DefaultRouter
from .views import (
    TitanViewSet,
    CharacterViewSet,
    OrganizationViewSet,
    LocationViewSet,
    EpisodeViewSet
)

router = DefaultRouter()
router.register(r"titans", TitanViewSet)
router.register(r"characters", CharacterViewSet)
router.register(r"organizations", OrganizationViewSet)
router.register(r"locations", LocationViewSet)
router.register(r"episodes", EpisodeViewSet)

urlpatterns = router.urls