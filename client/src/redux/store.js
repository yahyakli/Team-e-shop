import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/user-slice';
import dashboardSlice from './slices/dashboard-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboardSlice: dashboardSlice,
  },
});

export default store;