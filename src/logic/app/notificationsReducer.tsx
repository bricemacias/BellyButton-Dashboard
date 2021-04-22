import { createSlice } from '@reduxjs/toolkit';

// NOTIFICATIONS STATE
const notificationsInitialState = {
  data: [],
  v30ModalOpener: { name: '', openModal: false },
};

const notificationsState = createSlice({
  name: 'notifications',
  initialState: notificationsInitialState,
  reducers: {
    updateNotificationsData: (state, action) => {
      state.data = action.payload;
    },
    addNotifications: (state, action) => {
      //@ts-ignore
      state.data = [action.payload, ...state.data];
    },
    updateV30ModalOpener: (state, action) => {
      state.v30ModalOpener = action.payload;
    },
  },
});

const {
  updateNotificationsData,
  addNotifications,
  updateV30ModalOpener,
} = notificationsState.actions;
const reducer = notificationsState.reducer;
const result = {
  reducer,
  updateNotificationsData,
  addNotifications,
  updateV30ModalOpener,
};

export default result;
