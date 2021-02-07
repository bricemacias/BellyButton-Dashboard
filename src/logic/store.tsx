import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth/authReducer';

const rootReducer = combineReducers({ auth: authReducer.reducer });

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
