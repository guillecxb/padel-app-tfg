import PropTypes from "prop-types";

import { Button, Stack } from "@mui/material";

import EntityForm from "modules/common/entity-form";

import { useUsersCreateEditTranslation } from "translations";

const UserAddActions = ({ isSubmitting, goToCustomers, edit }) => {
  const t = useUsersCreateEditTranslation();

  return (
    <Stack alignItems="center" direction="row" justifyContent="flex-end" mt={1} spacing={2}>
      <Button
        color="primary"
        data-testid="form-actions-cancel"
        disabled={isSubmitting}
        onClick={goToCustomers}
        size="large"
        variant="outlined"
      >
        {t("form.cancel")}
      </Button>
      <EntityForm.SubmitButton
        data-testid="form-actions-send"
        disabled={isSubmitting}
        size="large"
      >
        {t(edit ? "form.save" : "form.submit")}
      </EntityForm.SubmitButton>
    </Stack>
  );
};

UserAddActions.propTypes = {
  isSubmitting: PropTypes.bool,
  edit: PropTypes.bool,
  goToCustomers: PropTypes.func,
};

export default UserAddActions;
