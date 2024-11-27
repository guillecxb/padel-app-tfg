import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Paper, Typography, IconButton, CircularProgress, Button, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Delete as DeleteIcon } from '@mui/icons-material'; 
import { useGetUserReservationsQuery, useDeleteReservationMutation } from "domain/service/apiSlices/bookingApiSlice";
import { getMe } from "domain/accounts/slices/authSlice";
import { useNavigate } from "react-router-dom"; 
import { ROUTES } from "modules/app/router"; 
import { format } from "date-fns";
import SectionTitle from "components/molecules/section-title/SectionTitle";
import ReactAnimatedWeather from 'react-animated-weather';
import { useMembersAreaTranslation } from "translations";


const MembersAreaPage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const POLLING_INTERVAL = 10000;

  const t = useMembersAreaTranslation();

  const { id: userId } = useSelector(getMe);
  const { data: reservations = [], isLoading, error, refetch } = useGetUserReservationsQuery(
    { user_id: userId }, 
    { pollingInterval: POLLING_INTERVAL }
  );

  const [deleteReservation, { isLoading: isDeleting }] = useDeleteReservationMutation();
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Refetch reservations when the "Reservations" tab becomes active
  useEffect(() => {
    if (activeTab === 1) {
      refetch();
    }
  }, [activeTab, refetch]);

  const handleDeleteDialogOpen = (reservation) => {
    setReservationToDelete(reservation);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setReservationToDelete(null);
  };

  const confirmDelete = async () => {
    if (reservationToDelete) {
      try {
        await deleteReservation(reservationToDelete.id).unwrap();
      } catch (error) {
        console.error('Error al eliminar la reserva:', error);
      } finally {
        handleDeleteDialogClose();
      }
    }
  };

  const handleCreateReservation = () => {
    navigate(ROUTES.booking);
  };

  const getClubName = (customerId) => {
    switch (customerId) {
      case 1:
        return "Valladolid";
      case 2:
        return "Palencia";
      case 3:
        return "Madrid";
      default:
        return "Unknown Club";
    }
  };

  const getWeatherIcon = (conditionText) => {
    if (conditionText.includes("Sunny")) return { icon: 'CLEAR_DAY', color: 'yellow' };
    if (conditionText.includes("Cloudy")) return { icon: 'CLOUDY', color: 'gray' };
    if (conditionText.includes("Rain")) return { icon: 'RAIN', color: 'blue' };
    if (conditionText.includes("Snow")) return { icon: 'SNOW', color: 'lightblue' };
    return { icon: 'CLEAR_DAY', color: 'yellow' }; 
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle data-testid="section-title" title={"Members Area"} />

      <Tabs value={activeTab} onChange={handleChange} aria-label="members area tabs">
        <Tab label={t("profile")} />
        <Tab label={t("reservations")} />
        <Tab label={t("bookAClass")} />
      </Tabs>

      {activeTab === 0 && (
        <Box sx={{ padding: 4 }}>
          <SectionTitle title="My Profile" />
          {/* Aquí iría la lógica del perfil */}
        </Box>
      )}

      {activeTab === 1 && (
        <Box sx={{ padding: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <SectionTitle title="My Reservations" />
            <Button variant="contained" color="primary" onClick={handleCreateReservation}>
              {t("createReservation")}
            </Button>
          </Box>

          {isLoading && <Typography>{t("loadingReservations")}</Typography>}
          {error && <Typography>{t("errorLoadingReservations")}</Typography>}

          {!isLoading && reservations.length === 0 && (
            <Typography>{t("noReservations")}</Typography>
          )}

          {reservations.length > 0 && (
            <Box sx={{ marginTop: 4 }}>
              <Grid container spacing={2}>
                {reservations.map((reservation) => (
                  <Grid item xs={12} md={6} key={reservation.id}>
                    <Paper sx={{ padding: 2, backgroundColor: "#f5f5f5", position: "relative" }}>
                      <Typography variant="h6">{t("club")} {getClubName(reservation.customer_id)}</Typography>
                      <Typography variant="body1">{t("court")} {reservation.court_id}</Typography>
                      <Typography variant="body2">
                      {t("dateAndTime")}{format(new Date(reservation.reservation_time), "dd/MM/yyyy HH:mm")}
                      </Typography>

                      {/* Mostrar el clima si está disponible */}
                      {reservation.weather ? (
                        <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                          <ReactAnimatedWeather
                            icon={getWeatherIcon(reservation.weather.condition_text).icon}
                            color={getWeatherIcon(reservation.weather.condition_text).color}
                            size={50}
                            animate={true}
                          />
                          <Box sx={{ marginLeft: 1 }}>
                            <Typography variant="body2">
                              {reservation.weather.condition_text}
                            </Typography>
                            <Typography variant="body2">
                            {t("temperature")}{reservation.weather.temp_c}°C, {t("wind")}{reservation.weather.wind_kph} km/h, {t("humidity")}{reservation.weather.humidity}%
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 4 }}>
                         {t("temperatureUnavailable")}
                        </Typography>
                      )}

                      {/* Botón de eliminar reserva */}
                      <IconButton
                        onClick={() => handleDeleteDialogOpen(reservation)}
                        sx={{ position: "absolute", top: 8, right: 8 }}
                        color="error"
                        disabled={isDeleting}
                      >
                        {isDeleting ? <CircularProgress size={24} /> : <DeleteIcon />}
                      </IconButton>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
      )}

      {activeTab === 2 && (
        <Box sx={{ padding: 4 }}>
          <SectionTitle title="Available Classes" />
          {/* Aquí puedes añadir el contenido para mostrar las clases */}
        </Box>
      )}

      {/* Diálogo de confirmación de eliminación */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>{t("confirmDelete")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("confirmDeletion1")} {getClubName(reservationToDelete?.customer_id)} {t("confirmDeletion2")} {reservationToDelete?.court_id} {t("confirmDeletion3")} {reservationToDelete && format(new Date(reservationToDelete.reservation_time), "dd/MM/yyyy HH:mm")}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="secondary">{t("cancel")}</Button>
          <Button onClick={confirmDelete} color="primary" disabled={isDeleting}>
            {isDeleting ? <CircularProgress size={24} /> : t("delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MembersAreaPage;
