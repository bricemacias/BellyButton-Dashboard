import { configureStore, combineReducers } from '@reduxjs/toolkit';

import authReducer from './auth/authReducer';
import talentsReducer from './app/talentsReducer';
import searchReducer from './app/searchReducer';
import notificationsReducer from './app/notificationsReducer';

const rootReducer = combineReducers({
  auth: authReducer.reducer,
  talents: talentsReducer.reducer,
  search: searchReducer.reducer,
  notifications: notificationsReducer.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
