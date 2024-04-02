import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../apolloSetings/client';
import GET_CHARACTERS from '../querys/getCharacters';

export const setCharacters =  createAsyncThunk( 'characters/setCharacters' ,async ({page ,filters}) => {
  try {
    const { gender, status, species, name } = filters;
    const { data } = await client.query({
      query: GET_CHARACTERS,
      variables: { page, gender, status, species, name }
    });
    
    return data.characters
  } catch (error) {
    console.error(error);
  }
});

const characterSlice = createSlice({
  name: 'characters',
  initialState: {
    characters: [],
    gender: "",
    species: "",
    status: "",
    name:"",
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {
    nextPage: (state) => {
      if(state.currentPage < state.totalPages){
        state.currentPage ++
      }
    },
    prevPage: (state)=>{
      if(state.currentPage > 1){
        state.currentPage --
      }
    },
    setPage: (state, action) => {
      state.currentPage = parseInt(action.payload);
    },
    explore: (state, action) => {
      state.currentPage = 1;
      state.name = action.payload;
    },
    filtered: (state,action) => {
      const {statusFilter,genderFilter, specieFilter } = action.payload;
      state.currentPage = 1;
      state.status = statusFilter;
      state.gender = genderFilter;
      state.species = specieFilter
    },
    resetFilters: (state) => {
      state.currentPage = 1;
      state.gender = "";
      state.species = "";
      state.status = "";
      state.name = "";
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setCharacters.fulfilled, (state, action) => {
      state.characters = action.payload.results;
      state.totalPages = action.payload.info.pages; 
    });
  },
});

export const {setPage, prevPage, nextPage, explore, filtered,resetFilters} = characterSlice.actions
export default characterSlice.reducer;

