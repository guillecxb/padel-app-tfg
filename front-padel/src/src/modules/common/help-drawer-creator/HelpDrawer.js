import PropTypes from "prop-types";
import { useState, useCallback } from "react";

import { Grid, Slide, Typography, Box, Button } from "@mui/material";

import { DrawerMenu } from "components/organisms/drawer-menu";

import { Drawer } from "components/molecules/drawer";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

export const HelpDrawer = ({
  headerTitle,
  contentTitle,
  contentDescription,
  currentSlide,
  setSlide = () => {},
  showSlide = false,
  drawerMenu,
  openDrawer,
  setOpenDrawer,
  "data-testid": dataTestId,
}) => {
  const [openSlide, setOpenSlide] = useState(showSlide);

  const handleMenuClick = useCallback(
    (slide) => {
      setSlide(slide);
      setOpenSlide(true);
    },
    [setSlide]
  );

  const handleBack = useCallback(() => {
    setOpenSlide(false);
    setSlide("");
  }, [setSlide]);

  const handleClose = useCallback(() => {
    setOpenDrawer(false);
    setOpenSlide(false);
    setSlide("");
  }, [setOpenDrawer, setSlide]);

  return (
    <>
      <Drawer
        data-testid={dataTestId}
        drawerHeader={
          <>
            {openSlide && drawerMenu ? (
              <Button
                color="primary"
                data-testid="drawer-slide-back"
                onClick={handleBack}
                startIcon={<MuisticaIcon color="icon">arrow-line-left</MuisticaIcon>}
                variant="outlined"
              >
                <Typography color="gradient" variant="subtitle">
                  Back
                </Typography>
              </Button>
            ) : (
              <Typography data-testid="drawer-header-title" variant="body2">
                {headerTitle}
              </Typography>
            )}
          </>
        }
        handleClose={handleClose}
        open={openDrawer}
      >
        <Box overflow="hidden">
          {!openSlide && drawerMenu && (
            <Slide direction="right" in={!openSlide}>
              <Grid flexDirection="column" maxWidth={548} minWidth={548} p={5}>
                <Grid mb={5}>
                  <Typography data-testid="subtitle" mb={3} variant="subtitle1">
                    {contentTitle}
                  </Typography>
                  {contentDescription}
                </Grid>
                <DrawerMenu handleClick={handleMenuClick} menu={drawerMenu} />
              </Grid>
            </Slide>
          )}
          {openSlide && (
            <Slide direction="left" in={openSlide}>
              <Grid
                flexDirection="column"
                height="100%"
                maxWidth={548}
                minWidth={548}
                overflow="auto"
                px={5}
                py={3}
              >
                {currentSlide}
              </Grid>
            </Slide>
          )}
        </Box>
      </Drawer>
    </>
  );
};

const drawerMenuShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  customIcon: PropTypes.node,
};
drawerMenuShape.subMenu = PropTypes.arrayOf(PropTypes.shape(drawerMenuShape));
const drawerMenuProps = PropTypes.arrayOf(PropTypes.shape(drawerMenuShape));

HelpDrawer.propTypes = {
  headerTitle: PropTypes.string,
  contentTitle: PropTypes.string,
  contentDescription: PropTypes.node,
  currentSlide: PropTypes.node,
  setSlide: PropTypes.func,
  showSlide: PropTypes.bool,
  drawerMenu: drawerMenuProps,
  openDrawer: PropTypes.bool,
  setOpenDrawer: PropTypes.func,
  "data-testid": PropTypes.string,
};
