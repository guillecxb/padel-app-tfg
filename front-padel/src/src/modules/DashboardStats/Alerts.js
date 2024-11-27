import { useMemo } from "react";

import { useSelector } from "react-redux";

import { getCustomerId } from "domain/accounts/slices/customerIdSlice";

import DashboardCard from "modules/common/cards/DashboardCard";
import { ERROR_BACK, WARNING } from "modules/enumerations";

import { useCustomerDashboardTranslation } from "translations";

const Alerts = ({}) => {
  const customerId = useSelector(getCustomerId);
  const t = useCustomerDashboardTranslation();

  const results = [];
  const error = false;
  const isLoading = false;

  const { warning, critical } = useMemo(() => {
    if (error) {
      return {
        warning: "-",
        critical: "-",
      };
    }

    return {
      warning: results.filter(({ severity }) => severity?.toLowerCase() === WARNING.toLowerCase())
        .length,
      critical: results.filter(
        ({ severity }) => severity?.toLowerCase() === ERROR_BACK.toLowerCase()
      ).length,
    };
  }, [results, error]);

  const handleClick = () => {};

  return (
    <DashboardCard
      count={t("stats.alerts.count", { countWarning: warning, countCritical: critical })}
      data-testid="alerts-card"
      icon="warning"
      isLoading={isLoading}
      onClick={handleClick}
      title={t("stats.alerts.title")}
    />
  );
};

export default Alerts;
