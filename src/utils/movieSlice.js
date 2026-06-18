import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        mainTrailerVideo: null,
        popularMovies: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addMainTrailer: (state, action) => {   
            state.mainTrailerVideo = action.payload;
         },
         popularMovies: (state, action) => {
            state.popularMovies = action.payload;
         }
    }
})

export const { addNowPlayingMovies, addMainTrailer, popularMovies } = movieSlice.actions;

export default movieSlice.reducer;