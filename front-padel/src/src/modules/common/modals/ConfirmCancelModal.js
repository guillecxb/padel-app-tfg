import { PropTypes } from "prop-types";

import uuid from "uuid-random";

import { Modal, Paper, Button, Box, Typography, IconButton, Stack } from "@mui/material";

import { ERROR_ALERT, SUCCESS_ALERT } from "modules/enumerations";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

import { useModalsTranslation, useNotificationsTranslation } from "translations";

import { useEnqueueSnackbar } from "../hooks/useEnqueueSnackbar";

const ConfirmCancelModal = ({
  isOpen,
  handleConfirm,
  handleCancel,
  subtitleParams,
  translationKey,
  color,
  alertIcon,
  confirmButton,
  cancelTextVariant,
  buttonSize,
}) => {
  const t = useModalsTranslation();
  const nt = useNotificationsTranslation();
  const translations = t(translationKey, { returnObjects: true });
  const notificationTranslations = nt(translationKey, { returnObjects: true });

  const enqueueSnackbar = useEnqueueSnackbar();

  const onConfirm = async () => {
    try {
      !!handleConfirm && (await handleConfirm());
      notificationTranslations.success &&
        (await enqueueSnackbar(nt(`${translationKey}.success`), {
          variant: SUCCESS_ALERT,
          key: uuid(),
          "data-testid": `${translationKey}-notification-success`,
        }));
    } catch {
      notificationTranslations.error &&
        (await enqueueSnackbar(nt(`${translationKey}.error`), {
          variant: ERROR_ALERT,
          key: uuid(),
          "data-testid": `${translationKey}-notification-error`,
        }));
    } finally {
      await handleCancel();
    }
  };

  return (
    <Modal open={isOpen}>
      <Box
        alignItems="center"
        display="flex"
        justifyContent="center"
        sx={{ width: "100vw", height: "100vh" }}
      >
        <Paper sx={{ position: "relative", p: 4, width: "680px" }}>
          <Box position="absolute" right={20} top={20}>
            <IconButton onClick={handleCancel}>
              <MuisticaIcon color="text.primary">close</MuisticaIcon>
            </IconButton>
          </Box>
          <Stack spacing={2}>
            {alertIcon}
            {translations.title && (
              <Typography variant="h4">{t(`${translationKey}.title`)}</Typography>
            )}
            {translations.subtitle && (
              <Typography>{t(`${translationKey}.subtitle`, subtitleParams)}</Typography>
            )}
            {translations.description && (
              <Typography color="text.secondary" variant="body2">
                {t(`${translationKey}.description`)}
              </Typography>
            )}
          </Stack>
          <Box alignItems="center" display="flex" gap={2} justifyContent="flex-end">
            <Button
              data-testid="cancel-deletion"
              onClick={handleCancel}
              size={buttonSize || "medium"}
              sx={{ px: 4, mt: 2 }}
              variant="outlined"
            >
              <Typography color="gradient" variant={cancelTextVariant || "subtitle1"}>
                {translations.cancel || t("cancel")}
              </Typography>
            </Button>
            {confirmButton ?? (
              <Button
                color={color}
                data-testid="confirm-deletion"
                onClick={onConfirm}
                sx={{ px: 4, mt: 2 }}
                variant="contained"
              >
                {translations.confirm || t("confirm")}
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </Modal>
  );
};

export default ConfirmCancelModal;

ConfirmCancelModal.propTypes = {
  handleConfirm: PropTypes.func,
  handleCancel: PropTypes.func,
  isOpen: PropTypes.bool,
  subtitleParams: PropTypes.any,
  alertIcon: PropTypes.node,
  translationKey: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["error", "success", "info", "warning"]),
  confirmButton: PropTypes.node,
  cancelTextVariant: PropTypes.string,
  buttonSize: PropTypes.oneOf(["small", "medium", "large"]),
};
