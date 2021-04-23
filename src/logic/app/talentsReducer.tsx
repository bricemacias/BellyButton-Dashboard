import { createSlice } from '@reduxjs/toolkit';

// TALENTS STATE
const talentsInitialState = {
  data: [],
};

const talentsState = createSlice({
  name: 'talents',
  initialState: talentsInitialState,
  reducers: {
    updateTalents: (state, action) => {
      state.data = action.payload;
    },
  },
});

const { updateTalents } = talentsState.actions;
const reducer = talentsState.reducer;
const result = { reducer, updateTalents };

export default result;
