import { useState } from "react";
import { Box, Button, Grid, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAvailableCourtsQuery, useCreateReservationMutation } from "domain/service/apiSlices/bookingApiSlice";
import { useSelector } from "react-redux";
import { getMe } from "domain/accounts/slices/authSlice";
import { format } from 'date-fns';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCustomersQuery } from "domain/accounts/apiSlices/customersApiSlice";
import { ROUTES } from 'modules/app/router';
import { Collapse, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const { role, id: userId } = useSelector(getMe);
  const [customerId, setCustomerId] = useState(location.state?.customerId || null);
  const [clubLocation, setClubLocation] = useState(location.state?.customerLocation || '');

  const [createReservation] = useCreateReservationMutation();
  const { data: customersData, isLoading: loadingClubs } = useCustomersQuery();

  const [expandedCourts, setExpandedCourts] = useState({});

  // Configuración de fechas y horas
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 2);

  const timeSlots = [];
  for (let hour = 9; hour <= 22.5; hour += 1.5) {
    const startHour = Math.floor(hour);
    const startMinutes = (hour % 1) === 0.5 ? 30 : 0;
    timeSlots.push(new Date(0, 0, 0, startHour, startMinutes));
  }

  const selectedDateTime = selectedDate && selectedSlot
    ? `${format(new Date(selectedDate), 'yyyy-MM-dd')}T${format(selectedSlot, 'HH:mm:ss')}`
    : null;

  const { data: courts = [] } = useAvailableCourtsQuery(
    { customer_id: customerId, date: selectedDateTime },
    { skip: !selectedDateTime || !customerId }
  );

  const handleCourtSelect = (courtId) => {
    if (courts.find((court) => court.court_id === courtId).available) {
      setSelectedCourt(courtId);
    }
  };

  const handleBooking = () => {
    setOpenDialog(true);
  };

  const handleConfirmReservation = async () => {
    setLoading(true);
    try {
      await createReservation({
        user_id: userId,
        court_id: selectedCourt,
        reservation_time: selectedDateTime,
        customer_id: parseInt(customerId)
      }).unwrap();
      setLoading(false);
      setOpenDialog(false);
      setSuccessDialogOpen(true);
    } catch (error) {
      setLoading(false);
      console.error("Error al crear la reserva:", error);
    }
  };
  

  const handleNewReservation = () => {
    setSuccessDialogOpen(false);
    setSelectedDate(null);
    setSelectedSlot(null);
    setSelectedCourt(null);
  };

  const goToReservations = () => {
    navigate(ROUTES.membersArea);
  };

  const handleClubSelection = (e) => {
    const selectedId = e.target.value;
    const selectedClub = customersData?.results.find(club => club.id === parseInt(selectedId));
    setCustomerId(selectedId);
    setClubLocation(selectedClub ? selectedClub.location : '');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: '16px' }}>
        <Typography variant="h5" sx={{ textAlign: 'center', marginBottom: 4 }}>
          {customerId ? `Reserva para: ${clubLocation}` : "Seleccione un club para reservar"}
        </Typography>

        {!customerId && !loadingClubs && (
          <TextField
            select
            label="Seleccione un club" // Usa solo el label
            value={customerId || ''}
            onChange={handleClubSelection}
            SelectProps={{
              native: true,
            }}
            fullWidth
          >
            <option value="" disabled hidden></option> {/* Opción vacía sin texto */}
            {customersData?.results.map((club) => (
              <option key={club.id} value={club.id}>
                {club.location}
              </option>
            ))}
          </TextField>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
          <DatePicker
            label="Fecha de reserva"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
            minDate={today}
            maxDate={maxDate}
          />
        </Box>

        {selectedDate && (
          <>
            <Typography variant="h6" sx={{ marginTop: 4, textAlign: 'center' }}>Seleccione una hora</Typography>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              {timeSlots.map((slot, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Button
                    variant={selectedSlot === slot ? "contained" : "outlined"}
                    onClick={() => setSelectedSlot(slot)}
                  >
                    {format(slot, 'HH:mm')} - {format(new Date(slot.getTime() + 90 * 60000), 'HH:mm')}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {selectedSlot && courts.length > 0 && (
          <>
            <Typography variant="h6" sx={{ marginTop: 4, textAlign: 'center' }}>Seleccione una pista</Typography>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              {courts.map((court) => (
                <Grid item xs={6} md={3} key={court.court_id}>
                  <Box
                    sx={{
                      padding: 2,
                      border: '2px solid',
                      borderColor: court.available ? 'primary.main' : 'grey.400',
                      backgroundColor: court.available ? selectedCourt === court.court_id ? 'primary.light' : 'white' : 'grey.200',
                      color: court.available ? 'text.primary' : 'grey.600',
                      textAlign: 'center',
                      borderRadius: 1,
                      cursor: court.available ? 'pointer' : 'not-allowed',
                      pointerEvents: court.available ? 'auto' : 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                    }}
                    onClick={() => handleCourtSelect(court.court_id)}
                  >
                    <Typography variant="h6">{court.court_name}</Typography>
                    <Typography variant="body2">{court.available ? 'Disponible' : 'Ocupada'}</Typography>

                    {court.review_count > 0 ? (
                      <>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          ⭐ {court.average_rating.toFixed(1)} / 5
                        </Typography>

                        {court.reviews.slice(0, expandedCourts[court.court_id] ? 5 : 1).map((review, idx) => (
                          <Typography
                            key={idx}
                            variant="caption"
                            sx={{ fontStyle: "italic", display: "block", mt: 1 }}
                          >
                            "{review.comment}"
                          </Typography>
                        ))}

                        {/* Mostrar más / menos */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mt: 1,
                          }}
                        >
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ cursor: "pointer", fontSize: "0.75rem" }}
                            onClick={() =>
                              setExpandedCourts((prev) => ({
                                ...prev,
                                [court.court_id]: !prev[court.court_id],
                              }))
                            }
                          >
                            {expandedCourts[court.court_id] ? "Mostrar menos" : "Mostrar más"}
                          </Typography>

                          <IconButton
                            size="small"
                            onClick={() =>
                              setExpandedCourts((prev) => ({
                                ...prev,
                                [court.court_id]: !prev[court.court_id],
                              }))
                            }
                          >
                            {expandedCourts[court.court_id] ? <ExpandLess /> : <ExpandMore />}
                          </IconButton>
                        </Box>
                      </>
                    ) : (
                      <Typography variant="caption" sx={{ mt: 1, color: "text.secondary" }}>
                        Aún no hay comentarios disponibles
                      </Typography>
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {selectedCourt && (
          <Box sx={{ marginTop: 4, textAlign: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleBooking}>
              Reservar Pista {selectedCourt}
            </Button>
          </Box>
        )}

        {/* Diálogos de confirmación y éxito */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirmar Reserva</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¿Estás seguro de reservar la pista {selectedCourt} para el {format(new Date(selectedDateTime), 'dd/MM/yyyy HH:mm')}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="secondary">Cancelar</Button>
            <Button onClick={handleConfirmReservation} color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Reservar'}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={successDialogOpen} onClose={goToReservations}>
          <DialogTitle>Reserva exitosa</DialogTitle>
          <DialogContent>
            <DialogContentText>
              ¡Reserva confirmada para la pista {selectedCourt} el {format(new Date(selectedDateTime), 'dd/MM/yyyy HH:mm')}!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewReservation} color="primary">Reservar otra pista</Button>
            <Button onClick={goToReservations} color="secondary">Ir a mis reservas</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default Booking;
