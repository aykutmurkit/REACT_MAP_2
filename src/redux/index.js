// Re-export the store
export { default as store } from './store';

// Re-export slices and their actions
export { 
  default as userInterfaceReducer,
  setSidebarShow,
  setAsideShow,
  setTheme,
  updateUserInterface
} from './slices/userInterfaceSlice'; 