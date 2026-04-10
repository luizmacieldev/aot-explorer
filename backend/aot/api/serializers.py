from rest_framework import serializers
from aot.models import Titan, Character, Organization, Location, Episode

class CharacterSimpleSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="api_id", read_only=True)

    class Meta:
        model = Character
        fields = ("id", "name", "img")

class CharacterSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="api_id", read_only=True)
    relatives = CharacterSimpleSerializer(many=True, read_only=True)
    episodes = serializers.SerializerMethodField()

    class Meta:
        model = Character
        fields = (
            "id",
            "name",
            "img",
            "alias",
            "species",
            "gender",
            "age",
            "height",
            "relatives",
            "birthplace",
            "residence",
            "status",
            "occupation",
            "groups",
            "roles",
            "episodes",
        )

    def get_episodes(self, obj):
        return [
            {
                "id": ep.api_id,
                "name": ep.name,
                "episode": ep.episode_code,
            }
            for ep in obj.episodes.all()
        ]

class OrganizationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="api_id", read_only=True)
    notable_members = CharacterSimpleSerializer(many=True, read_only=True)
    debut = serializers.SerializerMethodField()

    class Meta:
        model = Organization
        fields = (
            "id",
            "name",
            "img",
            "occupations",
            "notable_members",
            "notable_former_members",
            "affiliation",
            "debut",
        )

    def get_debut(self, obj):
        if obj.debut:
            return {
                "id": obj.debut.api_id,
                "name": obj.debut.name,
            }
        return None
    
class LocationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="api_id", read_only=True)
    notable_inhabitants = CharacterSimpleSerializer(many=True, read_only=True)
    debut = serializers.SerializerMethodField()

    class Meta:
        model = Location
        fields = (
            "id",
            "name",
            "img",
            "territory",
            "region",
            "notable_inhabitants",
            "notable_former_inhabitants",
            "debut",
        )

    def get_debut(self, obj):
        if obj.debut:
            return {
                "id": obj.debut.api_id,
                "name": obj.debut.name,
            }
        return None
    
class EpisodeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="api_id", read_only=True)
    episode = serializers.CharField(source="episode_code", read_only=True)
    characters = CharacterSimpleSerializer(many=True, read_only=True)

    class Meta:
        model = Episode
        fields = ("id", "name", "img", "episode", "characters")


class TitanSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source="api_id", read_only=True)
    current_inheritor = CharacterSimpleSerializer(read_only=True)
    former_inheritors = CharacterSimpleSerializer(many=True, read_only=True)

    class Meta:
        model = Titan
        fields = (
            "id",
            "name",
            "img",
            "height",
            "abilities",
            "current_inheritor",
            "former_inheritors",
            "allegiance",
        )
