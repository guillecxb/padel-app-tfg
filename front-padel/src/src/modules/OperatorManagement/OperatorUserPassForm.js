import { useCallback, useState } from "react";
import PropTypes from "prop-types";

import * as Yup from "yup";
import { useParams } from "react-router-dom";

import { Box, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";

import EntityForm from "modules/common/entity-form";
import {
  fieldAlreadyTaken,
  fieldMaxLength,
  fieldMinLength,
  fieldRequired,
  LOGIN_MAX_LENGTH,
  LOGIN_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  validationMessage,
} from "modules/common/validation";
import useToggle from "modules/common/hooks/useToggle";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { useUsersCreateEditTranslation, useValidationTranslation } from "translations";

import { useOperatorAddActions, useOperatorAdd } from "./hooks";
import UserAddActions from "./UserAddActions";

const OperatorUserPassForm = ({ entity }) => {
  const { id: operatorId } = useParams();
  const t = useUsersCreateEditTranslation();
  const vt = useValidationTranslation();

  const isEditMode = !!operatorId;

  const { roleOptions } = useOperatorAdd();
  const { onValidateCredentials, onCreateOperator, onEditOperator, goToOperators } =
    useOperatorAddActions();

  const [showPassword, setShowPassword] = useToggle();
  const [generatedPassword, setGeneratedPassword] = useState(false);

  const validation = Yup.object().shape({
    role: Yup.string().required(fieldRequired(vt, t("form.operatorError"))),
    username: Yup.string()
      .min(
        LOGIN_MIN_LENGTH,
        fieldMinLength(vt, t("fields.username"), {
          count: LOGIN_MIN_LENGTH,
        })
      )
      .max(
        LOGIN_MAX_LENGTH,
        fieldMaxLength(vt, t("fields.username"), {
          count: LOGIN_MAX_LENGTH,
          context: "female",
        })
      )
      .test("checkDuplUsername", fieldAlreadyTaken(vt, t("fields.username")), async (value) => {
        if (value && value.length >= LOGIN_MIN_LENGTH) {
          if (isEditMode && value === entity?.username) {
            return true;
          }

          const { valid } = await onValidateCredentials(value);
          return valid;
        }
        return true;
      })
      .required(fieldRequired(vt, t("fields.username"))),
    password: Yup.string()
      .min(
        PASSWORD_MIN_LENGTH,
        fieldMinLength(vt, t("fields.password"), {
          count: PASSWORD_MIN_LENGTH,
        })
      )
      .max(
        PASSWORD_MAX_LENGTH,
        fieldMaxLength(vt, t("fields.password"), {
          count: PASSWORD_MAX_LENGTH,
          context: "female",
        })
      )
      .matches(PASSWORD_REGEX, validationMessage(t("form.passwordError")))
      .required(fieldRequired(vt, t("fields.password"))),
  });

  const onSubmitForm = useCallback(
    async (data) => {
      isEditMode ? await onEditOperator({ data, id: operatorId }) : await onCreateOperator(data);
    },
    [isEditMode, onEditOperator, operatorId, onCreateOperator]
  );

  const onSubmitSuccess = useCallback(() => goToOperators(), [goToOperators]);

  return (
    <EntityForm
      data-testid="user-form"
      entity={entity}
      errorOn="snackbar"
      onSubmit={onSubmitForm}
      onSubmitSuccess={onSubmitSuccess}
      snackbarOptions={{ action: true }}
      snackbarTranslationParams={isEditMode ? { userId: operatorId } : {}}
      successOn="snackbar"
      translationKey={isEditMode ? "editOperator" : "createOperator"}
      validateOnChange={false}
      validation={validation}
    >
      <Paper elevation={4} sx={{ mt: 4 }}>
        <EntityForm.LayoutBlock
          subtitle={t(isEditMode ? "editUserLabel" : "userPassDescription", {
            userId: operatorId,
          })}
          title={
            <Typography mb={3} variant="inherit">
              {t(operatorId ? "editUser" : "addNew")}
            </Typography>
          }
        >
          <Box mb={2}>
            <Stack direction="row" spacing={2} sx={{ marginBottom: 1 }}>
              <EntityForm.TextField
                data-testid={"credentials"}
                disabled
                fullWidth
                id="credentials"
                inputProps={{ maxLength: 255 }}
                label={t("fields.label")}
                name="credentials"
                type="text"
                value={t("types.credentials")}
              />
              <EntityForm.Select
                data-testid="role"
                id="operator-type"
                name="role"
                tag={t("fields.operator")}
                values={roleOptions}
              />
            </Stack>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <EntityForm.TextField
                data-testid="username"
                footer={
                  <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="flex-end"
                    mt={1.5}
                    spacing={2}
                  >
                    <EntityForm.DataBlock>
                      {({ values }) => (
                        <EntityForm.CopyToClipboard
                          color={!!values.username ? "primary" : "secondary"}
                          copiedLabel={t("form.usernameCopied")}
                          copyLabel={t("form.copy")}
                          data-testid="copy-username"
                          originField="username"
                        />
                      )}
                    </EntityForm.DataBlock>
                  </Stack>
                }
                fullWidth
                helperText={t("fields.usernameHelper")}
                id="username"
                inputProps={{ maxLength: 255 }}
                label={t("username")}
                name="username"
                type="text"
              />
            </Grid>
            <Grid item xs={6}>
              <EntityForm.TextField
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={setShowPassword}>
                      <MuisticaIcon color="text.primary">
                        {showPassword ? "eye-off" : "eye"}
                      </MuisticaIcon>
                    </IconButton>
                  ),
                }}
                data-testid="password"
                footer={
                  <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="flex-end"
                    mt={1.5}
                    spacing={2}
                  >
                    <EntityForm.CopyToClipboard
                      copiedLabel={t("form.passwordCopied")}
                      copyLabel={t("form.copy")}
                      data-testid="copy-password"
                      originField="password"
                    />
                    <EntityForm.GeneratePassword
                      data-testid="generate-password"
                      destinationField="password"
                      generateLabel={
                        generatedPassword ? t("form.refreshPass") : t("form.generatePass")
                      }
                      generatedLabel={t("form.generatedPass")}
                      length={PASSWORD_MIN_LENGTH}
                      setGeneratedPassword={setGeneratedPassword}
                    />
                  </Stack>
                }
                helperText={t("fields.passwordHelper")}
                id="password"
                label={t("fields.password")}
                name="password"
                type={showPassword ? "text" : "password"}
              />
            </Grid>
          </Grid>
        </EntityForm.LayoutBlock>
      </Paper>

      <EntityForm.DataBlock>
        {({ isSubmitting }) => (
          <UserAddActions
            edit={isEditMode}
            goToOperators={goToOperators}
            isSubmitting={isSubmitting}
          />
        )}
      </EntityForm.DataBlock>
    </EntityForm>
  );
};

OperatorUserPassForm.propTypes = {
  entity: PropTypes.any,
};

export default OperatorUserPassForm;
