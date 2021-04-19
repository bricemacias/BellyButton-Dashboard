import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth/authReducer';
import talentsReducer from './app/talentsReducer';
import searchReducer from './app/searchReducer';

const rootReducer = combineReducers({
  auth: authReducer.reducer,
  talents: talentsReducer.reducer,
  search: searchReducer.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
