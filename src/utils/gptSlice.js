import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        isGptEnabled: false,
        gptMovies: null,
        gptSearchLoading: false,
        gptSearchError: null,
    },
    reducers: {
        handleGptSearch: (state) => {
            state.isGptEnabled = !state.isGptEnabled;
        },
        setGptMovies: (state, action) => {
            state.gptMovies = action.payload;
        },
        setGptSearchLoading: (state, action) => {
            state.gptSearchLoading = action.payload;
        },
        setGptSearchError: (state, action) => {
            state.gptSearchError = action.payload;
        },
        clearGptMovies: (state) => {
            state.gptMovies = null;
            state.gptSearchError = null;
        },
    }
})

export const {
    handleGptSearch,
    setGptMovies,
    setGptSearchLoading,
    setGptSearchError,
    clearGptMovies,
} = gptSlice.actions;

export default gptSlice.reducer;
