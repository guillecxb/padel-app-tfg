import PropTypes from "prop-types";
import { useCallback, useMemo, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Paper } from "@mui/material";

export const MuiTable = ({ columns, data, options }) => {
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState(null);

  const enableSort = useCallback(
    (id) => {
      setOrderBy(id);
      setOrder(order === "asc" ? "desc" : "asc");
    },
    [order]
  );

  const sortedData = useMemo(() => {
    if (!orderBy || !data || !data.length) {
      return data;
    }
    const sortingByCol = columns.find((col) => col.name === orderBy);

    const descendingComparator = (a, b, orderBy) => {
      const renderedA = sortingByCol.options?.sortingRender
        ? sortingByCol.options?.sortingRender(a[orderBy])
        : a[orderBy];
      const renderedB = sortingByCol.options?.sortingRender
        ? sortingByCol.options?.sortingRender(b[orderBy])
        : b[orderBy];

      if (renderedB < renderedA) {
        return -1;
      }
      if (renderedB > renderedA) {
        return 1;
      }
      return 0;
    };

    return data.slice().sort((a, b) => {
      return order === "desc"
        ? descendingComparator(a, b, orderBy)
        : -descendingComparator(a, b, orderBy);
    });
  }, [columns, data, order, orderBy]);

  const defaultRender = useCallback(
    (value) => <Typography variant="body2">{value}</Typography>,
    []
  );

  const defaultLabelRender = useCallback(
    (value, id) => (
      <TableSortLabel
        active={orderBy === id}
        direction={orderBy === id ? order : "asc"}
        onClick={(e) => enableSort(id, e)}
      >
        <Typography variant="subtitle">{value}</Typography>
      </TableSortLabel>
    ),
    [enableSort, order, orderBy]
  );
  const nonSortableLabelRender = useCallback(
    (value) => <Typography variant="subtitle">{value}</Typography>,
    []
  );

  const emptyRows =
    options.page > 0 ? Math.max(0, (1 + options.page) * options.rowsPerPage - data.length) : 0;

  const visibleRows = useMemo(
    () =>
      sortedData.slice(
        options.page * options.rowsPerPage,
        options.page * options.rowsPerPage + options.rowsPerPage
      ),
    [options.page, options.rowsPerPage, sortedData]
  );
  const visibleColumns = columns.filter((col) => col.options?.display !== "excluded");

  return (
    <Paper elevation={options.elevation} sx={{ overflow: "hidden" }}>
      <Box>
        <Table style={{ width: "100%", tableLayout: "fixed" }}>
          <TableHead>
            <TableRow>
              {visibleColumns.map((col, key) => {
                const width = col.options?.width || "auto";
                return (
                  <TableCell
                    data-testid={`${col.name}-header`}
                    key={`head-${key}`}
                    style={{ width }}
                  >
                    {!col.options?.hideLabel === true ? (
                      col.options?.sort === false ? (
                        nonSortableLabelRender(col.label)
                      ) : (
                        defaultLabelRender(col.label, col.name)
                      )
                    ) : (
                      <></>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {(!data || !data.length) && (
              <TableRow>
                <TableCell colSpan={visibleColumns.length}>
                  <Typography sx={{ textAlign: "center" }} variant="body2">
                    {options.textLabels.body.noMatch}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {visibleRows.map((row, rowKey) => (
              <TableRow
                data-testid={`MUIDataTableBodyRow-${rowKey}`}
                hover={!!options.hover}
                key={`row-${rowKey}`}
                selected={row.selected}
              >
                {visibleColumns.map((col, colKey) => (
                  <TableCell
                    data-testid={`${col.name}`}
                    key={`col-${colKey}`}
                    style={{ width: "auto" }}
                    sx={{ padding: "4px 20px" }} // Ajusta el padding de las celdas
                  >
                    {col.options?.customBodyRender
                      ? col.options?.customBodyRender(row[col.name], {
                          rawRow: row,
                          rowData: Object.values(row),
                          columnData: col,
                          colKey: colKey,
                          rowKey: rowKey,
                        })
                      : defaultRender(row[col.name])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {emptyRows ? (
              <TableRow
                style={{
                  height: 92 * emptyRows,
                }}
              >
                <TableCell colSpan={visibleColumns.length}> </TableCell>
              </TableRow>
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

MuiTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      label: PropTypes.string,
      options: PropTypes.shape({
        customBodyRender: PropTypes.func,
        display: PropTypes.oneOf(["excluded", true]),
        sortingRender: PropTypes.func,
        filter: PropTypes.bool,
        sort: PropTypes.bool,
        hideLabel: PropTypes.bool,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      }),
    })
  ),
  data: PropTypes.array,
  options: PropTypes.shape({
    elevation: PropTypes.number,
    hover: PropTypes.any,
    textLabels: PropTypes.any,
    rowsPerPage: PropTypes.number,
    page: PropTypes.number,
  }),
};
