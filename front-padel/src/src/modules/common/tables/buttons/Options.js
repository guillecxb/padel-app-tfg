import { useState } from "react";
import PropTypes from "prop-types";

import { IconButton, Menu, MenuItem, Typography } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

const Options = ({ options = [] }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick} variant="contrast">
        <MuisticaIcon color="text.primary" variant="light">
          kebab-menu
        </MuisticaIcon>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        onClose={handleClose}
        open={open}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {options.map(({ title, action, disabled }, idx) => (
          <MenuItem disabled={disabled} key={`option-${idx}`} onClick={action}>
            <Typography variant="body2">{title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

Options.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      onClick: PropTypes.func,
      disabled: PropTypes.bool,
    })
  ),
};

export default Options;
