import PropTypes from "prop-types";

import { Stack, Typography } from "@mui/material";

import { PaperButton, usePaperButton } from "components/molecules/paper-button";

export const DrawerMenuItem = ({ menuItem, handleClick }) => {
  const { color, paperButtonProps } = usePaperButton({
    isDisabled: false,
    mouseHoverElevation: 3,
  });
  return (
    <PaperButton data-testid="drawer-menu-item" onClick={handleClick} {...paperButtonProps}>
      <Stack direction="row">
        {menuItem.customIcon}
        {menuItem.icon}
        <Typography color={color} ml={2} variant="body2">
          {menuItem.title}
        </Typography>
      </Stack>
    </PaperButton>
  );
};

DrawerMenuItem.propTypes = {
  menuItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.node,
    customIcon: PropTypes.node,
  }),
  handleClick: PropTypes.func,
};
