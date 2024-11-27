import { orchestratorApiSlice } from "../orchestratorApiSlice";

export const meApiSlice = orchestratorApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrchestratorHealth: builder.query({
      query: () => "/health",
    }),
  }),
});

export const { useGetOrchestratorHealthQuery } = orchestratorApiSlice;
