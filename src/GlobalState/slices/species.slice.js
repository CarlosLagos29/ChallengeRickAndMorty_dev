import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../apolloSetings/client';
import GET_SPECIES from '../querys/getSpecies';

export const setSpecies = createAsyncThunk('species/setSpecies', async () => {
    try {
        let Allspecies = new Set();
        let page = 1;
        while(page <= 42){
            const {data} = await client.query({
                query: GET_SPECIES,
                variables: {page}
            });
            data.characters.results.forEach(sp => {
                Allspecies.add(sp.species)
            });
            page++
        }
        return Array.from(Allspecies);
    } catch (error) {
        console.error(error);
    }
})

const speciesSlice = createSlice({
    name: 'species',
    initialState:{
        allSpecies:[],
    },
    reducers:{

    },
    extraReducers: (builder) =>{
        builder.addCase(setSpecies.fulfilled, (state, action) => {
            state.allSpecies = action.payload
        })
    }
});

export default speciesSlice.reducer;