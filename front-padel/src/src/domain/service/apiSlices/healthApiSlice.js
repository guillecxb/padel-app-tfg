import { serviceApiSlice } from "domain/service/serviceApiSlice";

export const healthApiSlice = serviceApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getServiceHealth: builder.query({
      query: () => "/health/",
    }),
  }),
});

export const { useGetServiceHealthQuery } = serviceApiSlice;
