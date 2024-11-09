import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authToken: localStorage.getItem('auth_token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.authToken = action.payload;
      localStorage.setItem('auth_token', action.payload);
    },
    logout: (state) => {
      state.authToken = null;
      localStorage.removeItem('auth_token');
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

