import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { format } from "date-fns";
import { useAvailableCourtsQuery, useGetCustomerReservationsQuery } from "domain/service/apiSlices/bookingApiSlice";
import { useParams } from "react-router-dom";
import { useCustomerDashboardTranslation } from "translations";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const t = useCustomerDashboardTranslation();

  const { customerId } = useParams();

  // Obtener datos de disponibilidad de pistas
  const { data: availableCourts = [], isLoading: loadingCourts } = useAvailableCourtsQuery({
    customer_id: customerId,
    date: currentTime.toISOString(), // Pasamos la hora actual
  });

  // Obtener reservas totales
  const { data: reservations = [], isLoading: loadingReservations } = useGetCustomerReservationsQuery({
    customer_id: customerId,
  });

  // Actualizar la hora actual automáticamente cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 1 minuto

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  if (loadingCourts || loadingReservations) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Calcular el estado de las pistas
  const pistasOcupadas = availableCourts.filter((pista) => !pista.available).length;
  const pistasDisponibles = availableCourts.filter((pista) => pista.available).length;

  const now = new Date();
  const limit = new Date(now.getTime() - 90 * 60 * 1000); // ahora - 1h30
  const reservasFuturas = reservations.filter(res =>
    new Date(res.reservation_time) >= limit
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        {t("dashboardTitle")}
      </Typography>

      <Typography variant="h6" sx={{ color: "gray", mb: 4 }}>
        {t("currentStatus", {time: format(currentTime, "HH:mm:ss"), date: format(currentTime, "dd/MM/yyyy")})}
      </Typography>

      {/* Resumen General */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 3, textAlign: "center" }}>
            <Typography variant="h6">{t("occupiedCourts")}</Typography>
            <Typography variant="h4">{pistasOcupadas}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 3, textAlign: "center" }}>
            <Typography variant="h6">{t("availableCourts")}</Typography>
            <Typography variant="h4">{pistasDisponibles}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 3, textAlign: "center" }}>
            <Typography variant="h6">{t("totalReservations")}</Typography>
            <Typography variant="h4">{reservasFuturas.length}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Estado de las Pistas */}
      <Typography variant="h5" sx={{ mb: 2 }}>
        {t("courtsStatusTitle")}
      </Typography>
      <Grid container spacing={2}>
        {availableCourts.map((pista) => (
          <Grid item xs={12} md={3} key={pista.court_id}>
            <Paper
              sx={{
                padding: 2,
                textAlign: "center",
                backgroundColor: pista.available
                  ? "rgba(76, 175, 80, 0.2)"
                  : "rgba(244, 67, 54, 0.2)",
                borderColor: pista.available ? "green" : "red",
              }}
              variant="outlined"
            >
              <Typography variant="h6">{pista.court_name}</Typography>
              <Typography variant="body2">
                {pista.available ? t("available") : t("occupied")}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
