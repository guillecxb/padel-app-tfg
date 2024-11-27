import { useState, useCallback } from "react";
import PropTypes from "prop-types";

import uuid from "uuid-random";

import { IconButton, Grid, TextField, Typography, Box } from "@mui/material";

import { useEnqueueSnackbar } from "modules/common/hooks/useEnqueueSnackbar";
import { ERROR_ALERT } from "modules/enumerations";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { useNotificationsTranslation } from "translations";

export const EditableTextField = ({
  textColor = "",
  placeholderColor = "text.secondary",
  value,
  label,
  focused,
  onSave,
  variant = "h3",
  maxChars,
  placeholder = "",
  rows,
  multiline = false,
  openByDefault,
  onClose,
  "data-testid": dataTestId,
  required,
  translationKey,
  ...rest
}) => {
  const et = useNotificationsTranslation();
  const enqueueSnackbar = useEnqueueSnackbar();
  const [edit, setEdit] = useState(openByDefault ?? false);
  const [text, setText] = useState(value);

  const handleEdit = useCallback((e) => {
    e.stopPropagation();
    setEdit(true);
  }, []);

  const handleOnChange = useCallback(
    (e) => {
      (!maxChars || e.target.value.length < maxChars) && setText(e.target.value);
    },
    [maxChars]
  );

  const handleOnAccept = useCallback(async () => {
    try {
      if (required && !text) {
        throw new Error("required field");
      }
      await onSave(text);
      setEdit(false);
      onClose && onClose();
    } catch {
      const translations = et(translationKey || "default", {
        returnObjects: true,
      });

      const { title, description } = translations?.error || {};

      enqueueSnackbar(description, {
        alertTitle: title,
        variant: ERROR_ALERT,
        key: uuid(),
        "data-testid": `error-${dataTestId}`,
      });
    }
  }, [required, text, onSave, onClose, et, translationKey, enqueueSnackbar, dataTestId]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !multiline) {
        handleOnAccept();
      }
    },
    [handleOnAccept, multiline]
  );

  const handleOnCancel = useCallback(() => {
    setText(value);
    setEdit(false);
    onClose && onClose();
  }, [value, onClose]);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return (
    <Grid
      alignItems="center"
      container
      data-testid={dataTestId}
      justifyContent="flex-start"
      pr={4}
      spacing={1}
      width="100%"
      wrap="nowrap"
    >
      <Grid item {...(edit && { xs: 12 })} pb={1}>
        {edit ? (
          <TextField
            InputProps={{
              endAdornment: (
                <Box
                  alignSelf={multiline ? "start" : "center"}
                  display="flex"
                  {...(multiline && { sx: { mt: -2 } })}
                >
                  <Box ml={1} mr={1}>
                    <IconButton
                      data-testid="editable-text-field-edit-cancel"
                      onClick={handleOnCancel}
                      variant="contrast"
                    >
                      <MuisticaIcon color="text.primary">cancel</MuisticaIcon>
                    </IconButton>
                  </Box>
                  <IconButton
                    data-testid="editable-text-field-edit-accept"
                    onClick={handleOnAccept}
                    variant="contrast"
                  >
                    <MuisticaIcon color="text.primary">checked</MuisticaIcon>
                  </IconButton>
                </Box>
              ),
            }}
            autoFocus
            fullWidth
            id="text-input"
            label={label}
            lines="multiline"
            onClick={stopPropagation}
            rows={rows}
            {...{ multiline }}
            onChange={handleOnChange}
            onKeyPress={handleKeyPress}
            value={text}
            {...rest}
            data-testid="editable-text-field-editing-text"
            focused={focused}
            maxRows={3}
          />
        ) : (
          <Typography
            color={!text ? placeholderColor : textColor}
            data-testid="editable-text-field-not-editing-text"
            variant={variant}
          >
            {text || placeholder}
          </Typography>
        )}
      </Grid>
      {!edit && (
        <Grid alignSelf={multiline ? "flex-start" : "stretch"} item>
          <IconButton
            data-testid="editable-text-field-edit-button"
            onClick={handleEdit}
            variant="contrast"
          >
            <MuisticaIcon color="text.primary">edit-pencil</MuisticaIcon>
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
};

EditableTextField.propTypes = {
  required: PropTypes.bool,
  multiline: PropTypes.bool,
  focused: PropTypes.bool,
  value: PropTypes.string,
  label: PropTypes.string,
  maxChars: PropTypes.number,
  rows: PropTypes.number,
  onSave: PropTypes.func,
  placeholder: PropTypes.string,
  "data-testid": PropTypes.string,
  textColor: PropTypes.string,
  placeholderColor: PropTypes.string,
  translationKey: PropTypes.string,
  openByDefault: PropTypes.bool,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf([
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "body1",
    "body2",
    "subtitle1",
    "subtitle2",
    "caption",
    "overline",
    "button",
  ]),
};
