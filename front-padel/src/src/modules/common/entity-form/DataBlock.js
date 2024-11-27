import PropTypes from "prop-types";

import { isFunction, useFormikContext } from "formik";

const DataBlock = ({ children }) => {
  const { values, isSubmitting, submitCount, submitForm, setFieldValue, setFieldTouched } =
    useFormikContext();
  return isFunction(children)
    ? children({ values, isSubmitting, submitCount, submitForm, setFieldValue, setFieldTouched })
    : "";
};

DataBlock.propTypes = {
  children: PropTypes.func,
};

export default DataBlock;
