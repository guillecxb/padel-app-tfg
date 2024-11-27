import PropTypes from "prop-types";
import { useMemo, useState, useEffect, Children } from "react";

import { Pagination, Box, Typography, Grid } from "@mui/material";

import LoadingError from "modules/common/loading-error/LoadingError";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { useNotificationsTranslation } from "translations";

import RowsPerPage from "./RowsPerPage";

const CardsTable = ({
  translationKey = "default",
  columns = 1,
  "data-testid": dataTestid,
  rowsPerPage = 5,
  rowsPerPageOptions = [5, 10, 15],
  paginateWith = 5,
  children,
  isLoading,
  error,
  empty,
}) => {
  const t = useNotificationsTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPageInner, setRowsPerPageInner] = useState(rowsPerPage);

  useEffect(() => {
    setPage(0);
  }, [rowsPerPageInner]);

  const handlePagination = (_e, value) => {
    setPage(value - 1);
  };

  const items = useMemo(
    () =>
      Children.count(children) < paginateWith
        ? Children.toArray(children)
        : Children.toArray(children).slice(
            page * rowsPerPageInner,
            page * rowsPerPageInner + rowsPerPageInner
          ),
    [children, page, paginateWith, rowsPerPageInner]
  );

  return (
    <LoadingError
      data-testid={dataTestid}
      error={error}
      isLoading={isLoading}
      translationKey={translationKey}
    >
      <Box data-testid={dataTestid}>
        {items?.length ? (
          <>
            <Grid container spacing={2}>
              {items.map((item, key) => (
                <Grid item key={key} md={12 / columns} xs={12}>
                  {item}
                </Grid>
              ))}
            </Grid>
            <Box display="flex" flexGrow={1} justifyContent="end" mt={2}>
              {!!rowsPerPageOptions.length && (
                <RowsPerPage
                  onChange={setRowsPerPageInner}
                  rowsPerPageOptions={rowsPerPageOptions}
                />
              )}
              <Pagination
                color="primary"
                count={Math.ceil(Children.count(children) / rowsPerPageInner)}
                onChange={handlePagination}
                page={page + 1}
                showFirstButton
                showLastButton
              />
            </Box>
          </>
        ) : (
          <Typography
            alignItems="center"
            color="text.primary"
            data-testid={`${dataTestid}-empty`}
            display="flex"
            gap={1}
          >
            <MuisticaIcon color="info" fontSize="large">
              information-user
            </MuisticaIcon>
            {empty ? t(`${translationKey}.empty`) : t(`${translationKey}.noMatch`)}
          </Typography>
        )}
      </Box>
    </LoadingError>
  );
};

CardsTable.propTypes = {
  translationKey: PropTypes.string,
  paginateWith: PropTypes.number,
  children: PropTypes.any,
  columns: PropTypes.number,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  isLoading: PropTypes.bool,
  empty: PropTypes.bool,
  error: PropTypes.any,
  "data-testid": PropTypes.string,
};

export default CardsTable;
