import PropTypes from "prop-types";
import { useMemo } from "react";

import { Box, Icon, Typography } from "@mui/material";

import { CONNECTION_STATUS } from "modules/enumerations";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { useStatusesTranslation } from "translations";

const CellSimStatus = ({ status, "data-testid": dataTestid, variant = "body2" }) => {
  const t = useStatusesTranslation();

  const renderConnection = useMemo(() => {
    const connectionsMap = {
      [CONNECTION_STATUS.ALL_CONNECTED]: (
        <Box display="flex" gap={1}>
          <Icon color="info">wifi</Icon>
          <Typography data-testid={`${dataTestid}-connected`} variant={variant}>
            {t("sims.connected")}
          </Typography>
        </Box>
      ),
      [CONNECTION_STATUS.ALL_DISCONNECTED]: (
        <Box display="flex" gap={1}>
          <Icon color="error">wifi_off</Icon>
          <Typography data-testid={`${dataTestid}-disconnected`} variant={variant}>
            {t("sims.disconnected")}
          </Typography>
        </Box>
      ),
      [CONNECTION_STATUS.ALL_SUSPENDED]: (
        <Box display="flex" gap={1}>
          <MuisticaIcon color="action.disabled" variant="filled">
            disable
          </MuisticaIcon>
          <Typography data-testid={`${dataTestid}-suspended`} variant={variant}>
            {t("sims.suspended")}
          </Typography>
        </Box>
      ),
    };

    return connectionsMap[status] || <></>;
  }, [dataTestid, status, t, variant]);

  return (
    <Box data-testid={dataTestid} display="flex" gap={2}>
      {renderConnection}
    </Box>
  );
};

CellSimStatus.propTypes = {
  status: PropTypes.string,
  variant: PropTypes.string,
  "data-testid": PropTypes.string,
};

export default CellSimStatus;
