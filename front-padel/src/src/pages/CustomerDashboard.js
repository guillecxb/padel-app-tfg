import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField, Typography, CircularProgress } from '@mui/material';
import { useCustomersQuery } from "domain/accounts/apiSlices/customersApiSlice";
import { useGetCurrentWeatherMutation } from "domain/service/apiSlices/weatherApiSlice";
import ClubDetails from 'modules/CustomerDashboard/ClubDetails';
import ClubCard from 'modules/CustomerDashboard/ClubCard';
import { useCustomerDashboardTranslation } from "translations";

const Dashboard = () => {
  const [selectedClub, setSelectedClub] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const { data: customersData, isLoading, error } = useCustomersQuery();
  const [getCurrentWeather] = useGetCurrentWeatherMutation();
  const t = useCustomerDashboardTranslation();

  // Función para obtener coordenadas y hacer la solicitud de clima
  const fetchWeatherForClub = async (location) => {
    let coordinates;
    switch (location) {
      case 'Valladolid': coordinates = { latitude: 41.652251, longitude: -4.724532 }; break;
      case 'Palencia': coordinates = { latitude: 42.009685, longitude: -4.528801 }; break;
      case 'Madrid': coordinates = { latitude: 40.416775, longitude: -3.703790 }; break;
      default: return;
    }
    try {
      const response = await getCurrentWeather(coordinates).unwrap();
      setWeatherData(response);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    if (selectedClub) {
      fetchWeatherForClub(selectedClub.location);
    }
  }, [selectedClub]);

  const filteredClubs = customersData?.results.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) || club.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Renderizado de la selección de clubes
  const renderClubSelection = () => (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={3}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{t("title")}</Typography>
        <TextField
          variant="outlined"
          placeholder={t("search")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: "30%" }}
        />
      </Box>
      <Grid container spacing={3}>
        {filteredClubs?.map((club) => (
          <Grid item xs={12} md={4} key={club.id}>
            <ClubCard club={club} onSelect={() => setSelectedClub(club)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  if (isLoading) return <CircularProgress color="primary" />;
  if (error) return <Typography>Error al cargar los clubes.</Typography>;

  return (
    <div>
      {selectedClub ? (
        <ClubDetails club={selectedClub} weatherData={weatherData} onBack={() => setSelectedClub(null)} />
      ) : (
        renderClubSelection()
      )}
    </div>
  );
};

export default Dashboard;
