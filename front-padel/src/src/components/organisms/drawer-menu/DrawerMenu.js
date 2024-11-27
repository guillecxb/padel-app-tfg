import PropTypes from "prop-types";

import { Paper, Grid } from "@mui/material";

import { DrawerMenuItem } from "./DrawerMenuItem";

export const DrawerMenu = ({ menu, level = 0, handleClick }) => {
  return (
    <>
      {menu.map((menuItem) => (
        <Grid
          component={Paper}
          elevation={level === 0 && menuItem.subMenu ? 1 : 0}
          key={menuItem.id}
          mb={level === 0 ? 2 : 0}
          mt={level > 0 ? 1 : 0}
        >
          <DrawerMenuItem handleClick={() => handleClick(menuItem.id)} menuItem={menuItem} />

          {menuItem.subMenu && (
            <DrawerMenu handleClick={handleClick} level={level + 1} menu={menuItem.subMenu} />
          )}
        </Grid>
      ))}
    </>
  );
};

const menu = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  customIcon: PropTypes.node,
};
menu.subMenu = PropTypes.arrayOf(PropTypes.shape(menu));
const menuProps = PropTypes.arrayOf(PropTypes.shape(menu));

DrawerMenu.propTypes = {
  menu: menuProps,
  level: PropTypes.number,
  handleClick: PropTypes.func,
};
