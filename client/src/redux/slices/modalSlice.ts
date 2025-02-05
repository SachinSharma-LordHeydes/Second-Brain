import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  modalStatus: boolean;
}

const initialState: CounterState = {
  modalStatus: false,
};

const modalSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setModal: (state) => {
      state.modalStatus =!state.modalStatus;
    },
  },
});

export const { setModal} = modalSlice.actions;
export default modalSlice.reducer;
