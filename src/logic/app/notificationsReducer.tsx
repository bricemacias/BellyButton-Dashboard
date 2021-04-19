import { createSlice } from '@reduxjs/toolkit';

// NOTIFICATIONS STATE
const notificationsInitialState = {
  data: [],
};

const notificationsState = createSlice({
  name: 'notifications',
  initialState: notificationsInitialState,
  reducers: {
    updateNotificationsData: (state, action) => {
      state.data = action.payload;
    },
  },
});

const { updateNotificationsData } = notificationsState.actions;
const reducer = notificationsState.reducer;
const result = { reducer, updateNotificationsData };

export default result;
