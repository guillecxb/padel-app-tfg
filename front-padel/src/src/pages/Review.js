import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import {
  Box,
  Button,
  Rating,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useCreateReviewMutation, useGetUserReservationsQuery } from 'domain/service/apiSlices/bookingApiSlice';
import { useSelector } from 'react-redux';
import { getMe } from 'domain/accounts/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export default function ReviewForm() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { id: userId } = useSelector(getMe);
  const reservationId = searchParams.get("reservation_id");
  const courtId = searchParams.get("court_id");

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [showThanks, setShowThanks] = useState(false);
  const [createReview] = useCreateReviewMutation();

  const { data: reservations = [], isLoading, error } = useGetUserReservationsQuery({ user_id: userId });

  const reservation = reservations.find(res => res.id === parseInt(reservationId));

  const handleSubmit = async () => {
    try {
      await createReview({
        court_id: parseInt(courtId),
        reservation_id: parseInt(reservationId),
        user_id: parseInt(userId),
        rating,
        comment
      });
      setShowThanks(true);
    } catch (error) {
      alert("Ocurrió un error al enviar la reseña.");
      console.error(error);
    }
  };

  if (isLoading || !reservation) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (showThanks) {
    return (
      <Box sx={{ p: 4, maxWidth: 600, mx: "auto", textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          ¡Gracias por tu opinión!
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Tu reseña nos ayuda a mejorar la experiencia para todos.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => navigate("/")}
        >
          Volver al inicio
        </Button>
      </Box>
    );
  }

  // 🏷️ Mapeo de ID de customer a ciudad del club
const customerCityMap = {
  1: "Club Padel A: Valladolid",
  2: "Club Padel B: Palencia",
  3: "Club Padel C: Madrid"
};

const clubCity = customerCityMap[reservation.customer_id] || "Club desconocido";

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Valora tu experiencia
      </Typography>

      <Typography variant="body1" sx={{ mb: 1 }}>
        Club: <strong>{clubCity}</strong>
      </Typography>

      <Typography variant="body1" sx={{ mb: 1 }}>
        Pista: <strong>{`Pista ${reservation.court_id}`}</strong>
      </Typography>

      <Typography variant="body1" sx={{ mb: 1 }}>
        Fecha: <strong>{format(new Date(reservation.reservation_time), "dd/MM/yyyy HH:mm")}</strong>
      </Typography>

      <Typography variant="body2" sx={{ mt: 3, mb: 1 }}>Valoración:</Typography>
      <Rating value={rating} onChange={(e, value) => setRating(value)} />

      <TextField
        label="Comentario"
        fullWidth
        multiline
        rows={4}
        sx={{ mt: 2 }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <Button
        variant="contained"
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        Enviar Reseña
      </Button>
    </Box>
  );
}
