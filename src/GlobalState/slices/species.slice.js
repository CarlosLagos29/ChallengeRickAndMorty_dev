import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import client from '../apolloSetings/client';
import GET_SPECIES, { GET_CHARACTERS_COUNT } from '../querys/getSpecies';

export const setSpecies = createAsyncThunk('species/setSpecies', async (_, { rejectWithValue }) => {
    try {
        const { data: countData } = await client.query({ query: GET_CHARACTERS_COUNT });
        const ids = Array.from({ length: countData.characters.info.count }, (_, i) => i + 1);
        const { data } = await client.query({
            query: GET_SPECIES,
            variables: { ids }
        });
        return [...new Set(data.charactersByIds.map(sp => sp.species))].sort();
    } catch (error) {
        console.error(error);
        return rejectWithValue(error.message);
    }
}, {
    condition: (_, { getState }) => {
        const { allSpecies, loading } = getState().species;
        return allSpecies.length === 0 && !loading;
    }
});

const speciesSlice = createSlice({
    name: 'species',
    initialState:{
        allSpecies:[],
        loading: false,
    },
    reducers:{

    },
    extraReducers: (builder) =>{
        builder.addCase(setSpecies.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(setSpecies.fulfilled, (state, action) => {
            state.allSpecies = action.payload;
            state.loading = false;
        });
        builder.addCase(setSpecies.rejected, (state) => {
            state.loading = false;
        });
    }
});

export default speciesSlice.reducer;
