import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useFormikContext } from "formik";

import { debounce } from "@mui/material/utils";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Box,
  Autocomplete,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Stack,
} from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

const RemoteAutocomplete = ({
  fetchCallback,
  getValue,
  disabled,
  "data-testid": dataTestid,
  id,
  helperText,
  label,
  labelSelected,
  isLoading,
  name,
  inputName,
  ...rest
}) => {
  const [options, setOptions] = useState([""]);
  const [open, setOpen] = useState(false);

  const { values, errors, touched, setFieldValue, setFieldTouched } = useFormikContext();
  const setInputValue = useCallback(
    (value) => {
      setFieldValue(inputName, value);
    },
    [inputName, setFieldValue]
  );

  const value = values[name];
  const inputValue = values[inputName];
  const error = errors[name];
  const isTouched = touched[name];

  const isOptionEqualToValue = useCallback((option, value) => {
    return option === value;
  }, []);

  const fetch = useMemo(
    () =>
      debounce(async (request, callback) => {
        const { data, isSuccess } = await fetchCallback(request);
        callback(data, isSuccess);
      }, 200),
    [fetchCallback]
  );

  useEffect(() => {
    let active = true;

    if (!inputValue || inputValue.length < 5) {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ params: { address: inputValue } }, (data, isSuccess) => {
      if (active) {
        let newOptions = [];

        if (isSuccess && data && data.results && data.results.length) {
          newOptions = [...newOptions, ...data?.results?.map((res) => getValue(res))];
        }
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetchCallback, fetch, getValue]);

  const onChange = useCallback(
    (event, newValue) => {
      setFieldTouched(name, true);
      setFieldValue(name, newValue);
    },
    [name, setFieldTouched, setFieldValue]
  );

  return (
    <>
      <Autocomplete
        autoComplete
        autoHighlight
        data-testid={dataTestid}
        disabled={disabled}
        filterOptions={(x) => x}
        getOptionLabel={(option) => option}
        handleHomeEndKeys
        id={id}
        isOptionEqualToValue={isOptionEqualToValue}
        loading={isLoading}
        loadingText={"Loading..."}
        noOptionsText={""}
        onChange={onChange}
        onClose={(_e, reason) => {
          if (reason === "selectOption") {
            setOpen(false);
          }
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onOpen={(e) => {
          if (e.type === "mousedown") {
            return;
          }
          if (inputValue) {
            setOpen(true);
          }
        }}
        open={open}
        options={options}
        popupIcon={null}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="end">
                    <MuisticaIcon color="text.primary">search</MuisticaIcon>
                  </InputAdornment>
                ),
              }}
              fullWidth
              helperText={helperText}
              label={label}
            />
          );
        }}
        renderOption={(props, option) => {
          return (
            <li {...props}>
              <Grid alignItems="center" container>
                <Grid item>
                  <Box component={LocationOnIcon} sx={{ color: "text.secondary", mr: 2 }} />
                </Grid>
                <Grid item xs>
                  <Typography color="text.secondary" variant="body2">
                    {option}
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
        value={value}
        {...rest}
      />
      <Stack alignItems="center" direction="row" justifyContent="space-between">
        <Box alignItems="center" display="flex" gap={2} mt={4}>
          <Typography variant="subtitle">{labelSelected}:</Typography>
          <Typography data-testid={`${dataTestid}-selected`} variant="body2">
            {value}
          </Typography>
        </Box>
        <Box alignItems="center" pt={2}>
          <IconButton
            onClick={() => {
              setFieldTouched(name, true);
              setFieldValue(name, null);
            }}
            variant="contrast"
          >
            <MuisticaIcon color="text.primary" fontSize="medium">
              trash-can
            </MuisticaIcon>
          </IconButton>
        </Box>
      </Stack>
      <Typography color="error.main" variant="caption">
        {isTouched && error ? error : ""}
      </Typography>
    </>
  );
};

RemoteAutocomplete.propTypes = {
  disabled: PropTypes.bool,
  footer: PropTypes.node,
  "data-testid": PropTypes.string,
  inputProps: PropTypes.any,
  id: PropTypes.string.isRequired,
  info: PropTypes.node,
  infoTooltip: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  labelSelected: PropTypes.string,
  isLoading: PropTypes.bool,
  inputName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fetchCallback: PropTypes.func.isRequired,
  getValue: PropTypes.func.isRequired,
};

export default RemoteAutocomplete;
