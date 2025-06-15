import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarShow: true,
  asideShow: false,
  theme: 'light',
  sidebarUnfoldable: false,
};

export const userInterfaceSlice = createSlice({
  name: 'userInterface',
  initialState,
  reducers: {
    setSidebarShow: (state, action) => {
      state.sidebarShow = action.payload;
    },
    setAsideShow: (state, action) => {
      state.asideShow = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setSidebarUnfoldable: (state, action) => {
      state.sidebarUnfoldable = action.payload;
    },
    updateUserInterface: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { 
  setSidebarShow, 
  setAsideShow, 
  setTheme, 
  setSidebarUnfoldable,
  updateUserInterface 
} = userInterfaceSlice.actions;

export default userInterfaceSlice.reducer; 