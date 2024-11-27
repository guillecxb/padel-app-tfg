import PropTypes from "prop-types";

import { Link, useNavigate } from "react-router-dom";

import { Typography, Breadcrumbs } from "@mui/material";

export const BreadcrumbsManager = ({ breadcrumbs = [], marginBottom = 1 }) => {
  const navigate = useNavigate();

  const handleNavigation = (event) => {
    const { route } = event.currentTarget.dataset;
    route && navigate(route);
  };

  return (
    <Breadcrumbs
      color="text.primary"
      data-testid="breadcrumb"
      separator={
        <Typography mt="4px" variant="caption">
          /
        </Typography>
      }
      sx={{ marginBottom }}
    >
      {breadcrumbs.map(({ route, text, dataTestId, onClick }, i) =>
        route ? (
          <Typography
            color="text.secondary"
            component={Link}
            key={`tab-${i}`}
            to={route}
            variant="caption"
            {...(dataTestId && { "data-testid": dataTestId })}
          >
            {text}
          </Typography>
        ) : (
          <Typography
            color="text.primary"
            key={`tab-${i}`}
            onClick={onClick ? onClick : handleNavigation}
            sx={onClick ? { cursor: "pointer" } : {}}
            variant="caption"
            {...(dataTestId && { "data-testid": dataTestId })}
          >
            {text}
          </Typography>
        )
      )}
    </Breadcrumbs>
  );
};

BreadcrumbsManager.propTypes = {
  marginBottom: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      route: PropTypes.string,
      dataTestId: PropTypes.string,
    })
  ),
};
