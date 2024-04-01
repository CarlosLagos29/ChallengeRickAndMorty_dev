import { gql } from '@apollo/client';

const GET_CHARACTERS = gql`
query ($page: Int!, $gender: String, $status: String, $species: String, $name: String) {
  characters(page: $page, , filter: { gender: $gender, status: $status, species: $species, name: $name }) {
    info {
      pages
    }
    results {
      id
      image
    }
  }
}
`;

export default GET_CHARACTERS;