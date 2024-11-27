import { useCallback, useMemo } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCustomerId } from "domain/accounts/slices/customerIdSlice";

import DashboardCard from "modules/common/cards/DashboardCard";
import { SITE_TYPES } from "modules/enumerations";

import { useCustomerDashboardTranslation } from "translations";

import useSiteRoute from "../Sites/hooks/useSiteRoute";

const Sites = ({}) => {
  const t = useCustomerDashboardTranslation();
  const navigate = useNavigate();
  const customerId = useSelector(getCustomerId);
  const { siteRoute } = useSiteRoute();

  const results = [];
  const error = false;
  const isLoading = false;

  const { physical, virtual } = useMemo(() => {
    if (error) {
      return {
        physical: "-",
        virtual: "-",
      };
    }

    return {
      physical: results.filter(({ site_type }) => site_type?.toLowerCase() === SITE_TYPES.PHYSICAL)
        .length,
      virtual: results.filter(({ site_type }) => site_type?.toLowerCase() === SITE_TYPES.VIRTUAL)
        .length,
    };
  }, [results, error]);

  const handleClick = useCallback(() => {
    navigate(siteRoute);
  }, [navigate, siteRoute]);

  return (
    <DashboardCard
      // count={t("stats.sites.count", { countPhysical: physical, countVirtual: virtual })}
      count={1}
      data-testid="sites-card"
      icon="apartment-building"
      isLoading={isLoading}
      onClick={handleClick}
      title={t("stats.sites.title")}
    />
  );
};

export default Sites;
