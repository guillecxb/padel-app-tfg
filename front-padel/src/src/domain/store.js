import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "domain/accounts/slices/authSlice";
import customerIdReducer from "domain/accounts/slices/customerIdSlice";
import { accountsApiSlice } from "domain/accounts/accountsApiSlice";
import { orchestratorApiSlice } from "domain/orchestrator/orchestratorApiSlice";
import { serviceApiSlice } from "domain/service/serviceApiSlice";
import { publicApiSlice } from "domain/accounts/apiSlices/publicApiSlice"; // Importa tu nuevo API Slice
import healthCheckReducer from "domain/app/healthCheckSlice";

const combinedReducer = combineReducers({
  [accountsApiSlice.reducerPath]: accountsApiSlice.reducer,
  [serviceApiSlice.reducerPath]: serviceApiSlice.reducer,
  [orchestratorApiSlice.reducerPath]: orchestratorApiSlice.reducer,
  [publicApiSlice.reducerPath]: publicApiSlice.reducer, // Añade el reducer de la API pública
  auth: authReducer,
  customer: customerIdReducer,
  healthCheck: healthCheckReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "auth/logOut") {
    state = {};
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(accountsApiSlice.middleware)
      .concat(serviceApiSlice.middleware)
      .concat(orchestratorApiSlice.middleware)
      .concat(publicApiSlice.middleware), // Añade el middleware de la API pública
  devTools: true, // TODO: set false for production.
});
