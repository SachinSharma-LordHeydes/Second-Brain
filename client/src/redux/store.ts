import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import dataReducer from "./slices/dataSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    data: dataReducer,
  },
});

// TypeScript types for better autocompletion
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
