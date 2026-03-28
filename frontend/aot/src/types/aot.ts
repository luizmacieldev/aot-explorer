export type Titan {
  id: number;
  name: string;
  img: string;
}

export type Character {
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