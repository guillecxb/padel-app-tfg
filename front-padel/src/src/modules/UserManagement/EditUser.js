import { useCallback, useMemo } from "react";

import { useParams } from "react-router-dom";

import { Paper, Typography } from "@mui/material";

import {
  useGetCredentialsQuery,
  useGetUserByIdQuery,
} from "domain/accounts/apiSlices/usersApiSlice";

import EntityForm from "modules/common/entity-form";

import { useUsersCreateEditTranslation } from "translations";

import { useCustomerActions, useCustomerValidation } from "./hooks";
import UserFields from "./UserFields";
import UserAddActions from "./UserAddActions";

const EditUser = () => {
  const { userId } = useParams();
  const t = useUsersCreateEditTranslation();

  const { data: credentials, error: credentialsError } = useGetCredentialsQuery(
    { id: userId },
    { skip: !userId }
  );

  const { data: userData, error: userError } = useGetUserByIdQuery(
    { id: userId },
    { skip: !userId }
  );

  const { onEditCustomer, goToUsers } = useCustomerActions();
  const entity = useMemo(() => {
    return {
      username: credentials?.login,
      password: "",
    };
  }, [credentials?.login]);
  const validation = useCustomerValidation({ entity, isEditMode: true });

  const showForm = useMemo(() => {
    return !credentialsError && !!credentials?.login && !userError && !!userData?.id;
  }, [credentials?.login, credentialsError, userData?.id, userError]);

  const onSubmitForm = useCallback(
    async (body) => onEditCustomer({ id: userData.id, body }),
    [onEditCustomer, userData?.id]
  );

  const onSubmitSuccess = useCallback(() => goToUsers(), [goToUsers]);

  return (
    <>
      {showForm && (
        <EntityForm
          data-testid="user-form"
          entity={entity}
          errorOn="snackbar"
          onSubmit={onSubmitForm}
          onSubmitSuccess={onSubmitSuccess}
          snackbarOptions={{ action: true }}
          snackbarTranslationParams={{ userId }}
          successOn="snackbar"
          translationKey={"editUser"}
          validateOnChange={false}
          validation={validation}
        >
          <Paper elevation={4} sx={{ mt: 4 }}>
            <EntityForm.LayoutBlock
              subtitle={
                <Typography variant="inherit">{t("editUserLabel", { userId })}</Typography>
              }
              title={
                <Typography mb={3} variant="inherit">
                  {t("customer.editUser")}
                </Typography>
              }
            >
              <UserFields />
            </EntityForm.LayoutBlock>
          </Paper>
          <EntityForm.DataBlock>
            {({ isSubmitting }) => (
              <UserAddActions edit={true} goToCustomers={goToUsers} isSubmitting={isSubmitting} />
            )}
          </EntityForm.DataBlock>
        </EntityForm>
      )}
    </>
  );
};

export default EditUser;
