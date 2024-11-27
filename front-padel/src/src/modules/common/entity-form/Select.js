import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";

import { useFormikContext, getIn } from "formik";

import { MultipleSelector } from "../inputs/MultipleSelector";

const Select = ({ name, helperText, skipTouched, ...selectProps }) => {
  const { errors, touched, values, setFieldValue, setFieldTouched, handleBlur } =
    useFormikContext();

  const isTouched = getIn(touched, name) || skipTouched;
  const fieldValue = getIn(values, name) ?? "";
  const error = useMemo(() => {
    if (name.includes(".") && typeof errors[name.split(".")[0]] === "string") {
      return getIn(errors, name.split(".")[0]);
    }
    return getIn(errors, name);
  }, [errors, name]);

  const updateField = useCallback(
    (data) => {
      const value = Array.isArray(data) ? data[0] : data;
      setFieldTouched(name, true);
      setFieldValue(name, value, true);
    },
    [name, setFieldTouched, setFieldValue]
  );

  return (
    <MultipleSelector
      {...selectProps}
      error={isTouched && error ? error : helperText}
      handleBlur={handleBlur}
      helperText={helperText}
      name={name}
      optional
      selectedFilters={fieldValue}
      selectionIcon={false}
      setSelectedFilters={updateField}
      singleSelection
    />
  );
};

Select.propTypes = {
  ...MultipleSelector.propTypes,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Select;
