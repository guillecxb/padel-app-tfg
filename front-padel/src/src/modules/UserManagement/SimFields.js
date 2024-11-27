// import { useState } from "react";

import { Box, Grid } from "@mui/material";

import EntityForm from "modules/common/entity-form";
// import { PASSWORD_MIN_LENGTH } from "modules/common/validation";
// import useToggle from "modules/common/hooks/useToggle";

// import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { useSimsTranslation } from "translations";

const SimFields = () => {
  const t = useSimsTranslation();

  // const [showPassword, setShowPassword] = useToggle();
  // const [generatedPassword, setGeneratedPassword] = useState(false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <EntityForm.TextField
          data-testid="username"
          fullWidth
          helperText={t("fields.usernameHelper")}
          id="username"
          inputProps={{ maxLength: 255 }}
          label={t("msisdn")}
          name="paco"
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
          data-testid="owner"
          fullWidth
          helperText={t("fields.ownerHelper")}
          id="owner"
          inputProps={{ maxLength: 255 }}
          label={t("owner")}
          name="owner"
          type="text"
        />
        <Box display="flex" justifyContent="flex-end" mt={1.5}>
          <EntityForm.DataBlock>
            {({ values }) => (
              <EntityForm.CopyToClipboard
                color={!!values.owner ? "primary" : "secondary"}
                copiedLabel={t("form.ownerCopied")}
                copyLabel={t("form.copy")}
                data-testid="copy-owner"
                originField="owner"
              />
            )}
          </EntityForm.DataBlock>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SimFields;
