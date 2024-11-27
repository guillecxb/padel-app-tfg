import PropTypes from "prop-types";
import { useCallback } from "react";

import { useFormikContext } from "formik";

import { Button } from "@mui/material";

const ResetButton = ({
  id,
  children,
  className,
  disabled = null,
  fullWidth,
  onClick,
  "data-testid": dataTestid = "reset-button",
  size = "medium",
  variant = "contained",
  color = "primary",
  endIcon,
}) => {
  const { isSubmitting, resetForm } = useFormikContext();

  const isDisabled = disabled || isSubmitting;
  const onReset = useCallback(() => {
    resetForm();
    onClick && onClick();
  }, [onClick, resetForm]);

  return (
    <Button
      className={className}
      color={color}
      data-testid={dataTestid}
      disabled={isDisabled}
      endIcon={endIcon}
      fullWidth={fullWidth}
      id={id}
      onClick={onReset}
      size={size}
      variant={variant}
    >
      {children}
    </Button>
  );
};

ResetButton.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  endIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  "data-testid": PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  showTooltip: PropTypes.bool,
  tooltipText: PropTypes.string,
};

export default ResetButton;
