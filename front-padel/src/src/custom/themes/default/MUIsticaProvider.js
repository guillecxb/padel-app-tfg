import PropTypes from "prop-types";
import { useMemo } from "react";

import { useSelector } from "react-redux";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { StyledEngineProvider } from "@mui/styled-engine";

import { getMe } from "domain/accounts/slices/authSlice";

import { theme } from "./theme";
import UrlGradients from "./UrlGradients";

export const MUIsticaProvider = ({ children }) => {
  const { role } = useSelector(getMe);

  const themeName = useMemo(() => role || "customer", [role]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(themeName)}>
        <CssBaseline />
        {children}
        <UrlGradients />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

MUIsticaProvider.propTypes = {
  children: PropTypes.any,
};
