import { createSlice } from '@reduxjs/toolkit';

// AUTH STATE
const searchInitialState = {
  data: '',
};

const searchState = createSlice({
  name: 'search',
  initialState: searchInitialState,
  reducers: {
    updateSearchData: (state, action) => {
      state.data = action.payload;
    },
  },
});

const { updateSearchData } = searchState.actions;
const reducer = searchState.reducer;
const result = { reducer, updateSearchData };

export default result;
