import { useCallback, useState } from "react";
import PropTypes from "prop-types";

import { Avatar, Box, Divider, Grid, Stack, Typography, useTheme } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

export const validIcons = [
  "multidevice",
  "computer",
  "mobile-device",
  "router",
  "cloud-distribution",
  "microchip",
  "delivery-van-moving",
  "car-moving",
  "photo-camera",
  "chip-sim-card",
  "robot",
  "videogames",
  "academic",
  "bicycle-bike",
  "microphone",
  "video-surveillance-security",
  "tech-service",
  "star",
];

const MuisticaIconSelector = ({
  variant = "filled",
  color = "icon",
  "data-testid": dataTestid,
  title,
  selected,
  onSelect,
}) => {
  const [selectedIcon, setSelectedIcon] = useState(selected ?? "");

  const selectAction = useCallback(
    (e) => {
      const icon = e.currentTarget.dataset["click"];
      setSelectedIcon(icon);
      onSelect && onSelect(icon);
    },
    [onSelect]
  );
  const theme = useTheme();

  return (
    <Box>
      <Stack
        alignItems="center"
        direction="row"
        divider={<Divider color="gradient" flexItem orientation="vertical" />}
      >
        <Box alignItems="top" display="flex" justifyContent="center" pr={3}>
          <Avatar
            color="gradient"
            data-testid={selectedIcon}
            onClick={selectAction}
            sx={{
              width: 64,
              height: 64,
            }}
          >
            <MuisticaIcon color={color} variant={variant}>
              {selectedIcon || ""}
            </MuisticaIcon>
          </Avatar>
        </Box>
        <Box pl={3}>
          <Box pb={2}>
            <Typography color="text.secondary" variant="body3">
              {title}
            </Typography>
          </Box>
          <Grid container data-testid={dataTestid} spacing={2}>
            {validIcons.map((icon, idx) => (
              <Grid item key={idx} xs={0}>
                <Avatar
                  color="gradient"
                  data-click={icon}
                  data-testid={icon}
                  onClick={selectAction}
                  sx={{
                    border: `1px solid ${
                      selectedIcon === icon
                        ? theme.palette.borders.borderSelected
                        : theme.palette.background.default
                    }`,
                    cursor: "pointer",
                    width: 40,
                    height: 40,
                    "&:hover": {
                      border: `1px solid ${theme.palette.borders.border}`,
                    },
                  }}
                >
                  <MuisticaIcon color={color} variant={variant}>
                    {icon}
                  </MuisticaIcon>
                </Avatar>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
};
MuisticaIconSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string,
  "data-testid": PropTypes.string,
  title: PropTypes.string.isRequired,
  selected: PropTypes.string,
};

export default MuisticaIconSelector;
