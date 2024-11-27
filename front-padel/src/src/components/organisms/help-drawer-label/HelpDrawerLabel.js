import { useState, useCallback, cloneElement } from "react";
import PropTypes from "prop-types";

import { Grid, IconButton } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

export const HelpDrawerLabel = ({ drawer }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpen = useCallback(() => {
    setOpenDrawer(true);
  }, []);

  return (
    <>
      <Grid position="absolute" right={20} top={150}>
        <IconButton data-testid="help-stick-label" onClick={handleOpen} variant="contrast">
          <MuisticaIcon color="icon" variant="filled">
            question
          </MuisticaIcon>
        </IconButton>
      </Grid>
      {openDrawer &&
        cloneElement(drawer, { openDrawer: openDrawer, setOpenDrawer: setOpenDrawer })}
    </>
  );
};

HelpDrawerLabel.propTypes = {
  stickTitle: PropTypes.string,
  drawer: PropTypes.node.isRequired,
};
