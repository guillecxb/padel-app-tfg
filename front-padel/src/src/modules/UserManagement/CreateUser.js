import { useCallback, useMemo } from "react";

import { Paper, Typography } from "@mui/material";

import EntityForm from "modules/common/entity-form";

import { useUsersCreateEditTranslation } from "translations";

import { useCustomerActions, useCustomerValidation } from "./hooks";
import UserFields from "./UserFields";
import UserAddActions from "./UserAddActions";

const CreateUser = () => {
  const t = useUsersCreateEditTranslation();
  const { onCreateCustomer, goToUsers } = useCustomerActions();
  const entity = useMemo(() => {
    return {
      username: "",
      password: "",
    };
  }, []);
  const validation = useCustomerValidation({ entity, isEditMode: false });

  const onSubmitForm = useCallback(
    async (body) => await onCreateCustomer(body),
    [onCreateCustomer]
  );

  const onSubmitSuccess = useCallback(() => goToUsers(), [goToUsers]);

  return (
    <EntityForm
      data-testid="user-form"
      entity={entity}
      errorOn="snackbar"
      onSubmit={onSubmitForm}
      onSubmitSuccess={onSubmitSuccess}
      snackbarOptions={{ action: true }}
      snackbarTranslationParams={{}}
      successOn="snackbar"
      translationKey={"createUser"}
      validateOnChange={false}
      validation={validation}
    >
      <Paper elevation={4} sx={{ mt: 4 }}>
        <EntityForm.LayoutBlock
          subtitle={t("customer.addDescription")}
          title={
            <>
              <Typography mb={3} variant="inherit">
                {t("customer.newUser")}
              </Typography>
              <Typography mb={3}>{t("types.credentials")}</Typography>
            </>
          }
        >
          <UserFields />
        </EntityForm.LayoutBlock>
      </Paper>
      <EntityForm.DataBlock>
        {({ isSubmitting }) => (
          <UserAddActions edit={false} goToCustomers={goToUsers} isSubmitting={isSubmitting} />
        )}
      </EntityForm.DataBlock>
    </EntityForm>
  );
};

export default CreateUser;
