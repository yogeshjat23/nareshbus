import { createSlice } from '@reduxjs/toolkit';

const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state,action) => {
      state.loading = true; // Set loading to true
    },
    hideLoading: (state,action) => {
      state.loading = false; // Set loading to false
    },
  },
});

export const { showLoading, hideLoading } = alertsSlice.actions;
export default alertsSlice.reducer;
