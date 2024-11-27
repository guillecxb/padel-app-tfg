import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";

import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, Tabs, Tab, Typography } from "@mui/material";

import { getCustomerId } from "domain/accounts/slices/customerIdSlice";

import { LAYOUTS } from "modules/app/router/routerConstants";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { usePrivateLayoutTranslation } from "translations";

const CustomerLayout = ({ children }) => {
  const t = usePrivateLayoutTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const customerId = useSelector(getCustomerId);

  const layout = LAYOUTS.asCustomer;

  // useCallback para evitar renderizados -> calcula la URL sustituyendo el valor ":customerId" por el customerId actual
  // const getRoute = useCallback((value) => value.replace(":customerId", customerId), [customerId]);

  const getRoute = useCallback((value) => {
    if (!value) {
      return "Error";
    }
    return value.replace(":customerId", customerId);
  }, [customerId]);

  const handleChange = (e) => {
    const { route } = e.currentTarget.dataset;
    navigate(route);
  };

  const pathName = useMemo(() => {
    const foundPath = layout.findLast((layout) => {
      return matchPath(layout.route + "/*", location.pathname);
    });
    return foundPath?.name;
  }, [layout, location.pathname]);

  return (
    <Box
      sx={{
        marginTop: "-35px",
      }}
    >
      <Box alignItems="center" display="flex" justifyContent="space-between" mb={8}>
        {/* Sección Izquierda: Avatar y Nombre */}
        <Box width="15%" />

        {/* Sección Central: Tabs centrados */}
        <Box alignItems="center" display="flex" justifyContent="center" width="90%">
          {customerId && (
            <Tabs value={pathName}>
              {layout.map(({ name, icon, route, isDisabled }) => (
                <Tab
                  data-route={getRoute(route)}
                  data-testid={`cmenu-${name}`}
                  disabled={isDisabled}
                  icon={
                    <MuisticaIcon
                      color={pathName === name ? "icon" : "text.secondary"}
                      variant="filled"
                    >
                      {icon}
                    </MuisticaIcon>
                  }
                  iconPosition="start"
                  key={name}
                  label={
                    <Typography
                      color={pathName === name ? "text.primary" : "text.secondary"}
                      ml={1}
                      textTransform="none"
                      variant="body2"
                    >
                      {t(`routes.${name}`)}
                    </Typography>
                  }
                  onClick={handleChange}
                  value={name}
                />
              ))}
            </Tabs>
          )}
        </Box>

        {/* Sección Derecha vacía para ajustar el espacio */}
        <Box width="15%" />
      </Box>

      {/* Sección de contenido */}
      <Box>{children}</Box>
    </Box>
  );
};

CustomerLayout.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string,
};

export default CustomerLayout;
