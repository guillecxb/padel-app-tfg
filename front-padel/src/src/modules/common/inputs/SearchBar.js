import PropTypes from "prop-types";

import { TextField, IconButton, CircularProgress } from "@mui/material";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { useSearch } from "./hooks/useSearch";
import TextFieldAdornmentWrapper from "./TextFieldAdornmentWrapper";

export function SearchBar({
  loading,
  label,
  searchPlaceholder,
  disabled,
  setRows,
  tableRows = [],
  searchOverFields = [],
  ...params
}) {
  const { value, onChange, clearSearch } = useSearch({
    tableRows,
    searchOverFields,
    setRows,
  });

  return (
    <TextFieldAdornmentWrapper icon="search">
      <TextField
        fullWidth
        label={label || "Search"}
        onChange={onChange}
        {...params}
        InputProps={{
          endAdornment: (
            <>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              <IconButton
                aria-label="Clear"
                data-testid="search-clear-button"
                onClick={clearSearch}
                size="small"
                style={{ visibility: value ? "visible" : "hidden" }}
                title="Clear"
              >
                <MuisticaIcon color="text.primary">close</MuisticaIcon>
              </IconButton>
            </>
          ),
        }}
        data-testid="search"
        disabled={disabled}
        placeholder={searchPlaceholder}
        value={value}
      />
    </TextFieldAdornmentWrapper>
  );
}

SearchBar.propTypes = {
  "data-testid": PropTypes.string,
  setRows: PropTypes.func,
  tableRows: PropTypes.array,
  searchOverFields: PropTypes.array,
  loading: PropTypes.bool,
  label: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
};
