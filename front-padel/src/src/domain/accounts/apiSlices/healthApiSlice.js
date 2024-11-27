import { accountsApiSlice } from "../accountsApiSlice";

export const meApiSlice = accountsApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccountsHealth: builder.query({
      query: () => "/health/",
    }),
  }),
});

export const { useGetAccountsHealthQuery } = accountsApiSlice;
