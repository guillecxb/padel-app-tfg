import PropTypes from "prop-types";

import { Typography } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

const Throughput = ({ value, unit, direction = "up", disabled = false }) => {
  return (
    <Typography
      color={disabled ? "lightDisabled" : "lightInfo"}
      data-testid="status-label"
      gap={1}
      variant="label"
    >
      <MuisticaIcon
        color={disabled ? "text.primary" : "primary.dark"}
        fontSize="small"
        variant="filled"
      >
        {`arrow-drop-${direction}`}
      </MuisticaIcon>
      {`${value} ${unit}`}
    </Typography>
  );
};

Throughput.propTypes = {
  disabled: PropTypes.bool,
  value: PropTypes.number,
  unit: PropTypes.string,
  direction: PropTypes.oneOf(["up", "down"]),
};

export default Throughput;
