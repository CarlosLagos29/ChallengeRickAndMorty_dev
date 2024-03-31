import { gql } from '@apollo/client';

const GET_CHARACTERS = gql`
query ($page: Int,$name: String) {
  characters (page: $page,filter: { name: $name }) {
    results {
      id
      name
      status
      gender
      type
      species
      image
      origin {
        name
      }
      location {
        name
      }
    }
  }
}
`;

export default GET_CHARACTERS;