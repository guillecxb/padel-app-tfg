import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useFormikContext, Field } from "formik";

import { InputNumber } from "components/atoms/fields/input-number";

const NumberField = ({ name, min, "data-testid": dataTestid, defaultValue = 0 }) => {
  const { setFieldValue, errors, handleChange, getFieldProps, handleBlur, setFieldTouched } =
    useFormikContext();
  const [init, setInit] = useState(false);
  const fieldProps = getFieldProps(name);
  const error = errors[name];
  const value = !isNaN(parseInt(fieldProps.value)) ? fieldProps.value : defaultValue;

  const onChangeField = useCallback(
    (e) => {
      setFieldTouched(name);
      handleChange(e);
    },
    [handleChange, name, setFieldTouched]
  );

  useEffect(() => {
    if (isNaN(parseInt(fieldProps.value))) {
      setFieldTouched(name);
      setFieldValue(name, defaultValue);
    }
    setInit(true);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  const validate = useCallback(
    (newValue) => {
      if (isNaN(parseInt(newValue)) || newValue < min) {
        return "error!";
      }
    },
    [min]
  );

  return (
    <>
      {init && (
        <Field
          as={InputNumber}
          data-testid={dataTestid}
          error={error}
          min={min}
          name={name}
          onBlur={handleBlur}
          onChange={onChangeField}
          validate={validate}
          value={value}
        />
      )}
    </>
  );
};

NumberField.propTypes = {
  name: PropTypes.string,
  min: PropTypes.number,
  defaultValue: PropTypes.number,
  "data-testid": PropTypes.string,
};

export default NumberField;
