import PropTypes from "prop-types";

import { useFormikContext } from "formik";

import { Button, Tooltip } from "@mui/material";

const SubmitButton = ({
  id,
  children,
  className,
  endIcon,
  onClick,
  disabled = null,
  fullWidth,
  "data-testid": dataTestid,
  size = "medium",
  variant = "contained",
  color = "primary",
  showTooltip,
  skipTouched,
  tooltipText = "",
  type = "submit",
}) => {
  const { touched, isSubmitting, errors } = useFormikContext();
  const isTouched = skipTouched ? skipTouched : Object.keys(touched).length > 0;

  const isDisabled =
    disabled !== null ? disabled : Object.keys(errors).length > 0 || !isTouched || isSubmitting;

  return (
    <Tooltip
      disableFocusListener
      disableHoverListener
      disableTouchListener
      open={showTooltip}
      placement="top"
      title={tooltipText}
    >
      <Button
        className={className}
        color={color}
        data-testid={dataTestid}
        disabled={isDisabled}
        endIcon={endIcon}
        fullWidth={fullWidth}
        id={id}
        onClick={onClick}
        size={size}
        type={type}
        variant={variant}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

SubmitButton.propTypes = {
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
  skipTouched: PropTypes.bool,
  tooltipText: PropTypes.string,
  type: PropTypes.string,
};

export default SubmitButton;
