import { configureStore } from '@reduxjs/toolkit';
import characterSlice from './slices/characters/characterSlice';

const store = configureStore({
    reducer:{
        characters: characterSlice,
    }
})

export default store