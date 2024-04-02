import { gql } from '@apollo/client';

const GET_CHARACTER_BY_ID = gql`
query($id: ID! ) {
    character(id: $id) {
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
      episode{
        id
        name
      }
    }
  }
`;

export default GET_CHARACTER_BY_ID;