import PropTypes from "prop-types";

import { Box, Paper } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

const PaperButton = ({ children, "data-testid": dataTestId, color, onClick, ...rest }) => {
  return (
    <Paper
      alignItems="center"
      component={Box}
      data-testid={dataTestId}
      display="flex"
      gap={2}
      justifyContent="space-between"
      p={2}
      {...rest}
      onClick={onClick}
      sx={{ cursor: "pointer", overflow: "hidden" }}
    >
      <Box width="100%">{children}</Box>
      <Box alignItems="center" display="flex" justifyContent="center">
        <MuisticaIcon color={color}>chevron-right</MuisticaIcon>
      </Box>
    </Paper>
  );
};

PaperButton.propTypes = {
  children: PropTypes.any,
  color: PropTypes.string,
  onClick: PropTypes.func,
  "data-testid": PropTypes.string,
};

export default PaperButton;
