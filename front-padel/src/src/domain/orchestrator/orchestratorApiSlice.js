import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  APP_JSON,
  AUTHORIZATION_HEADER,
  CONTENT_TYPE_HEADER,
  ORCHESTRATOR_API_URL,
  X_PLATFORM,
  X_PLATFORM_HEADER,
  CACHE_DURATION,
  TRACEPARENT_HEADER,
  configBaseQuery,
} from "domain/restOrigins";
import { getParentHeader } from "domain/app/tracecontext";

const orchestratorBaseQuery = fetchBaseQuery({
  baseUrl: ORCHESTRATOR_API_URL,
  keepUnusedDataFor: CACHE_DURATION,
  prepareHeaders: (headers, { getState }) => {
    const { access } = getState().auth;
    if (access) {
      headers.set(AUTHORIZATION_HEADER, `Bearer ${access}`);
      headers.set(CONTENT_TYPE_HEADER, APP_JSON);
    }
    headers.set(X_PLATFORM_HEADER, X_PLATFORM);
    headers.set(TRACEPARENT_HEADER, getParentHeader().toString());
    return headers;
  },
});

export const orchestratorApiSlice = createApi({
  reducerPath: "orchestrator_api",
  baseQuery: configBaseQuery({
    baseQuery: orchestratorBaseQuery,
    reachableKey: "isOrchestratorReachable",
  }),
  endpoints: () => ({}),
});
