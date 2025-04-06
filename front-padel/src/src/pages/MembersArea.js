import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Paper, Typography, IconButton, CircularProgress, Button, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import { TextField } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import { Delete as DeleteIcon } from '@mui/icons-material'; 
import { useGetUserReservationsQuery, useDeleteReservationMutation } from "domain/service/apiSlices/bookingApiSlice";
import { getMe } from "domain/accounts/slices/authSlice";
import { useGetMeQuery } from "domain/accounts/apiSlices/usersApiSlice";
import { useNavigate } from "react-router-dom"; 
import { ROUTES } from "modules/app/router"; 
import { format } from "date-fns";
import SectionTitle from "components/molecules/section-title/SectionTitle";
import ReactAnimatedWeather from 'react-animated-weather';
import { useMembersAreaTranslation } from "translations";
import { useUpdateUserByIdMutation } from "domain/accounts/apiSlices/usersApiSlice";
import { BigHead } from '@bigheads/core'
import Lottie from "lottie-react"
import animationData from "./animations/user-profile.json"



const MembersAreaPage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);
  const POLLING_INTERVAL = 10000;
  const [showPastReservations, setShowPastReservations] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [reservationsPerPage, setReservationsPerPage] = useState(8);
  const [localReservations, setLocalReservations] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);


  const t = useMembersAreaTranslation();

  const { id: userId } = useSelector(getMe);
  const { data: reservations = [], isLoading, error, refetch } = useGetUserReservationsQuery(
    { user_id: userId }, 
    { pollingInterval: POLLING_INTERVAL }
  );

  useEffect(() => {
    if (reservations.length > 0) {
      setLocalReservations(reservations);
    }
  }, [reservations]);

  const now = new Date();

  const filteredReservations = (
    (showPastReservations
      ? localReservations
      : localReservations.filter(res => new Date(res.reservation_time) > now)
    ).slice() // <- COPIA antes de ordenar
  ).sort((a, b) => {
    const dateA = new Date(a.reservation_time);
    const dateB = new Date(b.reservation_time);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const totalPages = Math.ceil(filteredReservations.length / reservationsPerPage);
  const paginatedReservations = filteredReservations.slice(
    (currentPage - 1) * reservationsPerPage,
    currentPage * reservationsPerPage
  );
  
  useEffect(() => {
    setCurrentPage(1);
  }, [showPastReservations, sortOrder, reservationsPerPage]);

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
        // ✅ Actualiza el estado local quitando la reserva eliminada
        setLocalReservations(prev =>
          prev.filter(res => res.id !== reservationToDelete.id)
        );
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

  const { data: me, isLoading: isLoadingMe, refetch: refetchMe } = useGetMeQuery();  

  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [updateUserById, { isLoading: isUpdating }] = useUpdateUserByIdMutation();
  const [editSuccess, setEditSuccess] = useState(false);

  useEffect(() => {
    if (me) {
      setFormData({ name: me.name || "", email: me.email || "", password: "" });
    }
  }, [me]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserById({
        userId: me.id,
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined, // opcional
      }).unwrap();
      setEditDialogOpen(false);   // ✅ cerrar diálogo
      refetchMe();                // ✅ refrescar los datos del perfil
      setEditSuccess(true);       // opcional: mensaje de éxito
      setTimeout(() => setEditSuccess(false), 3000);
    } catch (error) {
      console.error("Error actualizando usuario", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionTitle data-testid="section-title" title={"Members Area"} />

      <Tabs value={activeTab} onChange={handleChange} aria-label="members area tabs">
        <Tab label={t("profile")} />
        <Tab label={t("reservations")} />
      </Tabs>

      {activeTab === 0 && (
        <Box sx={{ padding: 4 }}>
          <SectionTitle title="My Profile" />
          {isLoadingMe ? (
            <Typography>Cargando perfil...</Typography>
          ) : me ? (
            <Paper
              elevation={4}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 4,
                borderRadius: 5,
                backgroundColor: "#ffffff",
                maxWidth: 800,
                mx: "auto",
                mt: 4,
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                gap: 4
              }}
            >
              {/* Animación */}
              <Box sx={{ width: 160, height: 160 }}>
                <Lottie animationData={animationData} loop autoplay />
              </Box>

              {/* Info del perfil */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                  Mi perfil
                </Typography>

                <Box sx={{ display: "flex", mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, width: 90 }}>
                    Nombre:
                  </Typography>
                  <Typography variant="body1">{me.name}</Typography>
                </Box>

                <Box sx={{ display: "flex", mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, width: 90 }}>
                    Email:
                  </Typography>
                  <Typography variant="body1">{me.email || "Sin email"}</Typography>
                </Box>

                <Button
                  variant="contained"
                  size="medium"
                  onClick={() => setEditDialogOpen(true)}
                  sx={{
                    textTransform: "none",
                    paddingX: 3,
                    paddingY: 1,
                    fontWeight: "bold",
                    background: "linear-gradient(to right, #00c6ff, #0072ff)",
                    borderRadius: 3
                  }}
                >
                  Editar perfil
                </Button>
              </Box>
            </Paper>
          ) : (
            <Typography>No se pudo cargar el perfil.</Typography>
          )}
        </Box>
      )}



      {activeTab === 1 && (
        <Box sx={{ padding: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <SectionTitle title="My Reservations" />
            <Button variant="contained" color="primary" onClick={handleCreateReservation}>
              {t("createReservation")}
            </Button>
          </Box>

          {/* Ordeen y Checkbox */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 4 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showPastReservations}
                  onChange={() => setShowPastReservations(!showPastReservations)}
                  size="small"
                  color="primary"
                />
              }
              label="Mostrar reservas pasadas"
            />
            <FormControl size="small">
              <InputLabel id="sort-label">Ordenar por</InputLabel>
              <Select
                labelId="sort-label"
                id="sort-select"
                value={sortOrder}
                label="Ordenar por"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <MenuItem value="desc">Más recientes primero</MenuItem>
                <MenuItem value="asc">Más antiguas primero</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {isLoading && <Typography>{t("loadingReservations")}</Typography>}
          {error && <Typography>{t("errorLoadingReservations")}</Typography>}

          {!isLoading && reservations.length === 0 && (
            <Typography>{t("noReservations")}</Typography>
          )}


          {/* Mostrar reservas */}
          {filteredReservations.length > 0 && (
            <Box sx={{ marginTop: 4 }}>
              <Grid container spacing={2}>
              {paginatedReservations.map((reservation) => {
                const isPast = new Date(reservation.reservation_time) < new Date();

                return (
                  <Grid item xs={12} md={6} key={reservation.id}>
                    <Paper
                      sx={{
                        padding: 2,
                        backgroundColor: isPast ? "#e0e0e0" : "#f5f5f5",
                        position: "relative",
                        opacity: isPast ? 0.6 : 1,
                        pointerEvents: isPast ? "none" : "auto",
                      }}
                    >
                      <Typography variant="h6">
                        {t("club")} {getClubName(reservation.customer_id)}
                      </Typography>
                      <Typography variant="body1">
                        {t("court")} {reservation.court_id}
                      </Typography>
                      <Typography variant="body2">
                        {t("dateAndTime")}
                        {format(new Date(reservation.reservation_time), "dd/MM/yyyy HH:mm")}
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
                              {t("temperature")}{reservation.weather.temp_c}°C,{" "}
                              {t("wind")}{reservation.weather.wind_kph} km/h,{" "}
                              {t("humidity")}{reservation.weather.humidity}%
                            </Typography>
                          </Box>
                        </Box>
                      ) : (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ marginTop: 4 }}
                        >
                          {t("temperatureUnavailable")}
                        </Typography>
                      )}

                      {/* Botón de eliminar reserva SOLO si no es pasada */}
                      {!isPast && (
                        <IconButton
                          onClick={() => handleDeleteDialogOpen(reservation)}
                          sx={{ position: "absolute", top: 8, right: 8 }}
                          color="error"
                          disabled={isDeleting}
                        >
                          {isDeleting ? (
                            <CircularProgress size={24} />
                          ) : (
                            <DeleteIcon />
                          )}
                        </IconButton>
                      )}
                    </Paper>
                  </Grid>
                );
              })}

              </Grid>

              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 4, gap: 2 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(e, value) => setCurrentPage(value)}
                  color="primary"
                />

                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel id="rows-per-page-label">Por página</InputLabel>
                  <Select
                    labelId="rows-per-page-label"
                    id="rows-per-page"
                    value={reservationsPerPage}
                    label="Por página"
                    onChange={(e) => setReservationsPerPage(parseInt(e.target.value))}
                  >
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={16}>16</MenuItem>
                    <MenuItem value={32}>32</MenuItem>
                    <MenuItem value={48}>48</MenuItem>
                  </Select>
                </FormControl>
              </Box>

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

      {/* Diálogo de edición de perfil */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="sm" // Puedes usar "md" si quieres aún más ancho
        fullWidth
      >
        <DialogTitle>Editar Perfil</DialogTitle>

        <DialogContent
          sx={{
            px: 4, // más padding horizontal
            py: 2,
          }}
        >
          <Box
            component="form"
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Nueva contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setEditDialogOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={isUpdating}
          >
            {isUpdating ? "Guardando..." : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>

    </div>
    
  );
};

export default MembersAreaPage;
