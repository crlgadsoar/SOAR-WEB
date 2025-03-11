import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ConfigService from 'apiServices/config';
/**
 * The initial state object for the application.
 */
const initialState = {
  displayMode: localStorage.getItem('displayMode') || 'LIGHT', //LIGHT,DARK
  collapsed: false, //for larger screens
  currWindowWidth: window.innerWidth,
  isDrawerOpen: false, //for smaller screens
  language: localStorage.getItem('language') || 'en_US',
  navigationType: 'SIDE', //SIDE OR TOP DEFAULT IS SIDE
};
/**
 * Fetches the theme configuration data asynchronously.
 * @throws {Error} If there is an error fetching the config data.
 */
export const fetchThemeConfigData = createAsyncThunk(
  'themeConfig/fetchThemeConfigData',
  async () => {
    try {
      const response = await ConfigService.getThemeConfigData();
      console.devLog('fetchThemeConfigData response', response);
      if (response instanceof Error) {
        throw response;
      }
      return response;
    } catch (error) {
      console.log(error);
      throw Error('Failed to fetch config data');
    }
  },
);

// export const setThemeConfigData = createAsyncThunk(
//   'themeConfig/setThemeConfigData',
//   async (mode) => {
//     try {
//       const response = await ConfigService.setThemeConfigData(mode);
//       console.devLog('setThemeConfigData response', response);
//       if (response instanceof Error) {
//         throw response;
//       }
//       return response;
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   },
// );

/**
 * Redux async thunk action creator for setting the display mode in the theme configuration.
 * @throws {Error} If there is an error updating the display mode.
 */
export const setDisplayMode = createAsyncThunk(
  'themeConfig/setDisplayMode',
  async (mode) => {
    try {
      const response = await ConfigService.updateDisplayMode(mode);
      console.devLog('setDisplayMode response', response);
      if (response instanceof Error) {
        throw response;
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

/**
 * Async thunk action creator that sets the language in the theme configuration.
 * @throws {Error} - If there is an error updating the language.
 */
export const setLanguage = createAsyncThunk(
  'themeConfig/setLanguage',
  async (language) => {
    try {
      const response = await ConfigService.updateLanguage(language);
      console.devLog('setLanguage response', response);
      if (response instanceof Error) {
        throw response;
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

/**
 * Redux slice for managing the theme configuration state.
 */
export const themeConfigSlice = createSlice({
  name: 'themeConfig',
  initialState,
  reducers: {
    updateCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    updateCurrWidth: (state, action) => {
      state.currWindowWidth = action.payload;
    },
    updateDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
    updateNavigationType: (state, action) => {
      state.navigationType = action.payload;
    },
    // resetInitConfigData(state) {
    //   state.displayMode = 'LIGHT';
    //   state.loading = 'idle';
    //   state.error = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setDisplayMode.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(setDisplayMode.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.displayMode = action.payload;
      })
      .addCase(setDisplayMode.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      })
      .addCase(setLanguage.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(setLanguage.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.language = action.payload;
      })
      .addCase(setLanguage.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      })
      .addCase(fetchThemeConfigData.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchThemeConfigData.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.displayMode = action.payload.displayMode;
        state.language = action.payload.language;
      })
      .addCase(fetchThemeConfigData.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});
//export const { resetInitConfigData } = themeConfigSlice.actions;
export const {
  updateCollapsed,
  updateCurrWidth,
  updateDrawerOpen,
  updateNavigationType,
} = themeConfigSlice.actions;

// Action creators are generated for each case reducer function
//export const { fetchInitConfigData } = initConfigSlice.actions;
export default themeConfigSlice.reducer;
