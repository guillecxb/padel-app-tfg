import PropTypes from "prop-types";
import { useMemo } from "react";

import { Typography } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { useStatusesTranslation } from "translations";

const StatusLabel = ({ status, label }) => {
  const t = useStatusesTranslation();
  const statusToColor = useMemo(
    () => ({
      linked: "lightSuccess",
      link_pending: "lightWarning",
      link_expired: "lightError",
      active: "lightSuccess",
      pending: "lightInfo",
      deploying: "lightDisabled",
      connected: "lightSuccess",
      some_connected: "lightWarning",
      disconnected: "lightError",
      suspended: "lightDisabled",
      nosims: "lightInfo",
      erroractivating: "lightError",
    }),
    []
  );

  const statusToIcon = {
    active: { icon: "checked", color: "success" },
    deploying: { icon: "time", color: "text.primary" },
    pending: { icon: "information-user", color: "info" },
    erroractivating: { icon: "alert", color: "error.dark" },
  };

  return (
    <>
      {status ? (
        <Typography
          color={statusToColor[status.toLowerCase()]}
          data-testid="status-label"
          gap={1}
          variant="label"
        >
          {statusToIcon[status.toLowerCase()]?.icon && (
            <MuisticaIcon
              color={statusToIcon[status.toLowerCase()].color}
              fontSize="small"
              variant="filled"
            >
              {statusToIcon[status.toLowerCase()].icon}
            </MuisticaIcon>
          )}
          {label || t(status.toLowerCase())}
        </Typography>
      ) : (
        <Typography>{t("empty")}</Typography>
      )}
    </>
  );
};

StatusLabel.propTypes = {
  status: PropTypes.string,
  label: PropTypes.string,
};

export default StatusLabel;
