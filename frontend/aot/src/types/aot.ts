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