import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerId: null,
};

const customerIdSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomerId: (state, action) => {
      const { customerId } = action.payload;

      state.customerId = customerId;
    },
  },
});

export const { setCustomerId } = customerIdSlice.actions;

export default customerIdSlice.reducer;

export const getCustomerId = (state) => state.customer.customerId;
