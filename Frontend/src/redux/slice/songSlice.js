import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  songs: [],
  playlistByTag: [],
  isLoading: false,
  error: null,
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.error = null;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    setPlaylistByTag: (state, action) => {
      state.playlistByTag = action.payload;
    },

    setSongs: (state, action) => {
      state.songs = action.payload;
    },
  },
});

export const { setLoading, setError, setPlaylistByTag, setSongs } =
  songSlice.actions;

export default songSlice.reducer;
