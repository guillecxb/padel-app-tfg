import { useState, useEffect, useMemo, useCallback } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, Button, Paper, Stack, Typography } from "@mui/material";

import { useUsersQuery } from "domain/accounts/apiSlices/usersApiSlice";
import { getMe } from "domain/accounts/slices/authSlice";

import {
  renderActionsCell,
  renderCopyCell,
  renderDateCell,
  renderLabelCell,
  renderOidCell,
} from "modules/common/tables/cells";
import DataTable from "modules/common/tables/DataTable";
import { dateFilters, FILTER_NAMES, OP_US_FILTERS } from "modules/common/tables/filters/constants";
import { FilterButton } from "modules/common/tables/filters/FilterButton";
import { SearchBar } from "modules/common/inputs/SearchBar";
import { ROUTES } from "modules/app/router";
import useFilters from "modules/common/tables/hooks/useFilters";

import SectionTitle from "components/molecules/section-title/SectionTitle";

import { useOperatorsTranslation, useRolesTranslation } from "translations";

import { localeDate } from "../modules/helpers/dates";

const Operators = () => {
  const t = useOperatorsTranslation();
  const filters = useFilters(OP_US_FILTERS);
  const rt = useRolesTranslation();

  const navigate = useNavigate();
  
  // Aquí obtendrás customerId de Redux u otra fuente, según la configuración de tu proyecto
  const { customerId } = useSelector(getMe);

  // Modificación en la consulta para incluir el parámetro customer_id
  const {
    data: { count = "-", results: users } = {},
    isLoading: isUsersLoading,
    error: usersError,
  } = useUsersQuery({ params: { customer_id: customerId } });

  const [selectedFilters, setSelectedFilters] = useState({ lastCon: [] });
  const [searchRows, setSearchRows] = useState();
  const [filteredRows, setFilteredRows] = useState([]);

  const handleEdit = useCallback(
    (id) => {
      const route = generatePath(ROUTES.operatorsEdit, { id });
      navigate(route);
    },
    [navigate]
  );

  const handleView = useCallback(
    (id) => {
      const route = generatePath(ROUTES.operatorsView, { id });
      navigate(route);
    },
    [navigate]
  );

  const operatorColumns = useMemo(
    () => [
      {
        name: "id",
        label: t("table.id"),
        options: {
          customBodyRender: renderCopyCell,
        },
      },
      {
        name: "id",
        label: t("table.id"),
        options: {
          customBodyRender: (value, params) => {
            const renderId =
              customerId === value ? (
                <CustomTrans>{t("currentUser", { id: value })}</CustomTrans>
              ) : (
                value
              );
            return renderCopyCell(renderId, params);
          },
        },
      },
      {
        name: "name",
        label: t("table.name"),
        options: {
          customBodyRender: renderCopyCell,
        },
      },
      {
        name: "role",
        label: t("table.role"),
        options: {
          customBodyRender: (value, params) => renderCopyCell(rt(value), params),
        },
      },
      {
        name: "actions",
        label: " ",
        options: {
          customBodyRender: (_value, { rowData }) => {
            return renderActionsCell({ id: rowData[0], handleEdit, handleView });
          },
          filter: false,
          sort: false,
          hideLabel: true,
        },
      },
    ],
    [handleEdit, handleView, rt, t]
  );

  const handleAddOperator = useCallback(() => navigate(ROUTES.operatorsAdd), [navigate]);

  useEffect(() => {
    setSearchRows(users);
  }, [users]);

  useEffect(() => {
    const filterLstConnection = selectedFilters[FILTER_NAMES.lastConnection]?.length
      ? searchRows.filter(
          (row) =>
            selectedFilters[FILTER_NAMES.lastConnection].filter((filter) =>
              dateFilters[filter](row.last_login)
            ).length
        )
      : searchRows;
    setFilteredRows(filterLstConnection);
  }, [searchRows, selectedFilters, t]);

  return (
    <div data-testid="operator-dashboard-page">
      <SectionTitle title={t("headerTitle")} />
      <Paper sx={{ p: 6 }}>
        <Box alignItems="center" display="flex" justifyContent="space-between" mb={2} width="100%">
          <Typography data-testid="count" variant="h5">
            {t("totalUsers", { count })}
          </Typography>
          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            justifyContent="flex-end"
            spacing={2}
            useFlexGap
          >
            <Box>
              <FilterButton
                disabled={isUsersLoading || usersError}
                filterGroups={filters}
                getSelected={setSelectedFilters}
              />
            </Box>
            <Box width={496}>
              <SearchBar
                disabled={isUsersLoading || usersError}
                searchOverFields={["name", "id", "oid"]}
                setRows={setSearchRows}
                tableRows={users}
                variant="filled"
              />
            </Box>
            <Box>
              <Button
                data-testid="add"
                disabled={isUsersLoading || usersError}
                onClick={handleAddOperator}
                size="large"
                variant="contained"
              >
                <Typography variant="subtitle">{t("add")}</Typography>
              </Button>
            </Box>
          </Stack>
        </Box>
        <DataTable
          columns={operatorColumns}
          data={filteredRows}
          data-testid="users-table"
          empty={!users?.length}
          error={usersError}
          isLoading={isUsersLoading}
          translationKey="usersTable"
        />
      </Paper>
    </div>
  );
};

export default Operators;
