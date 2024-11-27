import { useCallback, useMemo } from "react";
import { PropTypes } from "prop-types";

import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  IconButton,
  Radio,
  Typography,
  FormHelperText,
} from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

export const MultipleSelector = ({
  selectedFilters,
  setSelectedFilters,
  values,
  name,
  tag,
  handleBlur,
  disabled,
  singleSelection = false,
  optional = false,
  selectionIcon = false,
  "data-testid": dataTestid,
  error,
  helperText,
}) => {
  const valueToLabel = useMemo(
    () => values.reduce((acc, { value, label }) => ({ ...acc, [value]: label }), {}),
    [values]
  );

  const renderValue = useCallback(
    (selected) => {
      const selectedValues = Array.isArray(selected) ? selected : [selected];
      return (
        <Typography
          data-testid="selection-text"
          style={{
            marginTop: 10,
            marginRight: 30,
            marginLeft: "-2px",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
          variant="body2"
        >
          {selectedValues.map((sel) => valueToLabel[sel]).join(", ")}
        </Typography>
      );
    },
    [valueToLabel]
  );

  const handleChange = useCallback(
    (event) => {
      const {
        target: { value },
      } = event;
      setSelectedFilters(typeof value === "string" ? value.split(",") : value);
    },
    [setSelectedFilters]
  );

  const clearSearch = useCallback(() => {
    setSelectedFilters([]);
  }, [setSelectedFilters]);

  const handleIcon = (params) => {
    const iconName = params?.className?.includes("MuiSelect-iconOpen")
      ? "chevron-up"
      : "chevron-down";
    return (
      <Box mr={1} mt={1}>
        <MuisticaIcon color="text.primary">{iconName}</MuisticaIcon>
      </Box>
    );
  };

  return (
    <FormControl
      data-testid={dataTestid}
      disabled={disabled}
      error={!!error && !helperText}
      fullWidth
      variant="filled"
    >
      <InputLabel data-testid="tag">{tag}</InputLabel>
      <Box alignItems="center" display="flex" position="relative">
        <Select
          IconComponent={handleIcon}
          data-testid="select"
          input={<OutlinedInput fullWidth label={tag} />}
          multiple={!singleSelection}
          name={name}
          notched={false}
          onBlur={handleBlur}
          onChange={handleChange}
          renderValue={renderValue}
          value={selectedFilters}
        >
          {values.map(({ label, value, disabled: disabledFilter }) => (
            <MenuItem
              data-testid="multiple-selector-item"
              disabled={disabledFilter}
              key={value}
              value={value}
            >
              {selectionIcon &&
                (singleSelection ? (
                  <Radio checked={selectedFilters.indexOf(value) > -1} />
                ) : (
                  <Checkbox checked={selectedFilters.indexOf(value) > -1} />
                ))}
              <ListItemText primary={label} />
            </MenuItem>
          ))}
        </Select>
        {!!selectedFilters?.length && !optional && (
          <Box position="absolute" style={{ right: 30 }}>
            <IconButton
              data-testid="multiple-selector-clear"
              onClick={clearSearch}
              size="small"
              title="Clear"
            >
              <MuisticaIcon color="text.primary">close</MuisticaIcon>
            </IconButton>
          </Box>
        )}
      </Box>
      <FormHelperText>{error ?? helperText}</FormHelperText>
    </FormControl>
  );
};

MultipleSelector.propTypes = {
  tag: PropTypes.string,
  name: PropTypes.string,
  selectedFilters: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  setSelectedFilters: PropTypes.func,
  singleSelection: PropTypes.bool,
  optional: PropTypes.bool,
  selectionIcon: PropTypes.bool,
  disabled: PropTypes.bool,
  handleBlur: PropTypes.func,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any,
      value: PropTypes.any,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    })
  ),
  "data-testid": PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
};

MultipleSelector.defaultProps = {
  disabled: false,
};
