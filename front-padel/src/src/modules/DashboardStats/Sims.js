import { useCallback, useMemo } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCustomerId } from "domain/accounts/slices/customerIdSlice";

import DashboardCard from "modules/common/cards/DashboardCard";
import { CONNECTION_STATUS } from "modules/enumerations";

import { useCustomerDashboardTranslation } from "translations";

import useSimRoute from "../Sims/hooks/useSimRoute";

const Sims = ({}) => {
  const navigate = useNavigate();
  const t = useCustomerDashboardTranslation();
  const customerId = useSelector(getCustomerId);
  const { simRoute } = useSimRoute(getCustomerId);

  const data = [];
  const error = false;
  const isLoading = false;

  const countConnected = useMemo(() => {
    return results.filter(({ status }) => status === CONNECTION_STATUS.ALL_CONNECTED).length;
  }, [results]);

  const handleClick = useCallback(() => {
    navigate(simRoute);
  }, [navigate, simRoute]);

  return (
    <DashboardCard
      count={100}
      data-testid="sims-card"
      icon="multidevice"
      isLoading={isLoading}
      onClick={handleClick}
      title={t("stats.sims.title")}
    />
  );
};

export default Sims;
