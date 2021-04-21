import { createSlice } from '@reduxjs/toolkit';

// NOTIFICATIONS STATE
const notificationsInitialState = {
  data: [
    {
      title: `V30 of AlphaDelta06 needs to be updated`,
      read: false,
      type: 'V30Update',
    },
    {
      title: 'V30 of Hit The Road needs to be updated',
      read: false,
      type: 'V30Update',
    },
    {
      title: 'V30 of McSkyz needs to be updated',
      read: false,
      type: 'V30Update',
    },
    {
      title: 'V30 of Jaymax VI needs to be updated',
      read: false,
      type: 'V30Update',
    },
    {
      title: `V30 of Nam's needs to be updated`,
      read: false,
      type: 'V30Update',
    },
  ],
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
