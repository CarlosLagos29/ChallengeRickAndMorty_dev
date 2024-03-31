import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../apolloSetings/client';
import GET_CHARACTERS from '../querys/getCharacters';
import GET_FILTERED_CHARACTERS from '../querys/getFilteredCh';

export const setCharacters =  createAsyncThunk( 'characters/setCharacters' ,async ({page,name}) => {
  try {

    const { data } = await client.query({
      query: GET_CHARACTERS,
      variables: {page , name}
    });
    return data.characters.results;

  } catch (error) {
    console.error(error);
  }
});

export const filterCharacters = createAsyncThunk('characters/filterCharacters',async ({status, gender, specie})=>{
  try {
    const{data} = await client.query({
      query: GET_FILTERED_CHARACTERS,
      variables:{status, gender, specie},
    });
    return data.characters.results;
  } catch (error) {
    console.error(error);
  }
})


const characterSlice = createSlice({
  name: 'characters',
  initialState: {
    characters: [],
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(setCharacters.fulfilled, (state, action) => {
      state.characters = action.payload;
    });
    builder.addCase(filterCharacters.fulfilled, (state, action) =>{
      state.characters = action.payload;
    })
  },
  
});

export default characterSlice.reducer;

