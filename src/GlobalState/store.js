import { configureStore } from '@reduxjs/toolkit';
import characterSlice from './slices/character.slice';
import speciesSlice from './slices/species.slice';

const store = configureStore({
    reducer:{
        characters: characterSlice,
        species: speciesSlice,
    }
});

export default store;