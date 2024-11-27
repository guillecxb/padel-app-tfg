import { useMemo } from "react";
import PropTypes from "prop-types";

import { Box, Paper, Stack, Grid } from "@mui/material";

import EntityForm from "modules/common/entity-form";

import { useUsersCreateEditTranslation } from "translations";

import { useOperatorAdd } from "./hooks";
import EditCopy from "./EditCopy";

const ViewOperator = ({ operator, id }) => {
  const { roleOptions } = useOperatorAdd();
  const t = useUsersCreateEditTranslation();

  const entity = useMemo(() => {
    return {
      username: operator?.name || "",
      role: operator?.role || "",
      oid: operator?.oid || "",
    };
  }, [operator]);

  const onSubmit = () => {};

  return (
    <EntityForm data-testid="user-form" entity={entity} onSubmit={onSubmit}>
      <Paper elevation={4} sx={{ mt: 4 }}>
        <EntityForm.LayoutBlock>
          <Box mb={2}>
            <Stack direction="row" spacing={2} sx={{ marginBottom: 1 }}>
              <EntityForm.TextField
                data-testid={"type"}
                disabled
                fullWidth
                id="credentials"
                inputProps={{ maxLength: 255 }}
                label={t("fields.label")}
                name="credentials"
                type="text"
                value={t("types.O365")}
              />
              <EntityForm.Select
                data-testid="role"
                disabled
                id="role"
                name="role"
                tag={""}
                values={roleOptions}
              />
            </Stack>
          </Box>
          <Box>
            <Grid container spacing={2} sx={{ marginBottom: 1 }}>
              <Grid item xs={6}>
                <EntityForm.TextField
                  data-testid={"username"}
                  disabled
                  fullWidth
                  id="username"
                  inputProps={{ maxLength: 255 }}
                  label={t("fields.username")}
                  name="username"
                  type="text"
                />
                <EditCopy originField="username" />
              </Grid>
              <Grid item xs={6}>
                <EntityForm.TextField
                  data-testid={"oid"}
                  disabled
                  fullWidth
                  id="oid"
                  inputProps={{ maxLength: 255 }}
                  label={t("fields.oid")}
                  name="oid"
                  type="text"
                />
                <EditCopy originField="username" />
              </Grid>
            </Grid>
          </Box>
        </EntityForm.LayoutBlock>
      </Paper>
    </EntityForm>
  );
};

ViewOperator.propTypes = {
  operator: PropTypes.object,
  id: PropTypes.string,
};

export default ViewOperator;
