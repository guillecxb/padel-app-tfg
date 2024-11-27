import PropTypes from "prop-types";

import { IconButton, useTheme } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

const Reload = ({ callback, "data-testid": dataTestid, disabled = false }) => {
  const { palette } = useTheme();
  return (
    <IconButton
      data-testid={dataTestid}
      disabled={disabled}
      onClick={callback}
      sx={{
        border: `1px solid ${palette.borders.border}`,
        backgroundColor: !disabled ? palette.background.default : palette.action.disabled,
      }}
    >
      <MuisticaIcon color={!disabled ? "text.primary" : "action.disabled"}>reload</MuisticaIcon>
    </IconButton>
  );
};

Reload.propTypes = {
  callback: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  "data-testid": PropTypes.string,
};

export default Reload;
