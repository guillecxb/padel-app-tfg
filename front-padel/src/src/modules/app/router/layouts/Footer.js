import { Box, Typography, useTheme, Button } from "@mui/material";

import { useCustomerDashboardTranslation } from "translations";

const Footer = () => {
  const theme = useTheme();
  const color = "info";
  const t = useCustomerDashboardTranslation();

  return (
    <>
      {/* <Divider sx={{ borderColor: theme.palette[color].main }} /> */}
      <Box
        component="footer"
        sx={{
          width: "100%",
          backgroundColor: theme.palette.background.default,
          textAlign: "center",
          py: 2,
        }}
      >
        <Button
          href="https://www.linkedin.com/in/guillermosanzlopez/"
          rel="noopener noreferrer" // Buena práctica para la seguridad
          sx={{
            color: theme.palette[color].dark,
            textTransform: "none", // Evita que el texto se transforme a mayúsculas
            padding: 0, // Elimina el padding del botón para que parezca texto normal
            "&:hover": {
              backgroundColor: "transparent", // Elimina el color de fondo en hover
              textDecoration: "underline", // Añade subrayado en hover para indicar que es un enlace
            },
          }}
          target="_blank" // Abre el enlace en una nueva pestaña
        >
          <Typography variant="body2">{t("poweredby")}</Typography>
        </Button>
      </Box>
    </>
  );
};

export default Footer;
