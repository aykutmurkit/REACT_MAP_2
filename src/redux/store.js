import { configureStore } from '@reduxjs/toolkit';
import userInterfaceReducer from './slices/userInterfaceSlice';
import mapReducer from './slices/mapSlice';

const store = configureStore({
  reducer: {
    userInterface: userInterfaceReducer,
    map: mapReducer,
  },
});

export default store; 