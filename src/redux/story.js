import { configureStore, createSlice } from '@reduxjs/toolkit';
import kahani from '../data/kahani'; // make sure this is your stories array

// Story Slice
const storySlice = createSlice({
  name: 'stories',
  initialState: {
    stories: kahani, // use imported kahani here
    currentStory: null,
    isLoading: true,
    favorites: [],
    readingProgress: {},
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCurrentStory: (state, action) => {
      state.currentStory = action.payload;
    },
    addToFavorites: (state, action) => {
      const storyId = action.payload;
      if (!state.favorites.includes(storyId)) {
        state.favorites.push(storyId);
      }
    },
    removeFromFavorites: (state, action) => {
      const storyId = action.payload;
      state.favorites = state.favorites.filter(id => id !== storyId);
    },
    updateReadingProgress: (state, action) => {
      const { storyId, progress } = action.payload;
      state.readingProgress[storyId] = progress;
    },
    resetStoryData: (state) => {
      state.currentStory = null;
      state.favorites = [];
      state.readingProgress = {};
    }
  }
});

// Export actions
export const {
  setLoading,
  setCurrentStory,
  addToFavorites,
  removeFromFavorites,
  updateReadingProgress,
  resetStoryData
} = storySlice.actions;

// Configure store
const store = configureStore({
  reducer: {
    stories: storySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;
