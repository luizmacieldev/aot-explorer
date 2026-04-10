from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey

class Organization(models.Model):
    api_id = models.PositiveIntegerField(unique=True, null=True, blank=True)
    name = models.CharField(max_length=255)
    img = models.CharField(max_length=2048, blank=True)
    occupations = models.JSONField(default=list, blank=True)
    notable_members = models.ManyToManyField(
        "Character",
        blank=True,
        related_name="organizations_as_notable_member"
    )
    notable_former_members = models.JSONField(default=list, blank=True)
    affiliation = models.CharField(max_length=255, blank=True)
    debut = models.ForeignKey(
        "Episode",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="organizations_debuted_in_episode"
    )

    def __str__(self):
        return self.name


class Location(models.Model):
    api_id = models.PositiveIntegerField(unique=True, null=True, blank=True)
    name = models.CharField(max_length=255)
    img = models.CharField(max_length=2048, blank=True)
    territory = models.CharField(max_length=512, blank=True)
    region = models.CharField(max_length=512, blank=True)
    notable_inhabitants = models.ManyToManyField(
        "Character",
        blank=True,
        related_name="locations_as_former_inhabitant"
    )
    notable_former_inhabitants = models.JSONField(default=list, blank=True)
    debut = models.ForeignKey(
        "Episode",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="debut_location"
    )

    def __str__(self):
        return self.name


class Character(models.Model):
    api_id = models.PositiveIntegerField(unique=True, null=True, blank=True)
    name = models.CharField(max_length=255)
    img = models.URLField(blank=True)
    alias = models.JSONField(default=list, blank=True)
    species = models.JSONField(default=list, blank=True)
    gender = models.CharField(max_length=128, blank=True)
    age = models.JSONField(null=True, blank=True)
    height = models.CharField(max_length=255, blank=True)
    relatives = models.ManyToManyField(
        "Character",
        blank=True,
        related_name="related_characters",
    )
    birthplace = models.CharField(max_length=255, blank=True)
    residence = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=128, blank=True)
    occupation = models.CharField(max_length=255, blank=True)
    groups = models.JSONField(default=list, blank=True)
    roles = models.JSONField(default=list, blank=True)
    episodes = models.ManyToManyField(
    "Episode",
    blank=True,
    related_name="characters_in_episode"
)

    def __str__(self):
        return self.name


class Titan(models.Model):
    api_id = models.PositiveIntegerField(unique=True, null=True, blank=True)
    name = models.CharField(max_length=255)
    img = models.CharField(max_length=2048, blank=True)
    height = models.CharField(max_length=64, blank=True)
    abilities = models.JSONField(default=list, blank=True)
    allegiance = models.CharField(max_length=255, blank=True)

    current_inheritor = models.ForeignKey(
        "Character",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="titans_as_current_inheritor",
    )
    former_inheritors = models.ManyToManyField(
        "Character",
        blank=True,
        related_name="titans_as_former_inheritor",
    )

    def __str__(self):
        return self.name


class Episode(models.Model):
    api_id = models.PositiveIntegerField(unique=True, null=True, blank=True)
    name = models.CharField(max_length=512)
    img = models.URLField(blank=True)
    episode_code = models.CharField(max_length=32, blank=True)
    characters = models.ManyToManyField(
    "Character",
    blank=True,
    related_name="episodes_with_character"
    )

    def __str__(self):
        return self.name
    