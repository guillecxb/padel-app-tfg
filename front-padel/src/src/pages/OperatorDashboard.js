import { useState, useEffect, useMemo, useCallback } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button, Stack, Typography } from "@mui/material";

import { useCustomersQuery } from "domain/accounts/apiSlices/customersApiSlice";
import { useUsersQuery } from "domain/accounts/apiSlices/usersApiSlice";
import { getMe } from "domain/accounts/slices/authSlice";

import { SearchBar } from "modules/common/inputs/SearchBar";
import ClubCard from "modules/OperatorDashboard/ClubCard";
import CardsTable from "modules/common/tables/CardsTable";
import { ROUTES } from "modules/app/router";

import SectionTitle from "components/molecules/section-title/SectionTitle";

import { useOperatorDashboardTranslation } from "translations";

const OperatorDashboard = () => {
  const t = useOperatorDashboardTranslation();
  const navigate = useNavigate();

  // useSelector es un hook de react-redux que se utiliza para seleccionar datos del store de Redux. En este caso, se selecciona el usuario actual.
  const { obId } = useSelector(getMe); // accede a todo el estado de autenticación y extrae el obId

  const [filteredRows, setFilteredRows] = useState([]);
  const [searchRows, setSearchRows] = useState();

  // petición para obtener todo los CUSTOMERS
  const {
    data: { count: customersCount = "-", results: customers } = {}, // desestructura la respuesta obttendiendo "count" (lo guarda en customersCount, que por defecto es "-") y "results" (lo guarda en customers)
    isLoading: isCustomersLoading, // isLoading que lo guarda en isCustomersLoading
    error: customerError,
  } = useCustomersQuery({ params: { obId } }); // petición los datos del cliente con el obId

  const {
    data: { results: users } = {},
    error: usersError,
    isLoading: isUsersLoading,
  } = useUsersQuery({
    params: { ob_id: obId },
  });

  // useMemo -> memorizar datos. Use memo solo se hará otra vez si cambian las dependencias definidas en el array final.
  const formattedCustomers = useMemo(() => {
    // Calcula el número de usuarios asociados con un cliente basado en el id
    const usersCountById = (id) =>
      usersError || isUsersLoading
        ? "-"
        : users?.filter(({ customer_id }) => id === customer_id).length;

    // Mapea la lista de CUSTOMERS añadiendo valores adicionales a cada cliente.
    const formatedCustomers = customers?.map((customer) => ({
      ...customer,
      usersCount: usersCountById(customer.id),
    }));
    setSearchRows(formatedCustomers);
    return formatedCustomers;
  }, [customers, isUsersLoading, setSearchRows, users, usersError]);

  // filtra CUSTOMERS en función de sus alertas o status
  useEffect(() => {
    setFilteredRows(searchRows);
  }, [searchRows]);

  const handleNavigate = useCallback(
    (event) => {
      const { customerid } = event.currentTarget.dataset; // saca el customerid del dataset del elemento que disparó el evento
      navigate(ROUTES.asCustomerHome.replace(":customerId", customerid)); // utiliza el hook navigate para navegar a la ruta asCustomerHome con el customerid -> /customer/:customerId
    },
    [navigate]
  );

  // botón para añadir un nuevo cliente
  const handleAddCustomer = useCallback(() => {
    navigate(ROUTES.operatorCustomerAdd);
  }, [navigate]);

  return (
    <>
      <SectionTitle title={t("headerTitle")} />

      {/* Stack es un componente de MUI para apilar vertical y horizontalmente elementos. El atributo data-testid es un atributo que se utiliza para identificar un elemento en las pruebas unitarias. */}
      <Stack data-testid="operator-dashboard-page" spacing={3}>
        <Box alignItems="center" display="flex" justifyContent="space-between" mb={2} width="100%">
          <Typography color="text.primary" data-testid="customers-count" variant="h5">
            {t("totalCustomers", { count: customersCount })}
          </Typography>

          {/* 3 botones */}
          <Box alignItems="center" display="flex" gap={2}>
            {/* Filtrado por nombre */}
            <Box sx={{ width: "400px" }}>
              <SearchBar
                disabled={isCustomersLoading || !!customerError}
                label={t("searchLabel")}
                searchOverFields={["name", "status"]}
                setRows={setSearchRows}
                tableRows={formattedCustomers}
                variant="filled"
              />
            </Box>
            {/* Botón Add customer */}
            {/* <Button
              color="primary"
              data-testid="customer-add"
              onClick={handleAddCustomer}
              size="large"
              variant="contained"
            >
              <Typography color="primaryInverse" variant="subtitle">
                {t("add")}
              </Typography>
            </Button> */}
          </Box>
        </Box>

        {/* CardsTable es un componente que muestra una tabla de tarjetas. */}
        <CardsTable
          data-testid="customers-table"
          empty={!customers?.length}
          error={customerError}
          isLoading={isCustomersLoading}
          translationKey="customersTable"
        >
          {filteredRows?.map((customer) => (
            <ClubCard
              key={`customer-card-${customer.id}`}
              {...customer}
              onClick={handleNavigate}
            />
          ))}
        </CardsTable>
      </Stack>
    </>
  );
};

export default OperatorDashboard;
