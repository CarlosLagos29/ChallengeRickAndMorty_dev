import { gql } from '@apollo/client';

export const GET_CHARACTERS_COUNT = gql`
  query GetCharactersCount {
    characters {
      info {
        count
      }
    }
  }
`;

const GET_SPECIES = gql`
  query GetSpecies($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      species
    }
  }
`;

export default GET_SPECIES;
