import { Mutex } from "async-mutex";

import { setHealthCheck } from "./app/healthCheckSlice";
import { setCredentials } from "./accounts/slices/authSlice";

const apiVersions = JSON.parse(process.env.REACT_APP_API_VERSIONS);

const PROTOCOL = process.env.REACT_APP_PROTOCOL;

const getBaseApiUrl = (baseApi) => {
  return `${PROTOCOL}://${baseApi}`;
};

const getDomainUrl = (domain) => {
  return `/api/${domain}/${apiVersions[domain]}`;
};

export const ACCOUNTS_API_URL = getBaseApiUrl(process.env.REACT_APP_API);
export const SERVICE_API_URL = getBaseApiUrl(process.env.REACT_APP_API);
export const ORCHESTRATOR_API_URL = getBaseApiUrl(process.env.REACT_APP_ORCHESTRATOR_API);

export const USERS_API_URL = getDomainUrl("users");
export const CUSTOMERS_API_URL = getDomainUrl("customers");
export const LANGUAGES_API_URL = getDomainUrl("languages");
export const SETTINGS_API_URL = getDomainUrl("settings");

// storage
export const REFRESH_TOKEN = "refreshToken";

// values
export const X_PLATFORM = "PADEL_APP";
export const APP_JSON = "application/json";
export const APP_FORM_DATA = "multipart/form-data";
export const CACHE_DURATION = 120;

// headers
export const X_PLATFORM_HEADER = "X-Platform";
export const AUTHORIZATION_HEADER = "Authorization";
export const CONTENT_TYPE_HEADER = "Content-Type";
export const TRACEPARENT_HEADER = "traceparent";

// generates query parameters
export const generateParams = (params = {}) => {
  const entryParams = Object.entries(params);
  return entryParams.length
    ? entryParams.reduce(
        (acc, [key, value], idx) => `${acc}${idx !== 0 ? "&" : ""}${key}=${value}`,
        "?"
      )
    : "";
};

const mutex = new Mutex();

export const configBaseQuery =
  ({ baseQuery, reachableKey, accountsBaseQuery }) =>
  async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    const errorStatus = result?.error?.status;

    // isUnreachable
    if (errorStatus === "FETCH_ERROR") {
      api.dispatch(setHealthCheck({ [reachableKey]: false }));
    } else {
      api.dispatch(setHealthCheck({ [reachableKey]: true }));
    }

    if (errorStatus === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          let refresh =
            localStorage.getItem(REFRESH_TOKEN) || sessionStorage.getItem(REFRESH_TOKEN);
          if (refresh) {
            const refreshResult = await accountsBaseQuery(
              {
                url: "/refresh",
                method: "POST",
                body: {
                  refresh,
                },
              },
              api,
              extraOptions
            );
            const access = refreshResult?.data?.access;

            if (access) {
              await api.dispatch(setCredentials({ refresh, access }));
              result = await baseQuery(args, api, extraOptions);
            } else {
              return refreshResult;
            }
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }

    return result;
  };
