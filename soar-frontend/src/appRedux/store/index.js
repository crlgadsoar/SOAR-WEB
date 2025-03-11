import { configureStore } from '@reduxjs/toolkit';
import ThemeConfig from '../reducers/ThemeConfig';
import AuthReducer from '../reducers/Auth';
/**
 * Configures the Redux store with the specified reducers and middleware.
 * @returns The configured Redux store.
 */
export const store = configureStore({
  reducer: {
    themeConfig: ThemeConfig,
    auth: AuthReducer,
    //common: Common,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
