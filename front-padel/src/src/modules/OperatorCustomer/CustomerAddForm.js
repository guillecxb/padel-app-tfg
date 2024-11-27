import { useCallback, useMemo, useRef } from "react";

import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Paper, Stack } from "@mui/material";

import {
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
} from "domain/accounts/apiSlices/customersApiSlice";
import { getMe } from "domain/accounts/slices/authSlice";

import EntityForm from "modules/common/entity-form";
import { fieldAlreadyTaken, fieldEmailInvalid, fieldRequired } from "modules/common/validation";
import { DEPLOY_STATUS } from "modules/enumerations";

import { useOperatorCustomerTranslation, useValidationTranslation } from "translations";

import { ROUTES } from "../app/router";

import CustomerAvatarManager from "./CustomerAvatarManager";
import CustomerAddFields from "./CustomerAddFields";
import CustomerAddButtons from "./CustomerAddButtons";

const CUSTOMER_NAME_MIN_LENGTH = 5;

const CustomerAddForm = () => {
  const avatarRef = useRef();
  const navigate = useNavigate();
  const t = useOperatorCustomerTranslation();
  const vt = useValidationTranslation();

  const { obId } = useSelector(getMe);
  const [createCustomer] = useCreateCustomerMutation();
  const [updateCustomer] = useUpdateCustomerMutation();


  const customers = [];

  const validation = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string()
        .min(CUSTOMER_NAME_MIN_LENGTH, t("validations.nameLength"))
        .test(
          "checkDuplicateUsername",
          fieldAlreadyTaken(vt, t("validations.nameExists")),
          async (value) => {
            if (value?.length) {
              const exists = customers.find(
                ({ name }) => name.toLowerCase() === value.toLowerCase()
              );
              return !Boolean(exists);
            }

            return true;
          }
        )
        .required(fieldRequired(vt, t("validations.nameRequired"))),
      notification_email: Yup.string()
        .email(fieldEmailInvalid(vt, t("validations.emailInvalidFormat")))
        .required(fieldRequired(vt, t("validations.emailRequired"))),
      credentials_type: Yup.string().required(
        fieldRequired(vt, t("validations.credentialRequired"))
      ),
    });
  }, [t, vt, customers]);

  const entity = useMemo(() => {
    return {
      name: "",
      notification_email: "",
      credentials_type: "",
      platform: "PADEL-APP",
    };
  }, []);

  const snackbarTranslationParams = useCallback(({ name }) => ({ customer: name }), []);

  const activateCustomer = useCallback(
    async (customerId) => {
      const data = new FormData();
      data.append("data", JSON.stringify({ status: DEPLOY_STATUS.ACTIVE }));
      return await updateCustomer({ body: data, customerId }).unwrap();
    },
    [updateCustomer]
  );

  const handleSubmit = useCallback(
    async (fields) => {
      const data = new FormData();

      if (avatarRef.current?.file) {
        data.append("logo_data", avatarRef.current?.file, avatarRef.current?.file.name);
      }

      data.append("data", JSON.stringify(fields));

      try {
        const { id } = await createCustomer(data).unwrap();
        await activateCustomer(id);
      } catch (e) {
        throw e;
      }

      return true;
    },
    [activateCustomer, createCustomer]
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
      snackbarTranslationParams={snackbarTranslationParams}
      successOn="snackbar"
      translationKey="operatorNewCustomer"
      validation={validation}
    >
      <Paper>
        <EntityForm.LayoutBlock subtitle={t("subTitle")} title={t("title")}>
          <Stack alignItems="flex-start" direction="row" justifyContent="flex-start" spacing={2}>
            <CustomerAvatarManager ref={avatarRef} />
            <CustomerAddFields />
          </Stack>
        </EntityForm.LayoutBlock>
      </Paper>
      <CustomerAddButtons />
    </EntityForm>
  );
};

export default CustomerAddForm;
