import React from 'react';
import { Box, Button, Typography, Grid, Card, CardContent, CardHeader, Divider } from '@mui/material';
import { WbSunny, Cloud, Opacity, CloudQueue } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { useCustomerDashboardTranslation } from "translations";

const ClubDetails = ({ club, onBack, weatherData }) => {
  const navigate = useNavigate();

  const t = useCustomerDashboardTranslation();

  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <WbSunny style={{ fontSize: 64, color: '#FFD700' }} />;
      case 'partly cloudy': 
      case 'cloudy': return <Cloud style={{ fontSize: 64, color: '#808080' }} />;
      case 'rainy': return <Opacity style={{ fontSize: 64, color: '#1E90FF' }} />;
      default: return <CloudQueue style={{ fontSize: 64, color: '#808080' }} />;
    }
  };

  return (
    <Box sx={{ padding: '16px' }}>
      <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
        <Button variant="outlined" onClick={onBack} sx={{ position: 'absolute', left: '16px' }}>
          &larr; {t("backToClubs")}
        </Button>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2', fontSize: '2rem' }}>
          {club.location} Club
        </Typography>
      </Box>

      <Box
        sx={{
          position: 'relative',
          height: '50vh',
          borderRadius: 2,
          overflow: 'hidden',
          marginBottom: 3,
          backgroundImage: 'url(/help_images/en/customer_dashboard/padel-dashboard-copy2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            variant="contained"
            size="large"
            color="primary"
            sx={{ fontSize: '1.25rem' }}
            onClick={() => navigate('/booking', { state: { customerId: club.id, customerName: club.name, customerLocation: club.location } })}
          >
            {t("booAkACourt")}
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title={t("currentClimate")} sx={{ textAlign: 'center' }} />
            <Divider />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {weatherData ? (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getWeatherIcon(weatherData.condition_text)}
                    <Typography variant="h3" sx={{ fontWeight: 'bold', marginLeft: 2 }}>
                      {weatherData.temp_c}°C
                    </Typography>
                  </Box>
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1 }}>
                    {weatherData.condition_text}
                  </Typography>
                  <Divider sx={{ width: '100%', mb: 2 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', px: 2 }}>
                    <Typography variant="body1">
                      <strong>{t("wind")}</strong> {weatherData.wind_kph} km/h
                    </Typography>
                    <Typography variant="body1">
                      <strong>{t("humidity")}</strong> {weatherData.humidity}%
                    </Typography>
                  </Box>
                </>
              ) : (
                <Typography variant="body2">{t("loadingClimate")}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClubDetails;
