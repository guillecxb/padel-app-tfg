import { useState } from "react";

import { Paper, Box, Typography, useTheme, Alert, Stack } from "@mui/material";

import { LoginForm } from "modules/Login/LoginForm";
// import LoginMS from "modules/Login/LoginMs";

import { useLoginTranslation } from "translations";

const Login = () => {
  const [error, setError] = useState("");
  const t = useLoginTranslation();
  const { palette } = useTheme();

  return (
    <Box
      alignItems="center"
      display="flex"
      justifyContent="center"
      sx={{
        minHeight: "100vh",
        background: palette.gradient.main,
      }}
    >
      <Paper sx={{ py: 5, px: 25, position: "relative" }}>
        <img
          alt="logo"
          src="/images/dalle-padel-transparent-refined.png"
          style={{
            position: "absolute",
            top: 35,
            left: 45,
            width: "64px",
            objectFit: "contain"
          }}
        />
        <Typography
          alignItems="center"
          color="gradient"
          display="flex"
          justifyContent="center"
          mb={4}
          pb={9}
          variant="h1"
        >
          {t("welcome")}
        </Typography>

        <Stack pb={2} spacing={2}>
          <Typography mb={2}>{t("pleaseSign")}</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {/* Formulario de login + botón sign in */}
          <LoginForm />
          {/* Botón para login con Microsoft */}
          {/* <LoginMS enable={false} setError={setError} /> */}
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
