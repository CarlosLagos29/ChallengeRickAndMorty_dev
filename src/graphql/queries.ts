import { gql, type TypedDocumentNode } from '@apollo/client';
import type { Character, CharacterSummary, Gender, Status } from '../types/character';

interface CharactersData {
  characters: {
    info: { pages: number | null };
    results: CharacterSummary[];
  } | null;
}

interface CharactersVariables {
  page: number;
  filter: {
    name?: string;
    status?: Status;
    gender?: Gender;
    species?: string;
  };
}

export const GET_CHARACTERS: TypedDocumentNode<CharactersData, CharactersVariables> = gql`
  query GetCharacters($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        pages
      }
      results {
        id
        name
        image
      }
    }
  }
`;

interface CharacterData {
  character: Character | null;
}

interface CharacterVariables {
  id: string;
}

export const GET_CHARACTER: TypedDocumentNode<CharacterData, CharacterVariables> = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      gender
      species
      type
      origin {
        name
      }
      location {
        name
      }
      episode {
        id
        name
      }
    }
  }
`;

interface CharactersCountData {
  characters: { info: { count: number } } | null;
}

export const GET_CHARACTERS_COUNT: TypedDocumentNode<CharactersCountData> = gql`
  query GetCharactersCount {
    characters {
      info {
        count
      }
    }
  }
`;

interface SpeciesData {
  charactersByIds: { species: string }[];
}

interface SpeciesVariables {
  ids: string[];
}

export const GET_SPECIES: TypedDocumentNode<SpeciesData, SpeciesVariables> = gql`
  query GetSpecies($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      species
    }
  }
`;
