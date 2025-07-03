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
import { FormControlLabel, Checkbox, FormControl } from "@mui/material";
import { InputLabel, Select, MenuItem } from "@mui/material";
import { useCustomerDashboardTranslation } from "translations";

const Booking = () => {
  const { customerId } = useParams();
  const customer_id = parseInt(customerId);
  const { data: reservations = [], isLoading, error } = useGetCustomerReservationsQuery({
    customer_id,
  });
  const navigate = useNavigate();
  const t = useCustomerDashboardTranslation();

  const [deleteReservation] = useDeleteReservationMutation();
  const [searchRows, setSearchRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [showPastReservations, setShowPastReservations] = useState(false);


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
        label: t("idReservation"),
        options: {
          customBodyRender: renderCopyCell,
        },
      },
      {
        name: "court_id",
        label: t("courtNumber"),
        options: {
          customBodyRender: renderCopyCell,
        },
      },
      {
        name: "reservation_time",
        label: t("dateAndTime"),
        options: {
          customBodyRender: (value) =>
            value ? format(new Date(value), "dd/MM/yyyy HH:mm") : "No especificado",
        },
      },
      {
        name: "user_id",
        label: t("idClient"),
        options: {
          customBodyRender: renderCopyCell,
        },
      },
      {
        name: "actions",
        label: t("actions"),
        options: {
          customBodyRender: (_value, tableMeta) => {
            const rawDate = tableMeta.rawRow.reservation_time;
            const isPast = new Date(rawDate) < new Date();
      
            return isPast ? (
              <Typography variant="body2" color="text.disabled">
                {t("pastReservation")}
              </Typography>
            ) : (
              renderActionsCell({
                id: tableMeta.rowData[0],
                handleDelete: handleDeleteClick,
              })
            );
          },
          filter: false,
          sort: false,
          hideLabel: true,
        },
      }
    ],
    [handleDeleteClick]
  );

  const [sortOrder, setSortOrder] = useState("desc"); // "asc" o "desc"

  useEffect(() => {
    const now = new Date();
  
    let filtered = showPastReservations
      ? reservations
      : reservations.filter((res) => new Date(res.reservation_time) >= now);

    // Aplica orden
    filtered = filtered.slice().sort((a, b) => {
      const dateA = new Date(a.reservation_time);
      const dateB = new Date(b.reservation_time);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  
    setSearchRows(filtered);
  }, [reservations, showPastReservations, sortOrder]);


  

  

  return (
    <div data-testid="reservations-dashboard-page">
      <SectionTitle title={t("reservationsTitle")} />
      <Paper sx={{ p: 6 }}>
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          mb={2}
          width="100%"
        >
          <Typography data-testid="count" variant="h5">
            {t("totalReservations")}: {error?.status === 404 ? 0 : reservations.length}
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
                {t("bookACourt")}
              </Button>
            </Box>
          </Stack>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2} flexWrap="wrap" gap={2}>
  <FormControlLabel
    control={
      <Checkbox
        checked={showPastReservations}
        onChange={() => setShowPastReservations(!showPastReservations)}
        color="primary"
      />
    }
    label={t("showPastReservations")}
  />

  <FormControl size="small" sx={{ minWidth: 200 }}>
    <InputLabel id="sort-order-label">{t("sortBy")}</InputLabel>
    <Select
      labelId="sort-order-label"
      id="sort-order"
      value={sortOrder}
      label="Ordenar por"
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <MenuItem value="desc">{t("mostRecentFirst")}</MenuItem>
      <MenuItem value="asc">{t("oldestFirst")}</MenuItem>
    </Select>
  </FormControl>
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
            {t("noActiveReservations")}
          </Typography>
        )}
      </Paper>

      {/* Dialogo de confirmación */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{t("confirmDeletionTitle")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("confirmDeletionText", { id: deleteId })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} disabled={isDeleting}>
            {t("cancel")}
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            disabled={isDeleting}
            startIcon={isDeleting && <CircularProgress size={20} />}
          >
            {isDeleting ? t("deleting") : t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Booking;
