import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCustomerReservationsQuery, useDeleteReservationMutation } from "domain/service/apiSlices/bookingApiSlice";
import DataTable from "modules/common/tables/DataTable";
import { SearchBar } from "modules/common/inputs/SearchBar";
import SectionTitle from "components/molecules/section-title/SectionTitle";
import { format } from "date-fns";
import { renderActionsCell, renderCopyCell } from "modules/common/tables/cells";
import { ROUTES } from 'modules/app/router';

const Booking = () => {
  const { customerId } = useParams();
  const customer_id = parseInt(customerId);
  const { data: reservations = [], isLoading, error } = useGetCustomerReservationsQuery({
    customer_id,
  });
  const navigate = useNavigate();

  const [deleteReservation] = useDeleteReservationMutation();
  const [searchRows, setSearchRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  // Actualiza las filas cuando cambian las reservas
  useEffect(() => {
    setSearchRows(reservations);
  }, [reservations]);

  // Filtros básicos
  useEffect(() => {
    setFilteredRows(searchRows);
  }, [searchRows]);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setDeleteId(null);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      await deleteReservation(deleteId).unwrap();
      console.log(`Reserva con ID ${deleteId} eliminada.`);
    } catch (error) {
      console.error("Error al eliminar la reserva:", error);
    } finally {
      setIsDeleting(false);
      setOpenDialog(false);
      setDeleteId(null);
    }
  };

  const handleAdd = () => {
    navigate(ROUTES.asCustomerCreateBooking);
  };

  // Define las columnas de la tabla
  const columns = useMemo(
    () => [
      {
        name: "id",
        label: "ID reservation",
        options: {
          customBodyRender: renderCopyCell,
        },
      },
      {
        name: "court_id",
        label: "Court number",
        options: {
          customBodyRender: renderCopyCell,
        },
      },
      {
        name: "reservation_time",
        label: "Date and Time",
        options: {
          customBodyRender: (value) =>
            value ? format(new Date(value), "dd/MM/yyyy HH:mm") : "No especificado",
        },
      },
      {
        name: "customer_id",
        label: "ID client",
        options: {
          customBodyRender: renderCopyCell,
        },
      },
      {
        name: "actions",
        label: "Acciones",
        options: {
          customBodyRender: (_value, { rowData }) =>
            renderActionsCell({
              id: rowData[0],
              handleDelete: handleDeleteClick,
            }),
          filter: false,
          sort: false,
          hideLabel: true,
        },
      },
    ],
    [handleDeleteClick]
  );

  return (
    <div data-testid="reservations-dashboard-page">
      <SectionTitle title="Reservations" />
      <Paper sx={{ p: 6 }}>
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          mb={2}
          width="100%"
        >
          <Typography data-testid="count" variant="h5">
            Total reservations: {error?.status === 404 ? 0 : reservations.length}
          </Typography>
          <Stack
            alignItems="center"
            direction="row"
            flexWrap="wrap"
            justifyContent="flex-end"
            spacing={2}
          >
            <Box width={496}>
              <SearchBar
                disabled={isLoading || error}
                searchOverFields={["id", "court_id"]}
                setRows={setSearchRows}
                tableRows={reservations}
                variant="filled"
              />
            </Box>
            <Box>
              <Button
                data-testid="add"
                disabled={isLoading || error}
                onClick={handleAdd}
                size="large"
                variant="contained"
              >
                Book a Court
              </Button>
            </Box>
          </Stack>
        </Box>
        <DataTable
          columns={columns}
          data={error?.status === 404 ? [] : filteredRows}
          data-testid="reservations-table"
          empty={error?.status === 404 || !reservations.length}
          error={error?.status !== 404 && error}
          isLoading={isLoading}
          translationKey="reservationsTable"
        />
        {error?.status === 404 && !isLoading && (
          <Typography sx={{ textAlign: "center", mt: 2 }}>
            No hay reservas activas.
          </Typography>
        )}
      </Paper>

      {/* Dialogo de confirmación */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete reservation with ID {deleteId}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            disabled={isDeleting}
            startIcon={isDeleting && <CircularProgress size={20} />}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Booking;
