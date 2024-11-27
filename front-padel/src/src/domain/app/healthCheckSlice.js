import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAccountsReachable: true,
  isServiceReachable: true,
  isOrchestratorReachable: true,
};

const healthCheckSlice = createSlice({
  name: "healthCheck",
  initialState,
  reducers: {
    setHealthCheck: (state, action) => {
      const {
        isAccountsReachable = true,
        isOrchestratorReachable = true,
        isServiceReachable = true,
      } = action.payload;
      state.isAccountsReachable = isAccountsReachable;
      state.isServiceReachable = isServiceReachable;
      state.isOrchestratorReachable = isOrchestratorReachable;
    },
  },
});

export const { setHealthCheck } = healthCheckSlice.actions;

export default healthCheckSlice.reducer;

export const getHealthCheck = (state) => state.healthCheck;
