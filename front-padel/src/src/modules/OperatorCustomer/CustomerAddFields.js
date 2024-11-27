import { Stack } from "@mui/material";

import EntityForm from "modules/common/entity-form";

import { useOperatorCustomerTranslation } from "translations";

import CustomerEmailField from "./CustomerEmailField";
import CustomerCredentialField from "./CustomerCredentialField";

const CustomerAddFields = () => {
  const t = useOperatorCustomerTranslation();

  return (
    <Stack alignItems="flex-start" flexGrow={1} spacing={2}>
      <EntityForm.TextField
        data-testid="name"
        fullWidth
        id="name"
        inputProps={{ maxLength: 255 }}
        label={t("fields.customer")}
        name="name"
        type="text"
      />
      <Stack
        alignItems="flex-start"
        direction="row"
        justifyContent="flex-start"
        spacing={2}
        width="100%"
      >
        <CustomerEmailField />
        <CustomerCredentialField />
      </Stack>
    </Stack>
  );
};

export default CustomerAddFields;
