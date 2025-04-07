import { useState, useMemo } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import {
  Box,
  Button,
  IconButton,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import { useSignIn1Mutation } from "domain/accounts/apiSlices/usersApiSlice";
import { setCredentials } from "domain/accounts/slices/authSlice";

import EntityForm from "modules/common/entity-form";
import { ROUTES } from "modules/app/router";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { useLoginTranslation, useValidationTranslation } from "translations";

import { useLocation } from "react-router-dom";

export const LoginForm = () => {
  const t = useLoginTranslation();
  const vt = useValidationTranslation();

  // Tu dirección de correo electrónico
  const supportEmail = "support@example.com";

  const [showPassword, setShowPassword] = useState(false);
  const [signIn] = useSignIn1Mutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname
    ? location.state.from.pathname + location.state.from.search
    : ROUTES.home;
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogForgot, setOpenDialogForgot] = useState(false);

  const handleSubmit = async (values) => {
    const { login, password, rememberMe } = values;
  
    try {
      const tokenData = await signIn({ login, password }).unwrap();
      dispatch(setCredentials({ ...tokenData, rememberMe }));
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const toggleShow = () => {
    setShowPassword((show) => !show);
  };

  const handleForgotClick = () => {
    setOpenDialogForgot(true);
  };

  const entity = useMemo(() => {
    return {
      login: "",
      password: "",
      rememberMe: false,
    };
  }, []);

  const validation = Yup.object().shape({
    login: Yup.string().required(vt("login.required")),
    password: Yup.string().required(vt("password.required")),
  });

  return (
    <EntityForm
      data-testid="signin-form"
      entity={entity}
      errorOn="alert"
      onSubmit={handleSubmit}
      translationKey="login"
      validation={validation}
    >
      <Stack spacing={2} sx={{ marginBottom: "8px" }}>
        <EntityForm.TextField
          autoFocus
          data-testid="login"
          fullWidth
          id="login"
          inputProps={{ maxLength: 255 }}
          label={t("username")}
          name="login"
          type="text"
        />

        <EntityForm.TextField
          InputProps={{
            endAdornment: (
              <IconButton onClick={toggleShow}>
                <MuisticaIcon color="text.primary">
                  {showPassword ? "eye-off" : "eye"}
                </MuisticaIcon>
              </IconButton>
            ),
          }}
          data-testid="password"
          fullWidth
          id="password"
          inputProps={{ maxLength: 255 }}
          label={t("password")}
          name="password"
          type={showPassword ? "text" : "password"}
        />
        <Box alignItems="center" display="flex" justifyContent="space-between">
          <EntityForm.Checkbox
            color="primary"
            id="remember-me"
            label={t("remember")}
            name="rememberMe"
          />
          <Button color="primary" data-testid="forgot-password" onClick={handleForgotClick}>
            <Typography color="gradient" variant="subtitle2">
              {t("forgot")}
            </Typography>
          </Button>
        </Box>
      </Stack>
      <EntityForm.SubmitButton
        color="primary"
        data-testid="signin"
        fullWidth
        id="signin-submit-button"
        type="submit"
        variant="contained"
      >
        {t("sign")}
      </EntityForm.SubmitButton>

      <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
        <DialogTitle>{t("forgotTittle")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("serviceUnavailable")}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setOpenDialog(false)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog onClose={() => setOpenDialogForgot(false)} open={openDialogForgot}>
        <DialogTitle>{t("forgotTittle")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("forgotMessage")}
            <br />
            {t("forgotContact")} <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => setOpenDialogForgot(false)}>
            {t("confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </EntityForm>
  );
};
