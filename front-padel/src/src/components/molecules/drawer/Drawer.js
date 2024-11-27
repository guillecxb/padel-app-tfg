import PropTypes from "prop-types";

import { Drawer as MuiDrawer, Grid, Divider, Icon } from "@mui/material";

export const Drawer = ({ children, open, drawerHeader, handleClose, closeOnBackDrop = false }) => {
  return (
    <MuiDrawer
      anchor="right"
      data-testid="drawer-container"
      open={open}
      sx={{ zIndex: 1400 }}
      transitionDuration={{ enter: 700, exit: 700 }}
      {...(closeOnBackDrop && { ModalProps: { onBackdropClick: handleClose } })}
    >
      <Grid container>
        <Grid alignItems="center" display="flex" item justifyContent="space-between" p={2} xs={12}>
          {drawerHeader}
          <Icon data-testid="drawer-close" onClick={handleClose} variant="pointer">
            close
          </Icon>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
      {children}
    </MuiDrawer>
  );
};
Drawer.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  drawerHeader: PropTypes.node,
  handleClose: PropTypes.func,
  closeOnBackDrop: PropTypes.bool,
};
