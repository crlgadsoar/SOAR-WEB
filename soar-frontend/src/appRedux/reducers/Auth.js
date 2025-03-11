import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import { fetchInitConfigData, resetInitConfigData } from './InitConfig';
import UserManagementService from 'apiServices/user_management';

const initialState = {
  loading: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
  error: null,
  authUser: null, //{ staffId: '123' }, //null
};
/**
 * Async thunk action creator for signing in a user.
 * @throws {Error} If there is an error during the sign-in process.
 */
export const signIn = createAsyncThunk('auth/signIn', async (credentials) => {
  try {
    console.log('Credentials=>', credentials);
    const response = await UserManagementService.signIn(credentials);
    //console.devLog('signIn response', response);
    if (response instanceof Error) {
      throw response;
    }
    return response;
  } catch (error) {
    console.log('createAsyncThunk auth/signIn', error);
    throw error;
  }
});

/**
 * Async thunk action creator for signing out the user.
 * @throws {Error} - If there is an error during the sign out process.
 */
export const signOut = createAsyncThunk('auth/signOut', async (credentials) => {
  try {
    const response = await UserManagementService.signOut(credentials.user_name);
    if (response instanceof Error) {
      throw response;
    }
    return response;
  } catch (error) {
    throw Error('Failed to fetch config data');
  }
});

/**
 * Redux async thunk action creator for re-authenticating the user.
 * @throws An error if the re-authentication fails.
 */
export const reAuth = createAsyncThunk('auth/reAuth', async (token) => {
  if (token) {
    console.devLog('Token Found Sending ReAuth Request');

    try {
      const response = await UserManagementService.reAuth(token);
      console.devLog('reAuth response', response);
      if (response instanceof Error) {
        throw response;
      }
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } else {
    console.devLog('Reauthentication Token Not Found', token);
  }
});
/**
 * Redux slice for managing authentication state.
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.authUser = action.payload;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      })
      .addCase(signOut.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.loading = 'idle';

        state.authUser = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      })
      .addCase(reAuth.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(reAuth.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.authUser = action.payload;
      })
      .addCase(reAuth.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
  // This code runs whenever the auth slice is mutated, so we can listen for changes
  // to the isAuthenticated value and trigger fetching of initial config data when the user logs in
  // and clears the config data when the user logs out
  // Note: This assumes that the user data includes a JWT token that can be used to authenticate
  // with the server and fetch the config data
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat((store) => (next) => (action) => {
  //     const result = next(action);
  //     if (action.type === signIn.fulfilled.type) {
  //       store.dispatch(fetchInitConfigData());
  //     } else if (action.type === signOut.fulfilled.type) {
  //       store.dispatch(resetInitConfigData());
  //     }
  //     return result;
  //   });
  // },
});

// // Action creators are generated for each case reducer function
// export const { signInUserSuccess, signOutUserSuccess, fetchReAuthData } =
//   authSlice.actions;
export default authSlice.reducer;
