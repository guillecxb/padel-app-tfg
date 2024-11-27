import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";

import { TextField as MuiTextField } from "@mui/material";

export const InputNumber = ({
  name,
  min,
  minError,
  onChange,
  handleBlur,
  autoFocus,
  "data-testid": dataTestId,
  value,
}) => {
  const onNumberChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      if (isNaN(parseInt(newValue))) {
        return;
      }
      onChange(e, newValue);
    },
    [onChange]
  );
  const hasError = useMemo(() => {
    return isNaN(value) || value < min;
  }, [value, min]);

  return (
    <MuiTextField
      autoFocus={autoFocus}
      data-testid={dataTestId}
      error={hasError}
      fullWidth
      helperText={hasError ? minError : ""}
      id={name.replace(".", "_")}
      inputProps={{
        inputMode: "numeric",
        pattern: "[0-9]*",
        min: min,
        type: "number",
      }}
      name={name}
      onBlur={handleBlur}
      onChange={onNumberChange}
      size="small"
      value={value}
    />
  );
};

InputNumber.propTypes = {
  name: PropTypes.string,
  min: PropTypes.number,
  minError: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  handleBlur: PropTypes.func,
  autoFocus: PropTypes.bool,
  "data-testid": PropTypes.string,
};
