import { useSelector } from "react-redux";

import { Box } from "@mui/material";

import { getHealthCheck } from "domain/app/healthCheckSlice";
import { useGetAccountsHealthQuery } from "domain/accounts/apiSlices/healthApiSlice";
import { useGetServiceHealthQuery } from "domain/service/apiSlices/healthApiSlice";
import { useGetOrchestratorHealthQuery } from "domain/orchestrator/apiSlices/healthApiSlice";

import AlertModal from "modules/common/modals/AlertModal";

import useVersionCheck from "./hooks/useVersionCheck";
import useOnlineCheck from "./hooks/useOnlineCheck";

const HealthCheck = () => {
  const { isOnline } = useOnlineCheck();
  const { isVersionUpdated } = useVersionCheck();
  const { isAccountsReachable, isOrchestratorReachable, isServiceReachable } =
    useSelector(getHealthCheck);

  useGetAccountsHealthQuery(null, { skip: isAccountsReachable, pollingInterval: 5000 });
  useGetServiceHealthQuery(null, { skip: isServiceReachable, pollingInterval: 5000 });
  useGetOrchestratorHealthQuery(null, { skip: isOrchestratorReachable, pollingInterval: 5000 });

  const refreshPage = () => window.location.reload(false);

  return (
    <Box>
      <AlertModal
        description="Check your internet connection and try again."
        icon="warning"
        iconProps={{ color: "error" }}
        isOpen={!isOnline}
        title="Network connection error"
      />
      <AlertModal
        action={refreshPage}
        actionText={"RELOAD"}
        description="You are currently viewing an outdated version. Please reload the page to update."
        icon="warning"
        iconProps={{ color: "error" }}
        isOpen={!isVersionUpdated}
        title="Outdated version"
      />
      <AlertModal
        action={refreshPage}
        actionText={"Retry"}
        description="Check your internet connection and try again."
        icon="warning"
        iconProps={{ color: "error" }}
        isOpen={!isAccountsReachable || !isServiceReachable || !isOrchestratorReachable}
        title="Network connection error"
      />
    </Box>
  );
};

export default HealthCheck;
