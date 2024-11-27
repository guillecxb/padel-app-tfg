import { useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { Button, Stack, Typography } from "@mui/material";

import EntityForm from "modules/common/entity-form";
import { ROUTES } from "modules/app/router";

import { useOperatorCustomerTranslation } from "translations";

const CustomerAddButtons = () => {
  const navigate = useNavigate();
  const t = useOperatorCustomerTranslation();

  const handelCancel = useCallback(() => {
    navigate(ROUTES.home);
  }, [navigate]);

  return (
    <Stack direction="row" justifyContent="flex-end" mt={2} pb={2} spacing={2}>
      <EntityForm.DataBlock>
        {({ isSubmitting }) => (
          <Button
            color="primary"
            data-testid="form-actions-cancel"
            disabled={isSubmitting}
            onClick={handelCancel}
            size="large"
            variant="outlined"
          >
            <Typography color="gradient" variant="subtitle">
              {t("cancel")}
            </Typography>
          </Button>
        )}
      </EntityForm.DataBlock>
      <EntityForm.SubmitButton data-testid="form-actions-send" size="large">
        <Typography color="text.primaryInverse" variant="subtitle">
          {t("create")}
        </Typography>
      </EntityForm.SubmitButton>
    </Stack>
  );
};

export default CustomerAddButtons;
