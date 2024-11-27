import { useState, useEffect, useMemo, useCallback } from "react";

import { useSelector } from "react-redux";
import { generatePath, useNavigate } from "react-router-dom";

import { Box, Button, Paper, Typography, Stack } from "@mui/material";

import { useUsersQuery } from "domain/accounts/apiSlices/usersApiSlice";
import { getMe } from "domain/accounts/slices/authSlice";
import { getCustomerId } from "domain/accounts/slices/customerIdSlice";
import { ROLES } from "domain/accounts/roles";

import {
  renderActionsCell,
  renderCopyCell,
  renderReservationCountCell,
} from "modules/common/tables/cells";
import DataTable from "modules/common/tables/DataTable";
import { dateFilters, FILTER_NAMES, OP_US_FILTERS } from "modules/common/tables/filters/constants";
import { SearchBar } from "modules/common/inputs/SearchBar";
import { CREDENTIALS } from "modules/enumerations";
import useFilters from "modules/common/tables/hooks/useFilters";
import { ROUTES } from "modules/app/router";
import UserDeleteModal from "modules/UserManagement/UserDeleteModal";

import SectionTitle from "components/molecules/section-title/SectionTitle";

import { useHelpCustomerUsersTranslation, useUsersTranslation } from "translations";
import { CustomTrans } from "translations/CustomTrans";

import { HelpDrawerCreator } from "../modules/common/help-drawer-creator";
import { HelpDrawerLabel } from "../components/organisms/help-drawer-label";

const Users = () => {
  const navigate = useNavigate();
  const t = useUsersTranslation();
  const filters = useFilters(OP_US_FILTERS);

  const { role, id: userId } = useSelector(getMe);
  // const customerId = useSelector(getCustomerId);
  const customerId = 1;
  const [searchRows, setSearchRows] = useState();

  const {
    data: { count = "-", results: users } = {},
    isLoading: isUsersLoading,
    error: usersError,
  } = useUsersQuery({ params: { customer_id: customerId } });

  const customerData = [];
  const isCustomerLoading = false;

  const hasLoginPassCredentials = useMemo(() => {
    return !isCustomerLoading && customerData?.credentials_type === CREDENTIALS.USER_PASS;
  }, [isCustomerLoading, customerData?.credentials_type]);

  const [deleteId, setDeleteId] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState({ lastCon: [] });
  const [filteredRows, setFilteredRows] = useState([]);

  const data = {};

  const { name = "" } = data;
  
  const handleAdd = useCallback(() => {
    // const addRoute = role === ROLES.OPERATOR ? ROUTES.asCustomerUserAdd : ROUTES.usersAdd;
    // const path = generatePath(addRoute, { customerId });
    // console.log("Route:", addRoute, "Path:", path);
    const path = ROUTES.usersAdd;
    navigate(path);
}, [ navigate ]);

  const handleEdit = useCallback(
    (userId) => {
      const path = generatePath(ROUTES.usersEdit, { userId });
      navigate(path);
    },
    [customerId, navigate, role]
  );
  

  const handleView = useCallback(
    (userId) => {
      const viewRoute = role === ROLES.OPERATOR ? ROUTES.asCustomerUserView : ROUTES.usersView;
      const path = generatePath(viewRoute, { customerId, userId });
      navigate(path);
    },
    [customerId, navigate, role]
  );

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const operatorColumns = useMemo(
    () => [
      {
        name: "id",
        label: t("table.id"),
        options: {
          customBodyRender: (value, params) => {
            const renderId =
              userId === value ? (
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
          customBodyRender: renderCopyCell,
        },
      },
      {
        name: "active_reservations",
        label: t("table.activeReservations"),
        options: {
          customBodyRender: renderReservationCountCell,
        },
      },
      {
        name: "actions",
        label: " ",
        options: {
          customBodyRender: (_value, { rowData }) => {
            const isLinked = (status) => status === "LINKED";
            const optional =
              hasLoginPassCredentials || !isLinked(rowData?.[4]) ? { handleEdit } : { handleView };
            return renderActionsCell({ id: rowData[0], handleDelete, ...optional });
          },
          filter: false,
          sort: false,
          hideLabel: true,
        },
      },
    ],
    [handleEdit, handleView, hasLoginPassCredentials, t, userId]
  );

  useEffect(() => {
    setSearchRows(users);
  }, [setSearchRows, users]);

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
    <div data-testid="users-dashboard-page">
      <SectionTitle title={t("headerTitleName", { name })} /> {/* Users list */}
      <Paper sx={{ p: 6 }}>
        <Box alignItems="center" display="flex" justifyContent="space-between" mb={2} width="100%">
          {/* Total users: 5 */}
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
                onClick={handleAdd}
                size="large"
                variant="contained"
              >
                <Typography variant="subtitle">{t("add")}</Typography>
              </Button>
            </Box>
          </Stack>
        </Box>
        {/* Users table */}
        <DataTable
          columns={operatorColumns} // nombre de las columnas
          data={filteredRows}
          data-testid="users-table"
          empty={!users?.length}
          error={usersError}
          isLoading={isUsersLoading}
          translationKey="usersTable"
        />
      </Paper>
      <UserDeleteModal isOpen={!!deleteId} userId={deleteId} />
      <HelpDrawerLabel
        drawer={<HelpDrawerCreator useHelpTranslation={useHelpCustomerUsersTranslation} />}
      />
    </div>
  );
};

export default Users;
