import React from 'react';
import { Card, Box, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ClubCard = ({ club, onSelect }) => {
  const getBackgroundImage = (location) => {
    switch (location) {
      case 'Valladolid': return 'url(/help_images/en/customer_dashboard/Valladolid.png)';
      case 'Palencia': return 'url(/help_images/en/customer_dashboard/Palencia.png)';
      case 'Madrid': return 'url(/help_images/en/customer_dashboard/Madrid.png)';
      default: return 'url(/help_images/en/customer_dashboard/default.png)';
    }
  };

  return (
    <Card
      sx={{
        position: 'relative',
        height: '350px',
        backgroundImage: getBackgroundImage(club.location),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 2,
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          transform: 'scale(1.05)',
          transition: 'all 0.3s',
        },
      }}
      onClick={onSelect}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
        }}
      >
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>{club.name}</Typography>
        <Typography variant="subtitle1"><LocationOnIcon fontSize="small" /> {club.location}</Typography>
      </Box>
    </Card>
  );
};

export default ClubCard;
