import React, { useState } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, CircularProgress, Pagination, TextField, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useGetPadelNewsQuery } from 'domain/accounts/apiSlices/publicApiSlice.js';
import dayjs from 'dayjs';
import { useNewsTranslation } from "translations";

const PadelNews = () => {
  const [page, setPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(dayjs().subtract(7, 'day')); // Fecha por defecto (hace 7 días)
  const [sortOrder, setSortOrder] = useState('newest'); // Orden por defecto (más nuevas)
  const [openWarning, setOpenWarning] = useState(false); // Estado para el Snackbar del warning
  const itemsPerPage = 9; // Noticias por página

  const maxDate = dayjs().subtract(1, 'month');
  const formattedDate = selectedDate.format('YYYY-MM-DD');

  const t = useNewsTranslation();

  const { data, error, isLoading } = useGetPadelNewsQuery({
    q: 'premier padel',
    from: formattedDate,
    sortBy: 'popularity',
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography>Error al cargar las noticias</Typography>;

  const sortedArticles = [...(data?.articles || [])].sort((a, b) => {
    const dateA = dayjs(a.publishedAt);
    const dateB = dayjs(b.publishedAt);

    return sortOrder === 'newest' ? dateB.diff(dateA) : dateA.diff(dateB);
  });

  const totalPages = Math.ceil(sortedArticles.length / itemsPerPage);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDateChange = (newDate) => {
    if (newDate.isBefore(maxDate)) {
      setOpenWarning(true); 
    } else {
      setSelectedDate(newDate);
      setPage(1);
    }
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = sortedArticles.slice(startIndex, endIndex);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        {/* Título de la página */}
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          {t("title")}
        </Typography>

        {/* Grid para separar el selector de fechas y el selector de orden */}
        <Grid container justifyContent="space-between" alignItems="center" style={{ marginBottom: '20px' }}>
          {/* Selector de fecha a la izquierda */}
          <Grid item style={{ maxWidth: '250px' }}>
            <DatePicker
              label={t("selectDate")}
              value={selectedDate}
              onChange={handleDateChange}
              inputFormat="DD/MM/YYYY" 
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          {/* Selector de orden a la derecha */}
          <Grid item style={{ maxWidth: '400px', textAlign: 'right' }}>
            <FormControl fullWidth>
              <Select
                labelId="sort-order-label"
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setPage(1);
                }}
                style={{ minWidth: '150px' }} // Ajustar el ancho del selector
              >
                <MenuItem value="newest">{t("newerNews")}</MenuItem>
                <MenuItem value="oldest">{t("olderNews")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Grid para mostrar las noticias */}
        <Grid container spacing={3} style={{ padding: '20px' }}>
          {currentArticles?.map((article, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="150"
                  image={article.urlToImage || 'https://via.placeholder.com/150'}
                  alt={article.title}
                />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {article.description}
                  </Typography>
                  <Button size="small" color="primary" href={article.url} target="_blank" rel="noopener noreferrer">
                    {t("readMore")}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Componente de paginación */}
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
        />

        {/* Snackbar para mostrar el aviso de funcionalidad de pago */}
        <Snackbar
          open={openWarning}
          autoHideDuration={6000}
          onClose={() => setOpenWarning(false)}
        >
          <Alert onClose={() => setOpenWarning(false)} severity="warning" sx={{ width: '100%' }}>
            Esta funcionalidad de ver noticias de más de un mes es de pago.
          </Alert>
        </Snackbar>
      </div>
    </LocalizationProvider>
  );
};

export default PadelNews;
