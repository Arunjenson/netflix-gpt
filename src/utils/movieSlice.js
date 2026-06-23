import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: null,
        mainTrailerVideo: null,
        mainTrailerMovieId: null,
        popularMovies: null,
        topRatedMovies: null,
        movieDetailsCache: {},
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addMainTrailer: (state, action) => {
            state.mainTrailerVideo = action.payload.video;
            state.mainTrailerMovieId = action.payload.movieId;
         },
         popularMovies: (state, action) => {
            state.popularMovies = action.payload;
         },
         topRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
         },
         setMovieDetails: (state, action) => {
            const { movieId, details, credits, trailer } = action.payload;
            state.movieDetailsCache[movieId] = { details, credits, trailer };
         },
    }
})

export const { addNowPlayingMovies, addMainTrailer, popularMovies, topRatedMovies, setMovieDetails } = movieSlice.actions;

export default movieSlice.reducer;