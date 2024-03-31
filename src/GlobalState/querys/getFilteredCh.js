import { gql } from '@apollo/client';

const GET_FILTERED_CHARACTERS = gql`
query ($gender: String, $status:String , $specie:String ) {
    characters(filter: { gender: $gender, status: $status, species: $specie }) {
      results {
        id
        image
      }
    }
  }
`;

export default GET_FILTERED_CHARACTERS