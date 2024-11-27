import PropTypes from "prop-types";

import { useFormikContext } from "formik";

import { Button, Tooltip } from "@mui/material";

const WizardButton = ({
  id,
  children,
  className,
  endIcon,
  startIcon,
  onClick,
  disabled = null,
  fullWidth,
  "data-testid": dataTestid,
  size = "large",
  variant = "contained",
  color = "primary",
  showTooltip,
  tooltipText = "",
  stepFields = [],
  skipTouched,
}) => {
  const { isSubmitting, errors, touched } = useFormikContext();
  const hasErrors = stepFields.some((field) => Object.keys(errors).includes(field));

  const isStepTouched = skipTouched
    ? skipTouched
    : stepFields.every((field) => Object.keys(touched).includes(field));

  const isDisabled = !isStepTouched || disabled || hasErrors || isSubmitting;

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
        startIcon={startIcon}
        variant={variant}
      >
        {children}
      </Button>
    </Tooltip>
  );
};

WizardButton.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  endIcon: PropTypes.node,
  startIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  "data-testid": PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.string,
  color: PropTypes.string,
  showTooltip: PropTypes.bool,
  tooltipText: PropTypes.string,
  stepFields: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  skipTouched: PropTypes.bool,
};

export default WizardButton;
