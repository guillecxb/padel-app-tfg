import PropTypes from "prop-types";
import { useMemo } from "react";

import { useFormikContext, getIn } from "formik";

import { Box, TextField as MuiTextField } from "@mui/material";

const TextField = ({
  disabled,
  "data-testid": dataTestid,
  inputProps = {},
  id,
  name,
  label,
  helperText,
  footer,
  type,
  ...rest
}) => {
  const { touched, values, errors, handleBlur, handleChange } = useFormikContext();

  const isTouched = getIn(touched, name);
  const value = getIn(values, name);
  const error = useMemo(() => {
    if (name.includes(".") && typeof errors[name.split(".")[0]] === "string") {
      return getIn(errors, name.split(".")[0]);
    }
    return getIn(errors, name);
  }, [errors, name]);

  return (
    <>
      <MuiTextField
        InputProps={{ ...inputProps, autoComplete: type === "password" ? "new-password" : "off" }}
        data-testid={dataTestid}
        disabled={disabled}
        error={isTouched && !!error}
        fullWidth
        helperText={isTouched && error ? error : helperText}
        id={id}
        label={label}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        type={type}
        value={value}
        {...rest}
      />
      {!!footer && <Box>{footer}</Box>}
    </>
  );
};

TextField.propTypes = {
  disabled: PropTypes.bool,
  footer: PropTypes.node,
  "data-testid": PropTypes.string,
  inputProps: PropTypes.any,
  id: PropTypes.string.isRequired,
  info: PropTypes.node,
  infoTooltip: PropTypes.string,
  loadingMessage: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  note: PropTypes.node,
  success: PropTypes.node,
  warning: PropTypes.node,
  helperText: PropTypes.node,
  type: PropTypes.string,
};

export default TextField;
