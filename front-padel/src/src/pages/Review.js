import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Box, Button, Rating, TextField, Typography } from '@mui/material';
import { useCreateReviewMutation } from 'domain/service/apiSlices/bookingApiSlice';

export default function ReviewForm() {
  const [searchParams] = useSearchParams();

  const reservationId = searchParams.get("reservation_id");
  const courtId = searchParams.get("court_id");
  const userId = searchParams.get("user_id");
  const courtName = searchParams.get("court_name");
  const clubName = searchParams.get("club_name");

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [createReview] = useCreateReviewMutation();

  const handleSubmit = async () => {
    try {
      await createReview({
        court_id: parseInt(courtId),
        reservation_id: parseInt(reservationId),
        user_id: parseInt(userId),
        rating,
        comment
      });
      alert("¡Gracias por tu reseña!");
    } catch (error) {
      alert("Ocurrió un error al enviar la reseña.");
      console.error(error);
    }
  };

  // 🏷️ Mapeo de club name a ciudad
  const clubCityMap = {
    "Club Padel A": "Valladolid",
    "Club Padel B": "Palencia",
    "Club Padel C": "Madrid"
  };

  const decodedClubName = decodeURIComponent(clubName || "");
  const clubCity = clubCityMap[decodedClubName] || decodedClubName;

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Valora tu experiencia
      </Typography>

      {clubCity && (
        <Typography variant="body1" sx={{ mb: 1 }}>
          Ciudad del Club: <strong>{clubCity}</strong>
        </Typography>
      )}

      {courtName && (
        <Typography variant="body1" sx={{ mb: 3 }}>
          Pista: <strong>{`Pista ${courtName}`}</strong>
        </Typography>
      )}

      <Typography variant="body2" sx={{ mb: 1 }}>Valoración:</Typography>
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
