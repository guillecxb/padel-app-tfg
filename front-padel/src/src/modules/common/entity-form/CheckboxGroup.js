import { useCallback } from "react";
import PropTypes from "prop-types";

import { getIn, useFormikContext } from "formik";

import { Checkbox as MuiCheckbox, FormControlLabel, Switch } from "@mui/material";

const CheckboxGroup = ({
  disabled,
  "data-testid": dataTestid,
  id,
  name,
  label,
  useSwitch,
  selectedValue,
}) => {
  const { setFieldTouched, setFieldValue, handleBlur, values } = useFormikContext();
  const value = getIn(values, name);

  const handleChange = useCallback(
    (event) => {
      if (event.target.checked) {
        value.push(selectedValue);
      } else {
        value.splice(value.indexOf(selectedValue), 1);
      }

      setFieldTouched(name);
      setFieldValue(name, value, true);
    },
    [name, selectedValue, setFieldTouched, setFieldValue, value]
  );

  const CheckboxComponent = useSwitch ? Switch : MuiCheckbox;

  return (
    <>
      <FormControlLabel
        control={
          <CheckboxComponent
            checked={value?.includes(selectedValue)}
            data-testid={dataTestid}
            id={id}
            name={name}
            onBlur={handleBlur}
            onChange={handleChange}
            value={selectedValue}
          />
        }
        disabled={disabled}
        label={label}
      />
    </>
  );
};

CheckboxGroup.propTypes = {
  disabled: PropTypes.bool,
  useSwitch: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  "data-testid": PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  selectedValue: PropTypes.number,
};

export default CheckboxGroup;
