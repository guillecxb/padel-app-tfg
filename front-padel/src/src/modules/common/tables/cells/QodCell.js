import PropTypes from "prop-types";
import { useState, useEffect } from "react";

import { Select, MenuItem, Stack } from "@mui/material";

import { useSimsTranslation } from "translations";

const QodCell = ({ value, "data-testid": dataTestid, onChange }) => {
  const [qod, setQod] = useState(value);
  const translate = useSimsTranslation();

  // Sincroniza el estado interno `qod` con la propiedad `value`
  useEffect(() => {
    setQod(value);
  }, [value]);

  // Controlador para cambios en el <Select>
  const handleQodChange = (event) => {
    const newValue = event.target.value;
    setQod(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <Stack alignItems="center" data-testid={dataTestid} direction="row" spacing={1}>
      <Select
        onChange={handleQodChange}
        size="small" // Ajusta el tamaño vertical del Select
        sx={{ minWidth: 80 }} // Ajusta el ancho del Select
        value={qod}
      >
        <MenuItem value="active">{translate("table.active")}</MenuItem>
        <MenuItem value="inactive">{translate("table.inactive")}</MenuItem>
        <MenuItem value="qos_e">QOS_E</MenuItem>
      </Select>
    </Stack>
  );
};

QodCell.propTypes = {
  value: PropTypes.string.isRequired,
  "data-testid": PropTypes.string,
  onChange: PropTypes.func,
};

export default QodCell;
