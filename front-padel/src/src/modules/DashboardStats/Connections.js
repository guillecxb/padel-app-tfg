import { useCallback, useMemo } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCustomerId } from "domain/accounts/slices/customerIdSlice";

import DashboardCard from "modules/common/cards/DashboardCard";
import { CONNECTION_STATUS } from "modules/enumerations";

import { useCustomerDashboardTranslation } from "translations";

import useConnectionRoute from "../Connections/hooks/useConnectionRoute";

const Connections = ({}) => {
  const navigate = useNavigate();
  const { connectionRoute } = useConnectionRoute();
  const customerId = useSelector(getCustomerId);
  const t = useCustomerDashboardTranslation();

  const results = []
  const count = 0;
  const error = false;
  const isLoading = false;


  const countActive = useMemo(() => {
    const statusMap = [CONNECTION_STATUS.ALL_CONNECTED, CONNECTION_STATUS.SOME_CONNECTED].map(
      (status) => status.toLowerCase()
    );
    return results.filter(({ status }) => statusMap.includes(status?.toLowerCase())).length;
  }, [results]);

  const handleClick = useCallback(() => {
    navigate(connectionRoute);
  }, [navigate, connectionRoute]);

  return (
    <DashboardCard
      count={t(error ? "stats.connections.error" : "stats.connections.count", {
        count: countActive,
        total: count,
      })}
      data-testid="connections-card"
      icon="connections"
      isLoading={isLoading}
      onClick={handleClick}
      title={t("stats.connections.title")}
    />
  );
};

export default Connections;
