import { useCallback } from "react";
import PropTypes from "prop-types";

import { getIn, useFormikContext } from "formik";

import { Checkbox as MuiCheckbox, FormControlLabel, Switch } from "@mui/material";

const Checkbox = ({
  disabled,
  "data-testid": dataTestid,
  id,
  name,
  label,
  useSwitch,
  ...rest
}) => {
  const { setFieldTouched, setFieldValue, handleBlur, values } = useFormikContext();

  const handleChange = useCallback(
    (event) => {
      setFieldTouched(name);
      setFieldValue(name, event.target.checked, true);
    },
    [name, setFieldTouched, setFieldValue]
  );
  const value = getIn(values, name);

  const CheckboxComponent = useSwitch ? Switch : MuiCheckbox;

  return (
    <>
      <FormControlLabel
        control={
          <CheckboxComponent
            checked={value ?? false}
            data-testid={dataTestid}
            id={id}
            name={name}
            onBlur={handleBlur}
            onChange={handleChange}
            {...rest}
          />
        }
        disabled={disabled}
        label={label}
      />
    </>
  );
};

Checkbox.propTypes = {
  disabled: PropTypes.bool,
  useSwitch: PropTypes.bool,
  "data-testid": PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default Checkbox;
