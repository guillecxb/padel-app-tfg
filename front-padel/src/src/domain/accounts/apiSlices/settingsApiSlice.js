import { SETTINGS_API_URL } from "domain/restOrigins";
import { accountsApiSlice } from "domain/accounts/accountsApiSlice";
import { ACCOUNTS_TAGS } from "domain/tags";

export const settingsApiSlice = accountsApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    settings: builder.query({
      query: () => `${SETTINGS_API_URL}/settings/`,
      providesTags: [ACCOUNTS_TAGS.Settings],
    }),
  }),
});

export const { useSettingsQuery } = settingsApiSlice;
