import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth/authReducer';
import talentsReducer from './app/talentsReducer';

const rootReducer = combineReducers({
  auth: authReducer.reducer,
  talents: talentsReducer.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
