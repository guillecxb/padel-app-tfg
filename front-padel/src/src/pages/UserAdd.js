import { useMemo, useCallback } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Paper, Stack, Button, Box } from "@mui/material";

import { useCreateUserMutation } from "domain/accounts/apiSlices/usersApiSlice";
import { ROUTES } from "modules/app/router";

import EntityForm from "modules/common/entity-form";
import { fieldRequired } from "modules/common/validation";

import { useValidationTranslation, useUsersTranslation } from "translations";

const UserAdd = () => {
  const navigate = useNavigate();
  const t = useUsersTranslation();
  const vt = useValidationTranslation();

  const [createUser] = useCreateUserMutation();

  const validation = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required(fieldRequired(vt, t("validations.name"))),
      password: Yup.string().required(fieldRequired(vt, t("validations.password"))),
      role: Yup.string().required(fieldRequired(vt, t("validations.role"))),
    });
  }, [t, vt]);

  const entity = useMemo(() => {
    return {
      name: "",
      password: "",
      role: "",
    };
  }, []);

  const roleOptions = useMemo(() => [
    { key: "customer", value: "customer", label: t("fields.customer") },
    { key: "operator", value: "operator", label: t("fields.operator") },
  ], [t]);

  const handleSubmit = useCallback(
    async (fields) => {
      try {
        await createUser(fields).unwrap();
      } catch (e) {
        throw e;
      }

      return true;
    },
    [createUser]
  );

  const handleSubmitSuccess = useCallback(() => {
    navigate(ROUTES.home);
  }, [navigate]);

  return (
    <EntityForm
      entity={entity}
      errorOn="snackbar"
      onSubmit={handleSubmit}
      onSubmitSuccess={handleSubmitSuccess}
      snackbarTranslationParams={({ name }) => ({ user: name })}
      successOn="snackbar"
      translationKey="userAdd"
      validation={validation}
    >
      <Box sx={{ padding: 2, maxWidth: "75%", margin: "0 auto", width: "100%" }}>
        <Paper sx={{ padding: 4 }}>
          <EntityForm.LayoutBlock subtitle={t("createSubtitle")} title={t("createUser")}>
            <Stack alignItems="flex-start" direction="column" spacing={2}>
              <EntityForm.TextField
                data-testid="name"
                fullWidth
                id="name"
                inputProps={{ maxLength: 255 }}
                label={t("fields.name")}
                name="name"
                type="text"
              />
              <EntityForm.TextField
                data-testid="password"
                fullWidth
                id="password"
                inputProps={{ maxLength: 255 }}
                label={t("fields.password")}
                name="password"
                type="password"
              />
              <EntityForm.Select
                data-testid="role"
                id="role"
                name="role"
                tag={t("fields.role")}
                values={roleOptions}
                helperText={t("fields.roleHelperText")}
              />
            </Stack>
          </EntityForm.LayoutBlock>
        </Paper>
        <Stack direction="row" justifyContent="flex-end" mt={2} pb={2} spacing={2}>
          <EntityForm.DataBlock>
            {({ isSubmitting }) => (
              <Button
                color="primary"
                data-testid="form-actions-cancel"
                disabled={isSubmitting}
                onClick={() => navigate(ROUTES.home)}
                size="large"
                variant="outlined"
              >
                {t("cancel")}
              </Button>
            )}
          </EntityForm.DataBlock>
          <EntityForm.SubmitButton data-testid="form-actions-send" size="large">
            {t("create")}
          </EntityForm.SubmitButton>
        </Stack>
      </Box>
    </EntityForm>
  );
};

export default UserAdd;
