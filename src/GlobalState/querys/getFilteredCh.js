import { gql } from '@apollo/client';

const GET_FILTERED_CHARACTERS = gql`
query ($page: Int,$gender: String, $status:String , $specie:String ) {
    characters(page: $page ,filter: { gender: $gender, status: $status, species: $specie }) {
      results {
        id
        image
      }
    }
  }
`;

export default GET_FILTERED_CHARACTERS;