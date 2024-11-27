import { getIn, useFormikContext } from "formik";

import EntityForm from "modules/common/entity-form";
import { CREDENTIALS } from "modules/enumerations";

import { useOperatorCustomerTranslation } from "translations";

const CustomerCredentialField = () => {
  const t = useOperatorCustomerTranslation();
  const { errors, touched } = useFormikContext();

  const hasError = getIn(errors, "credentials_type");
  const isTouched = getIn(touched, "credentials_type");

  const roleOptions = [
    {
      key: "emailPassword",
      value: CREDENTIALS.USER_PASS,
      label: t("credentialsOptions.emailPassword"),
    },
    {
      key: "O365",
      value: CREDENTIALS.MICROSOFT,
      label: t("credentialsOptions.O365"),
    },
  ];

  return (
    <EntityForm.Select
      data-testid="credentials"
      helperText={isTouched && hasError ? undefined : t("fields.credentialPlaceholder")}
      id="credentials_type"
      name="credentials_type"
      tag={t("fields.credentialsType")}
      values={roleOptions}
    />
  );
};

export default CustomerCredentialField;
