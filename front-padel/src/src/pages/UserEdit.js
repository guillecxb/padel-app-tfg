import { useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Paper, Typography, Box, Stack, Button } from "@mui/material";
import * as Yup from "yup";

import EntityForm from "modules/common/entity-form";

import { useUsersCreateEditTranslation } from "translations";
import { useUpdateUserByIdMutation } from "domain/accounts/apiSlices/usersApiSlice";

const UserEdit = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const t = useUsersCreateEditTranslation();

  const [updateUserById] = useUpdateUserByIdMutation();

  const entity = useMemo(() => {
    return {
      name: "",
      password: "",
    };
  }, []);

  const validation = useMemo(
    () =>
      Yup.object().shape({
        name: Yup.string().required(t("validations.nameRequired")),
        password: Yup.string().required(t("validations.passwordRequired")),
      }),
    [t]
  );

  const handleSubmit = useCallback(
    async (body) => {
      try {
        await updateUserById({ userId, ...body }).unwrap();
        // Mostrar snackbar de éxito
        return t("userUpdatedSuccess");
      } catch (error) {
        console.error("Error updating user:", error);
        // Mostrar snackbar de error
        throw new Error(t("userUpdatedError"));
      }
    },
    [updateUserById, userId, t]
  );

  const handleSubmitSuccess = useCallback(() => {
    navigate("/users"); // Redirigir a la página de usuarios
  }, [navigate]);

  return (
    <>
      <Typography color="text.primary" variant="h1">
        {t("customer.editUser")}
      </Typography>
      <Box sx={{ padding: 2, maxWidth: "75%", margin: "0 auto" }}>
        <Paper sx={{ padding: 4 }}>
          <EntityForm
            entity={entity}
            onSubmit={handleSubmit}
            onSubmitSuccess={handleSubmitSuccess}
            successOn="snackbar"
            errorOn="snackbar"
            validation={validation}
            translationKey="editUser"
            snackbarTranslationParams={{ userId }} 
          >
            <EntityForm.LayoutBlock title={t("editUserLabel", { userId })} subtitle={t("editUserSubtitle")}>
              <Stack spacing={2}>
                <EntityForm.TextField
                  name="name"
                  label={t("fields.name")}
                  data-testid="name"
                  fullWidth
                />
                <EntityForm.TextField
                  name="password"
                  label={t("fields.password")}
                  data-testid="password"
                  fullWidth
                  type="password"
                />
              </Stack>
            </EntityForm.LayoutBlock>
            <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
              <Button variant="contained" color="primary" type="submit">
                {t("saveChanges")}
              </Button>
            </Stack>
          </EntityForm>
        </Paper>
      </Box>
    </>
  );
};

export default UserEdit;
