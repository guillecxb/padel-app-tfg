import PropTypes from "prop-types";
import { useMemo } from "react";

import { Avatar, Box, Stack, Typography, Skeleton, useTheme } from "@mui/material";

import StatusLabel from "modules/common/statuses/StatusLabel";

import { SimpleLineAngle } from "components/molecules/simple-line";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

const NetworkSite = ({
  "data-testid": dataTestid,
  color,
  siteName,
  siteLoading,
  siteError,
  deviceName,
  deviceIcon,
  status,
}) => {
  const theme = useTheme();

  const lineStyle = useMemo(() => {
    const colorMap = {
      Connected: { color: theme.palette.success.main, dashed: false },
      Disconnected: { color: theme.palette.error.main, dashed: true },
      Some_Connected: { color: theme.palette.warning.main, dashed: false },
      Suspended: { color: theme.palette.borders.divider, dashed: true },
    };
    return colorMap[status] || { color: theme.palette.error.dark, dashed: true };
  }, [status, theme.palette]);

  return (
    <Box data-testid={dataTestid}>
      <Stack>
        <Stack alignItems="center" direction="row" spacing={1}>
          <Avatar color="gradient">
            <MuisticaIcon color="primary" variant="filled">
              apartment-building
            </MuisticaIcon>
          </Avatar>
          <Box>
            {siteLoading ? (
              <Skeleton heigh={40} width={100} />
            ) : (
              <Typography color={color} data-testid="site-name" variant="subtitle">
                {siteError ? "-" : siteName}
              </Typography>
            )}
          </Box>
        </Stack>
        <Stack direction="row">
          <Box pl={2}>
            <Box sx={{ position: "absolute", marginLeft: 2, marginTop: 1.8, zIndex: 10 }}>
              <StatusLabel data-testid="connection-status" status={status} />
            </Box>
            <SimpleLineAngle
              backgroundColor={lineStyle.color}
              dashed={lineStyle.dashed}
              width={170}
            />
          </Box>
          <Avatar color="gradient" sx={{ marginTop: 1 }}>
            <MuisticaIcon color="icon" variant="filled">
              {deviceIcon}
            </MuisticaIcon>
          </Avatar>
          <Box>
            <Typography color={color} data-testid="device-name" pl={1} pt={2} variant="subtitle2">
              {deviceName}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default NetworkSite;

NetworkSite.propTypes = {
  color: PropTypes.string,
  "data-testid": PropTypes.string,
  deviceName: PropTypes.string.isRequired,
  deviceIcon: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  siteLoading: PropTypes.bool,
  siteError: PropTypes.bool,
};
