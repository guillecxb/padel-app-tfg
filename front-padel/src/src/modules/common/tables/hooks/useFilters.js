import PropTypes from "prop-types";
import { useMemo } from "react";

import { ALARMS, CONNECTION_STATUS, DEPLOY_STATUS } from "modules/enumerations";

import { useFiltersTranslation } from "translations";

import { dateTypes, FILTER_NAMES } from "../filters/constants";

const useFilters = (requiredFilters = []) => {
  const t = useFiltersTranslation();

  const filters = useMemo(
    () => ({
      [FILTER_NAMES.lastConnection]: {
        key: FILTER_NAMES.lastConnection,
        singleSelection: true,
        title: t("lastConnection"),
        values: [
          {
            label: t("last24h"),
            value: dateTypes.DAILY,
          },
          {
            label: t("last48h"),
            value: dateTypes.BIDAILY,
          },
          {
            label: t("lastWeek"),
            value: dateTypes.WEEKLY,
          },
          {
            label: t("lastMonth"),
            value: dateTypes.MONTHLY,
          },
        ],
      },
      [FILTER_NAMES.alertsError]: {
        key: FILTER_NAMES.alertsError,
        title: t("alerts"),
        disabled: true,
        values: [],
      },
      [FILTER_NAMES.alerts]: {
        key: FILTER_NAMES.alerts,
        title: t("alerts"),
        values: [
          {
            label: t("critical"),
            value: ALARMS.ERROR,
          },
          {
            label: t("warning"),
            value: ALARMS.WARNING,
          },
          {
            label: t("noAlerts"),
            value: ALARMS.OK,
          },
        ],
      },
      [FILTER_NAMES.customerStatus]: {
        key: FILTER_NAMES.customerStatus,
        singleSelection: true,
        title: t("customerStatus"),
        values: [
          {
            label: t("active"),
            value: DEPLOY_STATUS.ACTIVE,
          },
          {
            label: t("deploying"),
            value: DEPLOY_STATUS.DEPLOYING,
          },
          {
            label: t("pending"),
            value: DEPLOY_STATUS.PENDING,
          },
          {
            label: t("draft"),
            value: DEPLOY_STATUS.DRAFT,
          },
        ],
      },
      [FILTER_NAMES.network]: {
        key: FILTER_NAMES.network,
        title: t("connectionStatus"),
        values: [
          {
            label: t("allConnected"),
            value: CONNECTION_STATUS.ALL_CONNECTED,
          },
          {
            label: t("someConnected"),
            value: CONNECTION_STATUS.SOME_CONNECTED,
          },
          {
            label: t("allDisconnected"),
            value: CONNECTION_STATUS.ALL_DISCONNECTED,
          },
          {
            label: t("allSuspended"),
            value: CONNECTION_STATUS.ALL_SUSPENDED,
          },
        ],
      },
      [FILTER_NAMES.connectionStatus]: {
        key: FILTER_NAMES.connectionStatus,
        title: t("connectionStatus"),
        values: [
          {
            label: t("connected"),
            value: CONNECTION_STATUS.ALL_CONNECTED,
          },
          {
            label: t("disconnected"),
            value: CONNECTION_STATUS.ALL_DISCONNECTED,
          },
          {
            label: t("suspended"),
            value: CONNECTION_STATUS.ALL_SUSPENDED,
          },
        ],
      },
    }),
    [t]
  );

  return requiredFilters.reduce((acc, requiredFilter) => [...acc, filters[requiredFilter]], []);
};

useFilters.propTypes = {
  requiredFilters: PropTypes.array,
};

export default useFilters;
