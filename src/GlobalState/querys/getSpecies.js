import { gql } from '@apollo/client';

const GET_SPECIES = gql`
query GetSpecies ($page: Int!) {
    characters (page: $page){
      results {
          species
      }
    }
  }
`;

export default GET_SPECIES;