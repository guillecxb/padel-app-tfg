export const ERROR_BACK = "CRITICAL";
export const SUCCESS_BACK = "OK";

export const WARNING = "WARNING";
export const INFO = "INFO";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";
export const DISABLED = "DISABLED";

export const WARNING_ALERT = "warning";
export const INFO_ALERT = "info";
export const SUCCESS_ALERT = "success";
export const ERROR_ALERT = "error";

export const isWarning = (value) => value === WARNING;
export const isSuccess = (value) => value === SUCCESS || value === SUCCESS_BACK;
export const isError = (value) => value === ERROR || value === ERROR_BACK;
export const isInfo = (value) => value === INFO;

export const CREDENTIALS = {
  USER_PASS: "USER_PASS",
  MICROSOFT: "MICROSOFT",
};

export const ALARMS = {
  WARNING: WARNING,
  ERROR: ERROR_BACK,
  OK: SUCCESS_BACK,
};

export const DEPLOY_STATUS = {
  PENDING: "PENDING",
  DEPLOYING: "DEPLOYING",
  ACTIVE: "ACTIVE",
  DRAFT: "DRAFT",
};

export const CREDENTIAL_TYPES = {
  LINKED: "LINKED",
  LINK_EXPIRED: "LINK_EXPIRED",
  LINK_PENDING: "LINK_PENDING",
};

export const CONNECTION_STATUS = {
  ALL_CONNECTED: "Connected",
  SOME_CONNECTED: "Some_Connected",
  ALL_DISCONNECTED: "Disconnected",
  ALL_SUSPENDED: "Suspended",
};

export const NO_SIMS = "NoSims";

export const SITE_TYPES = {
  PHYSICAL: "physical",
  VIRTUAL: "virtual",
};

export const IP_RANGE_STATUS = {
  PENDING: "Pending",
  ACTIVE: "Active",
  REMOVING: "Removing",
  ERROR_REMOVING: "ErrorRemoving",
  ERROR_ACTIVATING: "ErrorActivating",
};
