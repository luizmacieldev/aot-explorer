export interface CharacterBrief {
  id: number;
  name: string;
  img: string;
}

export interface Titan {
  id: number;
  name: string;
  img: string;
  height: string;
  abilities: string[];
  allegiance: string;
  current_inheritor: CharacterBrief | null;
  former_inheritors: CharacterBrief[];
}

export interface Character {
  id: number;
  name: string;
  img: string;
  status: string;
  gender: string;
  height:string;
  occupation: string | string[];
  alias: string[];
  species: string[];
  roles: string[];
  groups: {
    name: string;
    sub_groups: string[];
  }[];
  episodes: {
    id: number;
    name: string;
    episode: string;
  }[];
}


export interface Episode {
  id: number;
  name: string;
  img: string;
  episode: string;
  characters: Character[];
}

export interface Organization {
  id: number;
  name: string;
  img: string;
  occupations: string[];
  notable_members: Character[];
  affiliation: string;
  debut: Episode | null;
}


export interface Location {
  id: number;
  name: string;
  img: string;
  territory: string;
  region: string;
  notable_inhabitants: Character[];
  notable_former_inhabitants: Character[];
  debut: Episode | null;
}