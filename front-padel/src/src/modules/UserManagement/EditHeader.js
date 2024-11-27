import PropTypes from "prop-types";

import { Stack, Typography } from "@mui/material";

import StatusLabel from "modules/common/statuses/StatusLabel";

import { useUsersCreateEditTranslation } from "translations";

const EditHeader = ({ status, userId }) => {
  const t = useUsersCreateEditTranslation();
  return (
    <>
      <Typography mb={3} variant="inherit">
        {t("customer.viewUserDetails")}
      </Typography>

      <Stack alignItems="center" direction="row" justifyContent="flex-start" mb={3} spacing={2}>
        <Typography>{t("editUserLabel", { userId })}</Typography>
        <StatusLabel status={status} />
      </Stack>
    </>
  );
};

EditHeader.propTypes = {
  status: PropTypes.string,
  userId: PropTypes.string,
};

export default EditHeader;
