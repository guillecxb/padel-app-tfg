import { useCallback, useMemo } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCustomerId } from "domain/accounts/slices/customerIdSlice";

import DashboardCard from "modules/common/cards/DashboardCard";
import { CONNECTION_STATUS } from "modules/enumerations";

import { useCustomerDashboardTranslation } from "translations";

import useSimRoute from "../Sims/hooks/useSimRoute";

const DeviceGroups = ({}) => {
  const navigate = useNavigate();
  const t = useCustomerDashboardTranslation();
  const customerId = useSelector(getCustomerId);
  const { simRoute } = useSimRoute(getCustomerId);

  const results = [];
  const error = false;
  const isLoading = false;

  // eslint-disable-next-line no-unused-vars
  console.log("Count + error", count, error);

  const countConnected = useMemo(() => {
    return results.filter(({ status }) => status === CONNECTION_STATUS.ALL_CONNECTED).length;
  }, [results]);

  const handleClick = useCallback(() => {
    navigate(simRoute);
  }, [navigate, simRoute]);

  return (
    <DashboardCard
      count={4}
      data-testid="device-group-card"
      icon="multidevice"
      isLoading={isLoading}
      onClick={handleClick}
      title={t("stats.device_groups.title")}
    />
  );
};

export default DeviceGroups;
