import re
import requests
from django.core.management.base import BaseCommand

from aot.models import Titan, Character, Organization, Location, Episode

def load_all_data():
    return {
        "episodes": fetch_all(f"{BASE_URL}/episodes"),
        "characters": fetch_all(f"{BASE_URL}/characters"),
        "titans": fetch_all(f"{BASE_URL}/titans"),
        "organizations": fetch_all(f"{BASE_URL}/organizations"),
        "locations": fetch_all(f"{BASE_URL}/locations"),
    }

BASE_URL = "https://api.attackontitanapi.com"

def extract_id(url, resource):
    """Extract ID from URL string or return ID from dict."""
    if isinstance(url, dict):
        # If it's a dict with 'id' key, extract it directly
        return url.get("id")
    if not isinstance(url, str):
        # If it's not a string or dict, return None
        return None
    pattern = rf"/{resource}/(\d+)"
    match = re.search(pattern, url)
    return int(match.group(1)) if match else None

def character_api_id_from_url(url):
    """Extrai o id numérico de URLs .../characters/<id> ou dict com id."""
    if isinstance(url, dict):
        # If it's a dict with 'id' key, extract it directly
        return url.get("id")
    if not url or not isinstance(url, str):
        return None
    m = re.search(r"/characters/(\d+)/?$", url.strip())
    return int(m.group(1)) if m else None


def fetch_all(url):
    """Paginação no formato da API (info.next_page / info.next)."""
    results = []

    while url:
        res = requests.get(url, timeout=60).json()

        results.extend(res.get("results", []))
        info = res.get("info") or {}
        url = info.get("next_page") or info.get("next")

    return results


# ------------------------
# IMPORT FUNCTIONS
# ------------------------

def import_organizations(data):

    for org in data:
        notable_members_data = org.get("notable_members", [])
        if isinstance(notable_members_data, (str, dict)):
            notable_members_data = [notable_members_data]

        notable_members_ids = [
            extract_id(url, "characters")
            for url in notable_members_data
            if extract_id(url, "characters") is not None
        ]

        notable_former_members_data = org.get("notable_former_members", [])
        if isinstance(notable_former_members_data, (str, dict)):
            notable_former_members_data = [notable_former_members_data]

        notable_former_members_ids = [
            extract_id(url, "characters")
            for url in notable_former_members_data
            if extract_id(url, "characters") is not None
        ]

        debut_data = org.get("debut")

        if isinstance(debut_data, list) and debut_data:
            debut_data = debut_data[0]

        if isinstance(debut_data, dict):
            debut_id = debut_data.get("id")
        elif isinstance(debut_data, str):
            debut_id = extract_id(debut_data, "episodes")
        else:
            debut_id = None

        Organization.objects.update_or_create(
            api_id=org["id"],
            defaults={
                "name": org["name"],
                "img": org.get("img", ""),
                "occupations": org.get("occupations", []),
                #"notable_members": notable_members_ids,  # JSON agora
                #"notable_former_members": notable_former_members_ids,
                "affiliation": org.get("affiliation", ""),
                #"debut": None,  # 🔥 removido relacionamento
            },
        )

def import_locations(data):

    for loc in data:
        raw_inhabitants = loc.get("notable_inhabitants") or []
        if not isinstance(raw_inhabitants, list):
            raw_inhabitants = [raw_inhabitants]

        notable_inhabitants_ids = [
            extract_id(item, "characters")
            for item in raw_inhabitants
            if extract_id(item, "characters") is not None
        ]

        raw_former = loc.get("notable_former_inhabitants") or []
        if not isinstance(raw_former, list):
            raw_former = [raw_former]

        notable_former_inhabitants_ids = [
            extract_id(item, "characters")
            for item in raw_former
            if extract_id(item, "characters") is not None
        ]

        Location.objects.update_or_create(
            api_id=loc["id"],
            defaults={
                "name": loc["name"],
                "img": loc.get("img") or "",
                "territory": loc.get("territory", ""),
                "region": loc.get("region", ""),
                #"notable_inhabitants": notable_inhabitants_ids,  # JSON
                #"notable_former_inhabitants": notable_former_inhabitants_ids,
                #"debut": None,  # 🔥 removido
            },
        )


def import_titans(data):

    for t in data:
        current_inheritor_data = t.get("current_inheritor")

        if isinstance(current_inheritor_data, list) and current_inheritor_data:
            current_inheritor_data = current_inheritor_data[0]

        if isinstance(current_inheritor_data, dict):
            cur_id = current_inheritor_data.get("id")
        elif isinstance(current_inheritor_data, str):
            cur_id = character_api_id_from_url(current_inheritor_data)
        else:
            cur_id = None

        former_data = t.get("former_inheritors") or []
        if isinstance(former_data, str):
            former_data = [former_data]

        former_ids = [
            character_api_id_from_url(item) if isinstance(item, str) else item.get("id")
            for item in former_data
            if item
        ]

        Titan.objects.update_or_create(
            api_id=t["id"],
            defaults={
                "name": t["name"],
                "img": t.get("img") or "",
                "height": t.get("height") or "",
                "abilities": t.get("abilities", []),
                "allegiance": t.get("allegiance", ""),
                "current_inheritor": None,  # 🔥 removido
                #"former_inheritors": former_ids,  # JSON
            },
        )

def import_characters(data):

    for c in data:
        relatives_data = c.get("relatives") or []
        episodes_data = c.get("episodes") or []

        if isinstance(relatives_data, list):
            relatives_ids = []
            for rel in relatives_data:
                if isinstance(rel, dict) and "members" in rel:
                    for member in rel.get("members", []):
                        rel_id = extract_id(member, "characters")
                        if rel_id and rel_id != c["id"]:
                            relatives_ids.append(rel_id)
                else:
                    rel_id = extract_id(rel, "characters")
                    if rel_id and rel_id != c["id"]:
                        relatives_ids.append(rel_id)
        else:
            relatives_ids = []

        episode_ids = [
            extract_id(url, "episodes")
            for url in episodes_data
            if extract_id(url, "episodes") is not None
        ]

        Character.objects.update_or_create(
            api_id=c["id"],
            defaults={
                "name": c["name"],
                "img": c.get("img", ""),
                "alias": c.get("alias", []),
                "species": c.get("species", []),
                "gender": c.get("gender", ""),
                "age": c.get("age"),
                "height": c.get("height", ""),
                "birthplace": c.get("birthplace", ""),
                "residence": c.get("residence", ""),
                "status": c.get("status", ""),
                "occupation": c.get("occupation", ""),
                "groups": c.get("groups", []),
                "roles": c.get("roles", []),
                #"relatives": relatives_ids,  # JSON
                #"episodes": episode_ids,  # JSON
            },
        )


def import_episodes(data):

    for ep in data:
        characters_data = ep.get("characters", [])
        if isinstance(characters_data, (str, dict)):
            characters_data = [characters_data]

        character_ids = [
            extract_id(url, "characters")
            for url in characters_data
            if extract_id(url, "characters") is not None
        ]

        Episode.objects.update_or_create(
            api_id=ep["id"],
            defaults={
                "name": ep["name"],
                "img": ep.get("img", ""),
                "episode_code": ep.get("episode", ""),
                #"characters": character_ids,  # JSON
            },
        )

"""
Link functions
"""


def link_characters(data):
    for c in data:
        character = Character.objects.filter(api_id=c["id"]).first()
        if not character:
            continue

        # ------------------------
        # RELATIVES
        # ------------------------
        relatives_data = c.get("relatives") or []
        relatives_ids = []

        if isinstance(relatives_data, list):
            for rel in relatives_data:
                if isinstance(rel, dict) and "members" in rel:
                    for member in rel.get("members", []):
                        rel_id = extract_id(member, "characters")
                        if rel_id and rel_id != c["id"]:
                            relatives_ids.append(rel_id)
                else:
                    rel_id = extract_id(rel, "characters")
                    if rel_id and rel_id != c["id"]:
                        relatives_ids.append(rel_id)

        relatives = Character.objects.filter(api_id__in=relatives_ids)
        character.relatives.set(relatives)

        # ------------------------
        # EPISODES
        # ------------------------
        episodes_data = c.get("episodes") or []
        episode_ids = [
            extract_id(ep, "episodes")
            for ep in episodes_data
            if extract_id(ep, "episodes") is not None
        ]

        episodes = Episode.objects.filter(api_id__in=episode_ids)
        character.episodes.set(episodes)

def link_episodes(data):

    for ep in data:
        episode = Episode.objects.filter(api_id=ep["id"]).first()
        if not episode:
            continue

        characters_data = ep.get("characters") or []
        if not isinstance(characters_data, list):
            characters_data = [characters_data]

        character_ids = [
            extract_id(c, "characters")
            for c in characters_data
            if extract_id(c, "characters") is not None
        ]

        characters = Character.objects.filter(api_id__in=character_ids)
        episode.characters.set(characters)

def link_titans(data):

    for t in data:
        titan = Titan.objects.filter(api_id=t["id"]).first()
        if not titan:
            continue

        # ------------------------
        # CURRENT INHERITOR
        # ------------------------
        cur_data = t.get("current_inheritor")

        if isinstance(cur_data, list) and cur_data:
            cur_data = cur_data[0]

        if isinstance(cur_data, dict):
            cur_id = cur_data.get("id")
        else:
            cur_id = character_api_id_from_url(cur_data)

        if cur_id:
            titan.current_inheritor = Character.objects.filter(api_id=cur_id).first()
        else:
            titan.current_inheritor = None

        titan.save(update_fields=["current_inheritor"])

        # ------------------------
        # FORMER INHERITORS
        # ------------------------
        former_data = t.get("former_inheritors") or []

        if not isinstance(former_data, list):
            former_data = [former_data]

        former_ids = [
            character_api_id_from_url(item)
            if isinstance(item, str)
            else item.get("id")
            for item in former_data
            if item
        ]

        characters = Character.objects.filter(api_id__in=former_ids)
        titan.former_inheritors.set(characters)

def link_locations(data):
    for loc in data:
        location = Location.objects.filter(api_id=loc["id"]).first()
        if not location:
            continue

        # ------------------------
        # NOTABLE INHABITANTS
        # ------------------------
        inhabitants_data = loc.get("notable_inhabitants") or []
        if not isinstance(inhabitants_data, list):
            inhabitants_data = [inhabitants_data]

        ids = [
            extract_id(item, "characters")
            for item in inhabitants_data
            if extract_id(item, "characters") is not None
        ]

        characters = Character.objects.filter(api_id__in=ids)
        location.notable_inhabitants.set(characters)

        # ------------------------
        # DEBUT
        # ------------------------
        debut_data = loc.get("debut")

        if isinstance(debut_data, list) and debut_data:
            debut_data = debut_data[0]

        if isinstance(debut_data, dict):
            debut_id = debut_data.get("id")
        else:
            debut_id = extract_id(debut_data, "episodes")

        if debut_id:
            location.debut = Episode.objects.filter(api_id=debut_id).first()
        else:
            location.debut = None

        location.save(update_fields=["debut"])

def link_organizations(data):
    for org in data:
        organization = Organization.objects.filter(api_id=org["id"]).first()
        if not organization:
            continue

        members_data = org.get("notable_members") or []

        if not isinstance(members_data, list):
            members_data = [members_data]

        member_ids = [
            extract_id(item, "characters")
            for item in members_data
            if extract_id(item, "characters") is not None
        ]

        members = Character.objects.filter(api_id__in=member_ids)

        organization.notable_members.set(members)


        debut_data = org.get("debut")

        if isinstance(debut_data, list) and debut_data:
            debut_data = debut_data[0]

        if isinstance(debut_data, dict):
            debut_id = debut_data.get("id")
        else:
            debut_id = extract_id(debut_data, "episodes")

        if debut_id:
            organization.debut = Episode.objects.filter(api_id=debut_id).first()
        else:
            organization.debut = None

        organization.save(update_fields=["debut"])


class Command(BaseCommand):
    help = "Importa dados da API do Attack on Titan para o banco de dados local."
    def handle(self, *args, **kwargs):

        self.stdout.write("Loading API data once...")
        data = load_all_data()

        self.stdout.write("FASE 1 - Base data")
        import_episodes(data["episodes"])
        import_characters(data["characters"])
        import_titans(data["titans"])
        import_organizations(data["organizations"])
        import_locations(data["locations"])

        self.stdout.write("FASE 2 - Linking")
        link_characters(data["characters"])
        link_episodes(data["episodes"])
        link_titans(data["titans"])
        link_organizations(data["organizations"])
        link_locations(data["locations"])

        self.stdout.write(self.style.SUCCESS("Pipeline completo!"))