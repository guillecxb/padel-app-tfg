import PropTypes from "prop-types";
import { useMemo, useState, useEffect } from "react";

import { Pagination, Box, Skeleton } from "@mui/material";

import LoadingError from "modules/common/loading-error/LoadingError";

import { useNotificationsTranslation } from "translations";

import RowsPerPage from "./RowsPerPage";
import { MuiTable } from "./MuiTable";

const DataTable = ({
  translationKey = "default",
  "data-testid": dataTestid,
  rowsPerPage = 5,
  rowsPerPageOptions = [5, 10, 15],
  data = [],
  columns = [],
  isLoading,
  withSkeleton,
  empty,
  error,
  showPagination = true, // Nueva prop con valor por defecto true
}) => {
  const t = useNotificationsTranslation();
  const [page, setPage] = useState(0);
  const [rowsPerPageInner, setRowsPerPageInner] = useState(rowsPerPage);

  useEffect(() => {
    setPage(0);
  }, [rowsPerPageInner]);

  const options = useMemo(
    () => ({
      textLabels: {
        body: {
          noMatch: empty ? t(`${translationKey}.empty`) : t(`${translationKey}.noMatch`),
        },
      },
      selectableRows: "none",
      elevation: 2,
      page,
      rowsPerPage: rowsPerPageInner,
      filter: false,
      search: false,
      print: false,
      download: false,
      viewColumns: false,
      customToolbar: null,
      rowHover: false,
      responsive: "standard",
      customFooter: () => <></>,
    }),
    [empty, page, rowsPerPageInner, t, translationKey]
  );

  const handlePagination = (_e, value) => {
    setPage(value - 1);
  };

  return (
    <LoadingError
      Skeleton={withSkeleton && Skeleton}
      data-testid={dataTestid}
      error={error}
      isLoading={isLoading}
      skeletonProps={{ height: 385 }}
      translationKey={translationKey}
    >
      <Box data-testid={dataTestid}>
        <MuiTable columns={columns} data={data} options={options} />
        {showPagination && (
          <Box display="flex" flexGrow={1} justifyContent="end" mt={2}>
            {!!rowsPerPageOptions.length && (
              <RowsPerPage
                onChange={setRowsPerPageInner}
                rowsPerPageOptions={rowsPerPageOptions}
              />
            )}
            <Pagination
              color="primary"
              count={Math.ceil(data.length / rowsPerPageInner)}
              onChange={handlePagination}
              page={page + 1}
              showFirstButton
              showLastButton
              size={"small"}
            />
          </Box>
        )}
      </Box>
    </LoadingError>
  );
};

DataTable.propTypes = {
  translationKey: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  rowsPerPage: PropTypes.number,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
  isLoading: PropTypes.bool,
  withSkeleton: PropTypes.bool,
  empty: PropTypes.bool,
  error: PropTypes.any,
  "data-testid": PropTypes.string,
  showPagination: PropTypes.bool, // Nueva prop para controlar la visibilidad de la paginación
};

export default DataTable;
