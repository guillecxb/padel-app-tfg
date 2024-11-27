import PropTypes from "prop-types";
import { useMemo, useState } from "react";

// useLocation para obtener la ubicación actual y useNavigate para navegar a una nueva ubicación
import { matchPath, useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Divider,
  Avatar,
  Button,
  IconButton,
  Stack,
  useTheme,
  Select,
  MenuItem,
  ListItemIcon,
} from "@mui/material";

// Para hacer la peticion de logout
import { useSignOutMutation } from "domain/accounts/apiSlices/usersApiSlice";

import ErrorBoundary from "modules/app/error-boundary/ErrorBoundary";
import { LAYOUTS } from "modules/app/router/routerConstants";
import { ContactModal } from "modules/common/modals/ContactModal";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";
import spainFlag from "components/atoms/flags/spaing.png";
import germanyFlag from "components/atoms/flags/germany.png";
import portugalFlag from "components/atoms/flags/portugal.png";
import ukFlag from "components/atoms/flags/uk.png";

import { usePrivateLayoutTranslation, useRolesTranslation } from "translations";
import i18n from "translations/TranslationProvider.js";

import useAvatarInitials from "../hooks/useAvatarInitials";

// COMPONENTE que crea la barra superior. Recibe CHILDREN, ROLE Y NAME como props donde
//        - CHILDREN es el contenido que se renderiza dentro del layout CREO
//        - ROLE rol del usuario (que podría influir en la navegación y las funcionalidades disponibles)
//        - NAME del usuario para su visualización y posiblemente para generar las iniciales del avatar
const PrivateLayout = ({ children, role, name }) => {
  const t = usePrivateLayoutTranslation();
  const theme = useTheme();
  const rt = useRolesTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [signOut] = useSignOutMutation();
  const [contactUsOpen, setContactUs] = useState(false); // estado para mostrar el modal de contacto

  // useMemo para memorizar el layout que corresponde al rol del usuario
  const layout = useMemo(() => {
    return LAYOUTS[role] ?? []; // retorna el layout correspondiente al rol del usuario, si no existe retorna un array vacío.
  }, [role]); // dependencia de role, por lo que solo se volverá a calcular si role cambia

  // hook para obtener las iniciales del nombre del usuario
  const nameInitials = useAvatarInitials({ name });

  // función para manejar el cambio de ruta. Cuando un usuario hace clic en un Tab, se cambia la ruta a la ruta correspondiente.
  const handleChange = (e) => {
    const { route } = e.currentTarget.dataset; // obtiene el valor del atributo data-route de la pestaña en la que se hizo clic
    navigate(route); // navega a la ruta correspondiente
  };

  // función para manejar el logout
  const handleLogOut = async () => {
    await signOut();
    // TODO: this should be by using ROUTES, but it has a circular dep
    navigate("/login");
  };

  // useMemo para obtener el nombre de la ruta actual. Determina cual Tab está activo actualmente.
  const pathName = useMemo(() => {
    const foundPath = layout.findLast((layout) => {
      // busca en el array layout el último elemento cuya ruta (layout.route) coincide con la URL actual (location.pathname).
      return matchPath(`${layout.route}/*`, location.pathname); // matchPath de React Router se utiliza para esta coincidencia, permitiendo flexibilidad en las coincidencias de rutas
    });
    return foundPath?.name || "customers"; // si se encuentra la ruta, se devuelve el nombre de la ruta, de lo contrario se devuelve "customers"
  }, [layout, location.pathname]);

  const [language, setLanguage] = useState("en");

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    // eslint-disable-next-line no-console
    console.log(newLanguage);
    i18n.changeLanguage(newLanguage); // Cambia el idioma de la aplicación
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100%",
        bgcolor: "background.default",
        paddingBottom: 2,
      }}
    >
      <Paper variant="menu">
        {/* STACK -> crea una pila en formato fila. Wrap es para que si no hay espacio pase a la siguiente linea. */}
        <Stack direction="row" flexWrap="wrap" justifyContent="space-between" useFlexGap>
          {/* LOGO */}
          {/* <Box alignItems="center" display="flex" justifyContent="center" pl={8} pr={3}>
            <img src="/images/logo.svg" />
          </Box> */}
          {/* <Box
            alignItems="center"
            display="flex"
            justifyContent="center"
            pl={8}
            pr={3}
            style={{
              padding: "8px",
              borderRadius: "8px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)"
            }}
          >
            <img src="/dalle-padel-transparent-refined.png" style={{ width: "64px", height: "64px", objectFit: "contain" }} />
          </Box> */}
          <Box
            alignItems="center"
            display="flex"
            justifyContent="center"
            pl={2}
            pr={3}
            style={{
              borderRadius: "8px" // Si necesitas mantener bordes redondeados, puedes dejar esto
            }}
          >
            <img src="/images/dalle-padel-transparent-refined.png" style={{ width: "64px", height: "64px", objectFit: "contain" }} />
          </Box>




          {/* SELECCIONABLE de customers o operators */}
          <Box alignItems="end" display="flex" flexGrow={1}>
            <Tabs value={pathName}>
              {" "}
              {/* TABS -> crea una barra de pestañas. Prop value se utiliza para controlar qué Tab está activo actualmente, basado en la coincidencia con el valor pathName que representa la ruta actual de la app. */}
              {layout && // Si hay un layout, se mapea cada elemento del layout para crear una pestaña. Layout es un Array.
                layout.map(
                  (
                    { name, icon, route, isDisabled } // Se mapea cada elemento del layout teniendo en cuenta que cada uno tiene un name, icon, route y isDisabled
                  ) => (
                    <Tab
                      data-route={route} // valor de la ruta
                      data-testid={`mmenu-${name}`} // atributo para identificar el elemento en las pruebas unitarias
                      disabled={isDisabled} // desactiva la pestaña si isDisabled es true
                      icon={
                        <MuisticaIcon
                          color={pathName === name ? "icon" : "text.secondary"}
                          variant="filled"
                        >
                          {icon}
                        </MuisticaIcon>
                      }
                      iconPosition="start" // posición del icono, a la izquierda del texto del Tab
                      key={name} // clave única para el Tab
                      label={
                        // etiqueta del Tab
                        <Typography
                          color={pathName === name ? "text.primary" : "text.secondary"}
                          ml={1}
                          textTransform="none"
                          variant="body2"
                        >
                          {t(`routes.${name}`)} {/* CUSTOMERS ó OPERATORS */}
                        </Typography>
                      }
                      onClick={handleChange} // función para manejar el cambio de ruta al hacer clic en el Tab
                      value={name} // Define el valor del Tab, que se utiliza junto con la prop value del componente Tabs para determinar cuál Tab está activo.
                    />
                  )
                )}
            </Tabs>
          </Box>

          <Box alignItems="center" display="flex" gap={1} justifyContent="space-around" p={2}>
            <Stack direction="row" spacing={3}>
              {/* Botón de Contact us */}
              <Button
                data-testid="contact-us"
                onClick={() => setContactUs(true)}
                startIcon={
                  <MuisticaIcon color="icon" variant="filled">
                    support-agent
                  </MuisticaIcon>
                }
              >
                <Typography color="text.primary" noWrap variant="body3">
                  {t("contactUs")}
                </Typography>
              </Button>
              {/*  Divisor línea vertical */}
              <div>
                <Divider color="gradient" orientation="vertical" />
              </div>
              {/* Selector de Idioma con Banderas */}
              <Select
                onChange={handleChangeLanguage}
                renderValue={(value) => {
                  let flag = ukFlag;

                  switch (value) {
                    case "es":
                      flag = spainFlag;
                      break;
                    case "de":
                      flag = germanyFlag;
                      break;
                    case "pt":
                      flag = portugalFlag;
                      break;
                    default:
                      break;
                  }

                  return <img alt={value} src={flag} width="20" />;
                }}
                sx={{
                  minWidth: 40,
                  maxWidth: 60,
                  padding: "2px",
                  "& .MuiSelect-select": {
                    padding: "4px 8px",
                    display: "flex",
                    alignItems: "center",
                  },
                }}
                value={language}
                variant="outlined"
              >
                <MenuItem value="en">
                  <ListItemIcon>
                    <img alt="UK" src={ukFlag} width="20" />
                  </ListItemIcon>
                </MenuItem>
                <MenuItem value="es">
                  <ListItemIcon>
                    <img alt="Spain" src={spainFlag} width="20" />
                  </ListItemIcon>
                </MenuItem>
                <MenuItem value="de">
                  <ListItemIcon>
                    <img alt="Germany" src={germanyFlag} width="20" />
                  </ListItemIcon>
                </MenuItem>
                <MenuItem value="pt">
                  <ListItemIcon>
                    <img alt="Portugal" src={portugalFlag} width="20" />
                  </ListItemIcon>
                </MenuItem>
              </Select>
              {/*  Divisor línea vertical */}
              <div>
                <Divider color="gradient" orientation="vertical" />
              </div>
              {/* Iniciales del usuario */}
              <div>
                <Avatar sx={{ backgroundColor: theme.palette.background.primary }}>
                  <Typography color="primary.main" variant="caption1">
                    {nameInitials}
                  </Typography>
                </Avatar>
              </div>
            </Stack>
            {/* Cuadro con el usuario seleccionado */}
            <Box display="flex" flexDirection="column">
              <Typography noWrap variant="body3">
                {name}
              </Typography>
              <Typography noWrap variant="caption1">
                {rt(role)}
              </Typography>
            </Box>
            {/* Botón de Logout */}
            <IconButton data-testid="logout-button" onClick={handleLogOut} variant="contained">
              <MuisticaIcon color="text.primary">logout</MuisticaIcon>
            </IconButton>
          </Box>
        </Stack>
      </Paper>

      <ErrorBoundary>
        <Box mx={9} my={5}>
          {children}
        </Box>
        {contactUsOpen && <ContactModal onClose={() => setContactUs(false)} />}
      </ErrorBoundary>
    </Box>
  );
};

PrivateLayout.propTypes = {
  children: PropTypes.any,
  role: PropTypes.string,
  name: PropTypes.string,
};

export default PrivateLayout;
