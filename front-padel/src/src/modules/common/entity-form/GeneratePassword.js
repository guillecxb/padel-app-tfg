import { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useFormikContext } from "formik";

import { Button, Tooltip, Typography } from "@mui/material";

const charset = [
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "abcdefghijklmnopqrstuvwxyz",
  "0123456789",
  "!%*#?&",
];
function generatePassword(minLength) {
  const retVal = [];

  while (retVal.length < minLength) {
    for (let j = 0; j < charset.length; ++j) {
      retVal.push(charset[j].charAt(Math.floor(Math.random() * charset.length)));
    }
  }

  return retVal
    .sort(() => {
      return 0.5 - Math.random();
    })
    .join("");
}

const GeneratePassword = ({
  destinationField,
  generatedLabel,
  generateLabel,
  length,
  "data-testid": dataTestid,
  variant = "outlined",
  setGeneratedPassword,
}) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [generated, setGenerated] = useState(false);

  const onGenerate = useCallback(async () => {
    const newPass = generatePassword(length);
    setTimeout(() => setFieldTouched(destinationField, true), 100);
    setFieldValue(destinationField, newPass);
    setGeneratedPassword && setGeneratedPassword(true);
    setGenerated(true);
  }, [length, setFieldValue, destinationField, setGeneratedPassword, setFieldTouched]);

  useEffect(() => {
    const generatedTimeout =
      generated &&
      setTimeout(() => {
        setGenerated(false);
      }, 3000);
    return () => generatedTimeout && clearTimeout(generatedTimeout);
  }, [generated]);

  return (
    <Tooltip
      disableFocusListener
      disableHoverListener
      disableTouchListener
      open={generated}
      placement="top"
      title={generatedLabel}
    >
      <Button color="primary" data-testid={dataTestid} onClick={onGenerate} variant={variant}>
        <Typography color="highlighted" variant="caption2">
          {generateLabel}
        </Typography>
      </Button>
    </Tooltip>
  );
};

GeneratePassword.propTypes = {
  "data-testid": PropTypes.string,
  destinationField: PropTypes.string.isRequired,
  generatedLabel: PropTypes.string.isRequired,
  generateLabel: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  variant: PropTypes.string,
  setGeneratedPassword: PropTypes.func,
};

export default GeneratePassword;
