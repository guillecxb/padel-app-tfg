import { useMemo } from "react";
import PropTypes from "prop-types";

import { Box, Grid, Paper } from "@mui/material";

import EntityForm from "modules/common/entity-form";

import { useUsersCreateEditTranslation } from "translations";

import EditCopy from "./EditCopy";
import EditHeader from "./EditHeader";

const ViewUserForm = ({ user, id }) => {
  const t = useUsersCreateEditTranslation();

  const entity = useMemo(() => {
    return {
      username: user?.name || "",
      oid: user?.oid || "",
    };
  }, [user]);

  const onSubmit = () => {};

  return (
    <EntityForm data-testid="user-form" entity={entity} onSubmit={onSubmit}>
      <Paper elevation={4} sx={{ mt: 4 }}>
        <EntityForm.LayoutBlock title={<EditHeader status="linked" userId={id} />}>
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

ViewUserForm.propTypes = {
  user: PropTypes.object,
  id: PropTypes.string,
};

export default ViewUserForm;
