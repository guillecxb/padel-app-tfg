import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useAvailableCourtsQuery, useCreateReservationMutation } from "domain/service/apiSlices/bookingApiSlice";
import { useUsersQuery } from "domain/accounts/apiSlices/usersApiSlice";
import { useCustomersQuery } from "domain/accounts/apiSlices/customersApiSlice";
import { format } from 'date-fns';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from 'modules/app/router';
import { useCustomerDashboardTranslation } from "translations";

const OperatorBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const t = useCustomerDashboardTranslation();

  const [customerId, setCustomerId] = useState(location.state?.customerId || null);
  const [clubLocation, setClubLocation] = useState(location.state?.customerLocation || '');

  const [createReservation] = useCreateReservationMutation();
  const { data: usersData, isLoading: loadingUsers } = useUsersQuery({ params: { customer_id: customerId } });
  const { data: customersData, isLoading: loadingClubs } = useCustomersQuery();

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
        user_id: selectedUser,
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
          {customerId ? t("bookingFor", { location: clubLocation }) : t("selectClubToBook")}
        </Typography>

        {!customerId && !loadingClubs && (
          <TextField
            select
            label={t("selectClubLabel")}
            value={customerId || ''}
            onChange={handleClubSelection}
            SelectProps={{
              native: true,
            }}
            fullWidth
          >
            <option value="" disabled hidden></option>
            {customersData?.results.map((club) => (
              <option key={club.id} value={club.id}>
                {club.location}
              </option>
            ))}
          </TextField>
        )}

        {customerId && (
          <>
            <TextField
              select
              label={t("selectUserLabel")}
              value={selectedUser || ''}
              onChange={(e) => setSelectedUser(e.target.value)}
              SelectProps={{
                native: true,
              }}
              fullWidth
              sx={{ marginTop: 4 }}
            >
              <option value="" disabled hidden></option>
              {usersData?.results.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name || user.username || `Usuario ${user.id}`}
                </option>
              ))}
            </TextField>
          </>
        )}

        {selectedUser && (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 4 }}>
              <DatePicker
                label={t("bookingDateLabel")}
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => <TextField {...params} />}
                minDate={today}
                maxDate={maxDate}
              />
            </Box>

            {selectedDate && (
              <>
                <Typography variant="h6" sx={{ marginTop: 4, textAlign: 'center' }}>{t("selectTime")}</Typography>
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
                <Typography variant="h6" sx={{ marginTop: 4, textAlign: 'center' }}>{t("selectCourt")}</Typography>
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
                        <Typography variant="body2">{court.available ? t("available") : t("occupied")}</Typography>

                        {court.review_count > 0 ? (
                          <>
                            <Typography variant="body2" sx={{ mt: 1 }}>⭐ {court.average_rating.toFixed(1)} / 5</Typography>
                            <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                              "{court.reviews[court.reviews.length - 1]?.comment}"
                            </Typography>
                          </>
                        ) : (
                          <Typography variant="caption" sx={{ mt: 1, color: 'text.secondary' }}>
                            {t("noReviews")}
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
                  {t("bookCourt", { courtId: selectedCourt })}
                </Button>
              </Box>
            )}
          </>
        )}

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>{t("confirmBookingTitle")}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t("confirmBookingText", {courtId: selectedCourt, date: format(new Date(selectedDateTime), 'dd/MM/yyyy HH:mm')})}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="secondary">{t("cancel")}</Button>
            <Button onClick={handleConfirmReservation} color="primary" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : t("book")}
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={successDialogOpen} onClose={goToReservations}>
          <DialogTitle>{t("bookingSuccessTitle")}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {t("bookingSuccessText", {courtId: selectedCourt, date: format(new Date(selectedDateTime), 'dd/MM/yyyy HH:mm')})}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNewReservation} color="primary">{t("bookAnother")}</Button>
            <Button onClick={goToReservations} color="secondary">{t("goToMyBookings")}</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default OperatorBooking;
