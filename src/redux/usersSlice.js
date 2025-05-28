import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users', // Ensure this matches what the component expects
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = usersSlice.actions;
export default usersSlice.reducer;
