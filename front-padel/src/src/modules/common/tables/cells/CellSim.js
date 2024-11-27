import PropTypes from "prop-types";

import { Box, Icon, Stack, Typography } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { useCustomerDashboardTranslation } from "translations";

const CellSim = ({
  connected,
  disconnected,
  suspended,
  "data-testid": dataTestid,
  variant = "body2",
}) => {
  const t = useCustomerDashboardTranslation();

  return (
    <Stack data-testid={dataTestid} direction="row" flexWrap="wrap" spacing={2} useFlexGap>
      <Box display="flex" gap={1}>
        <Icon color="info">wifi</Icon>
        <Typography data-testid={`${dataTestid}-connected`} variant={variant}>
          {t("connectedCount", { count: connected })}
        </Typography>
      </Box>
      <Box display="flex" gap={1}>
        <Icon color="error">wifi_off</Icon>
        <Typography data-testid={`${dataTestid}-disconnected`} variant={variant}>
          {t("disconnectedCount", { count: disconnected })}
        </Typography>
      </Box>
      <Box display="flex" gap={1}>
        <MuisticaIcon color="action.disabled" variant="filled">
          disable
        </MuisticaIcon>
        <Typography data-testid={`${dataTestid}-suspended`} variant={variant}>
          {t("suspendedCount", { count: suspended })}
        </Typography>
      </Box>
    </Stack>
  );
};

CellSim.propTypes = {
  connected: PropTypes.number,
  disconnected: PropTypes.number,
  suspended: PropTypes.number,
  variant: PropTypes.string,
  "data-testid": PropTypes.string,
};

export default CellSim;
