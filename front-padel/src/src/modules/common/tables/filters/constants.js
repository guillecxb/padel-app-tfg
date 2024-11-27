export const dateTypes = {
  HOURLY: "HOURLY",
  DAILY: "DAILY",
  BIDAILY: "BIDAILY",
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
};

const typesToHours = {
  [dateTypes.DAILY]: 24,
  [dateTypes.BIDAILY]: 48,
  [dateTypes.WEEKLY]: 168,
  [dateTypes.MONTHLY]: 720,
};

const generateDateFilter = (dateType) => {
  const now = new Date();
  const then = new Date(now.setHours(now.getHours() - typesToHours[dateType]));

  return (date) => new Date(date) >= then;
};

export const dateFilters = {
  [dateTypes.DAILY]: generateDateFilter(dateTypes.DAILY),
  [dateTypes.BIDAILY]: generateDateFilter(dateTypes.BIDAILY),
  [dateTypes.WEEKLY]: generateDateFilter(dateTypes.WEEKLY),
  [dateTypes.MONTHLY]: generateDateFilter(dateTypes.MONTHLY),
};

export const FILTER_NAMES = {
  lastConnection: "lastConnnection",
  customerStatus: "customerStatus",
  alerts: "alerts",
  alertsError: "alertsError",
  network: "network",
  connectionStatus: "connectionStatus",
};

export const CUSTOMER_FILTERS = [FILTER_NAMES.customerStatus, FILTER_NAMES.alerts];
export const CUSTOMER_FILTERS_ALARM_ERROR = [
  FILTER_NAMES.customerStatus,
  FILTER_NAMES.alertsError,
];
export const OP_US_FILTERS = [FILTER_NAMES.lastConnection];

export const DEVICES_FILTERS = [FILTER_NAMES.connectionStatus];
export const CONNECTIONS_FILTERS = [FILTER_NAMES.network];
