from django.contrib import admin

from aot.models import Titan, Character, Organization, Location, Episode,  Favorite


@admin.register(Titan)
class TitanAdmin(admin.ModelAdmin):
    list_display = ("api_id", "name", "height", "allegiance", "current_inheritor")
    search_fields = ("name", "allegiance")
    filter_horizontal = ("former_inheritors",)
    autocomplete_fields = ("current_inheritor",)
    readonly_fields = ("api_id",)


@admin.register(Character)
class CharacterAdmin(admin.ModelAdmin):
    list_display = ("api_id", "name", "status", "gender")
    search_fields = ("name", "status", "gender")
    readonly_fields = ("api_id",)


@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ("api_id", "name", "affiliation")
    search_fields = ("name", "affiliation")
    readonly_fields = ("api_id",)


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ("api_id", "name", "territory", "region")
    search_fields = ("name", "territory", "region")
    readonly_fields = ("api_id",)
    fields = ("api_id", "name", "img", "territory", "region", "notable_inhabitants", "notable_former_inhabitants", "debut")
    


@admin.register(Episode)
class EpisodeAdmin(admin.ModelAdmin):
    list_display = ("api_id", "episode_code", "name")
    search_fields = ("name", "episode_code")
    readonly_fields = ("api_id",)


@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ("user", "content_object", "created_at")
    list_filter = ("user", "content_type")
    search_fields = ("user__username",)
    