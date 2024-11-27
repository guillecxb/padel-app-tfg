import PropTypes from "prop-types";
import { useState, useCallback } from "react";

import { ToggleButtonGroup, ToggleButton, Typography } from "@mui/material";

import { ERROR_BACK, WARNING } from "modules/enumerations";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { useAlertsTranslation } from "translations";

export const AlertToggle = ({
  criticalCount,
  warningCount,
  getFilter = () => {},
  disabled,
  "data-testid": dataTestid,
}) => {
  const t = useAlertsTranslation();
  const [filter, setFilter] = useState("");

  const handleChange = useCallback(
    (_event, newFilter) => {
      getFilter(newFilter);
      setFilter(newFilter);
    },
    [getFilter]
  );

  return (
    <ToggleButtonGroup
      data-testid={dataTestid}
      disabled={disabled}
      exclusive
      onChange={handleChange}
      value={filter}
    >
      <ToggleButton
        data-testid="critical-toggle"
        position="first"
        value={ERROR_BACK}
        variant="paper"
      >
        <Typography
          alignItems="center"
          color={filter === ERROR_BACK ? "gradient" : "text.primary"}
          display="flex"
          gap={0.5}
          textTransform="none"
          variant="subtitle2"
        >
          <MuisticaIcon color="error" fontSize="small" variant="filled">
            alert
          </MuisticaIcon>
          {t("criticalCount", { criticalCount })}
        </Typography>
      </ToggleButton>
      <ToggleButton data-testid="warning-toggle" position="last" value={WARNING} variant="paper">
        <Typography
          alignItems="center"
          color={filter === WARNING ? "gradient" : "text.primary"}
          display="flex"
          gap={0.5}
          textTransform="none"
          variant="subtitle2"
        >
          <MuisticaIcon color="warning" fontSize="small" variant="filled">
            warning
          </MuisticaIcon>
          {t("warningCount", { warningCount })}
        </Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

AlertToggle.propTypes = {
  warningCount: PropTypes.number,
  criticalCount: PropTypes.number,
  getFilter: PropTypes.func,
  disabled: PropTypes.bool,
  "data-testid": PropTypes.string,
};
