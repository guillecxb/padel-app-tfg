import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getParentHeader } from "domain/app/tracecontext";
import {
  ACCOUNTS_API_URL,
  X_PLATFORM,
  X_PLATFORM_HEADER,
  AUTHORIZATION_HEADER,
  CONTENT_TYPE_HEADER,
  APP_JSON,
  APP_FORM_DATA,
  CACHE_DURATION,
  TRACEPARENT_HEADER,
  configBaseQuery,
} from "domain/restOrigins";
import { ACCOUNTS_TAGS } from "domain/tags";

const accountsBaseQuery = fetchBaseQuery({
  baseUrl: ACCOUNTS_API_URL,
  keepUnusedDataFor: CACHE_DURATION,
  prepareHeaders: (headers, { getState }) => {
    const { access } = getState().auth;
    const isMultipart = headers.get(CONTENT_TYPE_HEADER) === APP_FORM_DATA;

    if (access) {
      headers.set(AUTHORIZATION_HEADER, `Bearer ${access}`);

      if (isMultipart) {
        headers.delete(CONTENT_TYPE_HEADER);
      } else {
        headers.set(CONTENT_TYPE_HEADER, APP_JSON);
      }
    }
    headers.set(X_PLATFORM_HEADER, X_PLATFORM);
    headers.set(TRACEPARENT_HEADER, getParentHeader().toString());

    return headers;
  },
});

export const accountsApiSlice = createApi({
  tagTypes: Object.values(ACCOUNTS_TAGS),
  reducerPath: "accounts_api",
  baseQuery: configBaseQuery({
    accountsBaseQuery: accountsBaseQuery,
    baseQuery: accountsBaseQuery,
    reachableKey: "isAccountsReachable",
  }),
  endpoints: () => ({}),
});
