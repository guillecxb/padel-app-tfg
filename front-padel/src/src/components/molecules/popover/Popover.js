import PropTypes from "prop-types";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";

import { Popover as BasePopover } from "@mui/material";

// eslint-disable-next-line react/display-name
const Popover = forwardRef(({ children, button }, ref) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const openPopover = (ev) => {
    setAnchorEl(ev.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const buttonElement = useMemo(() => {
    return button ? button({ open }) : <></>;
  }, [button, open]);

  useImperativeHandle(
    ref,
    () => ({
      openPopover,
    }),
    []
  );

  return (
    <>
      {buttonElement}
      <BasePopover
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        id={open ? "simple-popover" : undefined}
        onClose={handleClose}
        open={open}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {children}
      </BasePopover>
    </>
  );
});

Popover.propTypes = {
  children: PropTypes.node,
  button: PropTypes.func,
};

export default Popover;
