import { combineReducers, configureStore } from '@reduxjs/toolkit';
import alertsSlice from './alertsSlice';
import usersSlice from './usersSlice';

const rootReducer = combineReducers({
    alerts: alertsSlice,
    users: usersSlice, // Corrected key here to match the slice name
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
