import React from "react";
import PropTypes from "prop-types";

import { FormControl } from "@mui/material";
import { Box } from "@mui/system";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

const TextFieldAdornmentWrapper = ({ icon, children }) => {
  return (
    <FormControl fullWidth>
      <Box className="adornment" position="relative">
        <Box
          alignItems="center"
          display="flex"
          height="100%"
          left={8}
          position="absolute"
          right={0}
          width="25px"
          zIndex={1000}
        >
          <MuisticaIcon color="text.primary">{icon}</MuisticaIcon>
        </Box>
        {React.cloneElement(children, { adornment: "true" })}
      </Box>
    </FormControl>
  );
};

TextFieldAdornmentWrapper.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.any,
};

export default TextFieldAdornmentWrapper;
