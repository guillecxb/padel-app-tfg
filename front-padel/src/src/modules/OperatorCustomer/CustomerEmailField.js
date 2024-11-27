import { getIn, useFormikContext } from "formik";

import EntityForm from "modules/common/entity-form";

import { useOperatorCustomerTranslation } from "translations";

const CustomerEmailField = () => {
  const t = useOperatorCustomerTranslation();
  const { errors, touched } = useFormikContext();

  const emailHasError = getIn(errors, "notification_email");
  const isTouched = getIn(touched, "notification_email");

  return (
    <EntityForm.TextField
      data-testid="email"
      fullWidth
      helperText={isTouched && emailHasError ? undefined : t("fields.emailPlaceholder")}
      id="notification_email"
      inputProps={{ maxLength: 255 }}
      label={t("fields.email")}
      name="notification_email"
      type="email"
    />
  );
};

export default CustomerEmailField;
