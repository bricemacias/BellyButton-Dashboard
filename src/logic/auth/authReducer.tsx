import { createSlice } from '@reduxjs/toolkit';

// AUTH STATE
const authInitialState = {
  token: localStorage.getItem('bellybuttonToken') || '',
  error: '',
};

const authState = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    loginFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { updateToken, loginFailed } = authState.actions;
const reducer = authState.reducer;
const result = { reducer, updateToken, loginFailed };

export default result;
