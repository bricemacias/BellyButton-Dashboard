import { createSlice } from '@reduxjs/toolkit';

// NOTIFICATIONS STATE
const notificationsInitialState = {
  data: [],
  // data: [
  //   {
  //     title: `V30 of AlphaDelta06 needs to be updated`,
  //     read: false,
  //     type: 'V30Update',
  //     content: 'id'
  //   },
  //   {
  //     title: 'V30 of Hit The Road needs to be updated',
  //     read: false,
  //     type: 'V30Update',
  //   },
  //   {
  //     title: 'V30 of McSkyz needs to be updated',
  //     read: false,
  //     type: 'V30Update',
  //   },
  //   {
  //     title: 'V30 of Jaymax VI needs to be updated',
  //     read: false,
  //     type: 'V30Update',
  //   },
  //   {
  //     title: `V30 of Nam's needs to be updated`,
  //     read: false,
  //     type: 'V30Update',
  //   },
  // ],
};

// const updateNotificationsData = createAsyncThunk(
//   'users/fetchByIdStatus',
//   async (data) => {
//     const response = await userAPI.fetchById(userId);
//     return response.data;
//   }
// );

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
  },
});

const {
  updateNotificationsData,
  addNotifications,
} = notificationsState.actions;
const reducer = notificationsState.reducer;
const result = { reducer, updateNotificationsData, addNotifications };

export default result;
