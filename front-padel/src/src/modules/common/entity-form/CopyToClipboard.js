import { useState, useEffect, useCallback, useMemo } from "react";
import PropTypes from "prop-types";

import { useFormikContext } from "formik";

import { Button, Tooltip, Typography } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

const CopyToClipboard = ({
  originField,
  copiedLabel,
  copyLabel,
  "data-testid": dataTestid,
  color = "primary",
}) => {
  const [copied, setCopied] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const { values, errors } = useFormikContext();

  const value = values[originField];
  const error = errors[originField];

  const text = useMemo(() => {
    return value;
  }, [value]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  }, [text]);

  useEffect(() => {
    setDisabled(Boolean(error || !value));
  }, [errors, values, originField, error, value]);

  useEffect(() => {
    const copiedTimeout =
      copied &&
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    return () => copiedTimeout && clearTimeout(copiedTimeout);
  }, [copied]);

  return (
    <Tooltip
      disableFocusListener
      disableHoverListener
      disableTouchListener
      open={copied}
      placement="top"
      title={copiedLabel}
    >
      <Button
        color="primary"
        data-testid={dataTestid}
        disabled={disabled}
        onClick={handleCopy}
        startIcon={
          <MuisticaIcon color={color} variant="filled">
            copy
          </MuisticaIcon>
        }
        variant="outlined"
      >
        <Typography color="highlighted" variant="caption2">
          {copyLabel}
        </Typography>
      </Button>
    </Tooltip>
  );
};

CopyToClipboard.propTypes = {
  "data-testid": PropTypes.string,
  originField: PropTypes.string,
  copiedLabel: PropTypes.string,
  copyLabel: PropTypes.string,
  color: PropTypes.string,
};

export default CopyToClipboard;
