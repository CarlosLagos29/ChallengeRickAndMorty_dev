export type Status = 'Alive' | 'Dead' | 'unknown';

export type Gender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export interface CharacterSummary {
  id: string;
  name: string;
  image: string;
}

export interface Episode {
  id: string;
  name: string;
}

export interface Character extends CharacterSummary {
  status: Status;
  gender: Gender;
  species: string;
  type: string;
  origin: { name: string } | null;
  location: { name: string } | null;
  episode: Episode[];
}

export interface CharacterFilters {
  name: string;
  status: Status | '';
  gender: Gender | '';
  species: string;
}
