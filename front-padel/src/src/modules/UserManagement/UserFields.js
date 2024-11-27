import { useState } from "react";

import { Box, IconButton, Stack, Grid } from "@mui/material";

import EntityForm from "modules/common/entity-form";
import { PASSWORD_MIN_LENGTH } from "modules/common/validation";
import useToggle from "modules/common/hooks/useToggle";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { useUsersCreateEditTranslation } from "translations";

const UserFields = () => {
  const t = useUsersCreateEditTranslation();

  const [showPassword, setShowPassword] = useToggle();
  const [generatedPassword, setGeneratedPassword] = useState(false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <EntityForm.TextField
          data-testid="username"
          fullWidth
          helperText={t("fields.usernameHelper")}
          id="username"
          inputProps={{ maxLength: 255 }}
          label={t("username")}
          name="username"
          type="text"
        />
        <Box display="flex" justifyContent="flex-end" mt={1.5}>
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
        </Box>
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
          helperText={t("fields.passwordHelper")}
          id="password"
          label={t("fields.password")}
          name="password"
          type={showPassword ? "text" : "password"}
        />
        <Stack alignItems="center" direction="row" justifyContent="flex-end" mt={1.5} spacing={2}>
          <EntityForm.CopyToClipboard
            copiedLabel={t("form.passwordCopied")}
            copyLabel={t("form.copy")}
            data-testid="copy-password"
            originField="password"
          />
          <EntityForm.GeneratePassword
            data-testid="generate-password"
            destinationField="password"
            generateLabel={generatedPassword ? t("form.refreshPass") : t("form.generatePass")}
            generatedLabel={t("form.generatedPass")}
            length={PASSWORD_MIN_LENGTH}
            setGeneratedPassword={setGeneratedPassword}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default UserFields;
