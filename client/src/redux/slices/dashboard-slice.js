import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeLink: 'orders',
};

const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {
    updateActiveLink: (state, action) => {
      state.activeLink = action.payload;
    },
  },
});

export const { updateActiveLink } = dashboardSlice.actions;

export default dashboardSlice.reducer;
