import { useMemo } from "react";
import PropTypes from "prop-types";

import { Avatar, Typography, useTheme } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

export const StepIcon = ({ completed, active, error, icon }) => {
  const { palette } = useTheme();
  const styles = useMemo(() => {
    let bgcolor = palette.background.paper;
    let border = undefined;
    let color = undefined;

    if (active) {
      bgcolor = palette.primary.main;
    } else {
      border = `1.5px solid ${palette.borders.borderHigh}`;
      color = palette.text.secondary;
    }
    return { bgcolor, width: 32, height: 32, ...(border && { border }), ...(color && { color }) };
  }, [active, palette]);

  return (
    <>
      {!completed && !error && (
        <Avatar sx={styles}>
          <Typography variant="preset1">{icon}</Typography>
        </Avatar>
      )}
      {completed && !error && (
        <MuisticaIcon color="primary.main" fontSize="mediumLarge" variant="regular">
          checked
        </MuisticaIcon>
      )}
      {error && (
        <MuisticaIcon color="error.main" fontSize="mediumLarge" variant="regular">
          alert
        </MuisticaIcon>
      )}
    </>
  );
};

StepIcon.propTypes = {
  completed: PropTypes.bool,
  active: PropTypes.bool,
  error: PropTypes.bool,
  icon: PropTypes.number,
};
