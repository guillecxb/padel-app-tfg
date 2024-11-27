import { useCallback, useEffect, useState } from "react";
import { PropTypes } from "prop-types";

import { Button, IconButton, Box, Menu, Typography, TextField, Stack } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { MultipleSelector } from "modules/common/inputs/MultipleSelector";
import { localeDate } from "modules/helpers/dates";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { useFiltersTranslation } from "translations";

export const FilterButton = ({
  filterGroups,
  getSelected = () => {},
  filterInitialState,
  disabled,
}) => {
  const t = useFiltersTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState(
    filterInitialState ? [filterInitialState] : []
  );

  const open = Boolean(anchorEl);

  useEffect(() => {
    getSelected(selectedFilters);
  }, [getSelected, selectedFilters]);

  const handleOpen = useCallback((event) => {
    setAnchorEl(event.currentTarget.parentNode);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleReset = useCallback(() => {
    setSelectedFilters([]);
  }, []);

  const handleSelection = useCallback((filter, key) => {
    setSelectedFilters((selectedFilters) => {
      if (filter.length) {
        return {
          ...selectedFilters,
          [key]: filter,
        };
      } else {
        delete selectedFilters[key];
        return {
          ...selectedFilters,
        };
      }
    });
  }, []);

  return (
    <Box>
      <Button
        behaviour="menu"
        color="primary"
        data-testid="filter-button"
        disabled={disabled}
        onClick={handleOpen}
        size="large"
        startIcon={
          <MuisticaIcon color="icon" variant="filled">
            controls
          </MuisticaIcon>
        }
        variant="outlined"
      >
        <Typography color="highlighted" noWrap>
          {t("title")} ({Object.keys(selectedFilters).length})
        </Typography>
      </Button>

      <Box alignItems="flex-end" display="flex">
        <Menu anchorEl={anchorEl} data-testid="filter-menu" onClose={handleClose} open={open}>
          <Box minWidth={348} p={2} pt={1}>
            <Box alignItems="center" display="flex" justifyContent="space-between" mb={2}>
              <Box alignItems="center" display="flex" ml={1}>
                <Typography color="text.secondary" mr={1} variant="h4">
                  {t("title")}
                </Typography>
                <Button data-testid="filters-reset" onClick={handleReset}>
                  <Typography color="highlighted" variant="subtitle2">
                    {t("reset")}
                  </Typography>
                </Button>
              </Box>
              <IconButton color="secondary" data-testid="filters-close" onClick={handleClose}>
                <MuisticaIcon color="text.primary">close</MuisticaIcon>
              </IconButton>
            </Box>
            <Stack spacing={1}>
              {filterGroups.map(
                ({ key, singleSelection = false, title, values = [], disabled, type }) =>
                  type === "date-time-picker" ? (
                    <LocalizationProvider dateAdapter={AdapterDateFns} key={title}>
                      <DateTimePicker
                        data-testid="date-time-picker"
                        disabled={disabled}
                        label={title}
                        onChange={(filter) => handleSelection([localeDate(filter)], key)}
                        renderInput={(props) => <TextField sx={{ m: 1, width: 300 }} {...props} />}
                        value={selectedFilters[key]?.length ? selectedFilters[key][0] : null}
                      />
                    </LocalizationProvider>
                  ) : (
                    <MultipleSelector
                      data-testid="multiple-selector"
                      disabled={disabled}
                      key={title}
                      optional={singleSelection}
                      selectedFilters={selectedFilters[key] || []}
                      selectionIcon
                      setSelectedFilters={(filter) => handleSelection(filter, key)}
                      singleSelection={singleSelection}
                      tag={title}
                      values={values}
                    />
                  )
              )}
            </Stack>
          </Box>
        </Menu>
      </Box>
    </Box>
  );
};

FilterButton.propTypes = {
  getSelected: PropTypes.func,
  filterInitialState: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      values: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    })
  ),
  filterGroups: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      values: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  disabled: PropTypes.bool,
};
