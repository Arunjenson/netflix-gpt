import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        isGptEnabled : false,
    },
    reducers: {
        handleGptSearch: (state) => {
            state.isGptEnabled = !state.isGptEnabled;
        },
    }
})

export const { handleGptSearch } = gptSlice.actions;

export default gptSlice.reducer;