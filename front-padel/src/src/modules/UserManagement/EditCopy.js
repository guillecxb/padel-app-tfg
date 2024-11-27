import PropTypes from "prop-types";

import { Stack } from "@mui/material";

import EntityForm from "modules/common/entity-form";

import { useUsersCreateEditTranslation } from "translations";

const EditCopy = ({ originField }) => {
  const t = useUsersCreateEditTranslation();
  return (
    <Stack alignItems="center" direction="row" justifyContent="flex-end" mt={1.5}>
      <EntityForm.CopyToClipboard
        copiedLabel={t("form.linkCopied")}
        copyLabel={t("form.copy")}
        data-testid="copy-link"
        originField={originField}
      />
    </Stack>
  );
};

EditCopy.propTypes = {
  originField: PropTypes.string,
};

export default EditCopy;
