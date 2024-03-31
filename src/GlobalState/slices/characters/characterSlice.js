import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../../apolloSetings/client';
import { gql } from '@apollo/client';

const GET_CHARACTERS = gql`
query ($name: String) {
  characters (filter: { name: $name }) {
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

export const fetchData =  createAsyncThunk( 'characters/fetchData' ,async (name) => {
  try {
    const { data } = await client.query({
      query: GET_CHARACTERS,
      variables: {name}
    });
    return data.characters.results;

  } catch (error) {
    console.error(error)
  }
});


const characterSlice = createSlice({
  name: 'characters',
  initialState: {
    characters: [],
  },
  reducers: {
    setCharacters: async (state, action)=> {
      state.data = action.payload
    },
  },
  extraReducers: (builder) => {
    // Define cómo manejar las acciones creadas por createAsyncThunk
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.characters = action.payload;
    });
  }
});

export const { setCharacters } = characterSlice.actions;
export default characterSlice.reducer;

