import { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";

import uuid from "uuid-random";
import { Formik, Form } from "formik";

import { Alert, Box } from "@mui/material";

import { useEnqueueSnackbar } from "modules/common/hooks/useEnqueueSnackbar";

import { FlexColumn } from "components/atoms/wrappers/FlexColumn";

import { useNotificationsTranslation } from "translations";

import { ERROR_ALERT, SUCCESS_ALERT } from "../../enumerations";

import { getDataTestids } from "./helpers";

const EntityForm = ({
  children,
  "data-testid": dataTestidPrefix = "",
  entity,
  onSubmit,
  onSubmitError,
  onSubmitSuccess,
  onReset,
  translationKey = "default",
  validation,
  errorOn = "",
  successOn = "",
  validateOnChange = true,
  validationOnBlur,
  snackbarOptions = {},
  snackbarTranslationParams = {},
  ...rest
}) => {
  const et = useNotificationsTranslation();
  const enqueueSnackbar = useEnqueueSnackbar();

  const [submitStatus, setSubmitStatus] = useState("");
  const [message, setMessage] = useState("");

  const dataTestids = useMemo(() => getDataTestids(dataTestidPrefix), [dataTestidPrefix]);

  const handleSnackbarMessages = useCallback(
    async ({ snackbarMessage, title, variant }) =>
      await enqueueSnackbar(snackbarMessage, {
        variant,
        key: uuid(),
        "data-testid": dataTestids[`${submitStatus}Notification`],
        ...{ ...snackbarOptions, alertTitle: title },
      }),
    [dataTestids, enqueueSnackbar, snackbarOptions, submitStatus]
  );

  const renderAlertMessages = useCallback(() => {
    return (
      <Alert
        data-testid={dataTestids[`${submitStatus}Notification`]}
        severity={submitStatus}
        sx={{ minWidth: "100%" }}
      >
        {message}
      </Alert>
    );
  }, [dataTestids, message, submitStatus]);

  const handleSubmit = useCallback(
    async (values, actions) => {
      const handleMessage = (title, message, on, type) => {
        if (on) {
          message && setMessage(message);
          message && setSubmitStatus(type);
        }

        if (on === "snackbar") {
          message && handleSnackbarMessages({ snackbarMessage: message, variant: type, title });
        }
      };

      const snackbarParams =
        typeof snackbarTranslationParams === "function"
          ? snackbarTranslationParams(values)
          : snackbarTranslationParams;

      const translations = et(translationKey || "default", {
        returnObjects: true,
        replace: snackbarParams,
      });

      try {
        await onSubmit(values, actions);
        const { success: successMessage, successTitle } = translations;
        await handleMessage(successTitle, successMessage, successOn, SUCCESS_ALERT);
        onSubmitSuccess && (await onSubmitSuccess());
      } catch (e) {
        const errorMessage = translations[e.status] || translations.error;
        const errorTitle = translations.errorTitle;
        await handleMessage(errorTitle, errorMessage, errorOn, ERROR_ALERT);
        onSubmitError && (await onSubmitError(e));
      }
    },
    [
      et,
      translationKey,
      snackbarTranslationParams,
      handleSnackbarMessages,
      onSubmit,
      successOn,
      onSubmitSuccess,
      errorOn,
      onSubmitError,
    ]
  );

  return (
    <Formik
      enableReinitialize
      initialValues={entity}
      onReset={onReset}
      onSubmit={handleSubmit}
      validateOnBlur={validationOnBlur}
      validateOnChange={validateOnChange}
      validationSchema={validation}
    >
      <Form>
        <FlexColumn data-testid={dataTestidPrefix} gap={2} {...rest}>
          {errorOn === "alert" && (
            <Box alignItems="center" display="flex" justifyContent="center">
              {message && renderAlertMessages()}
            </Box>
          )}
          {children}
        </FlexColumn>
      </Form>
    </Formik>
  );
};

EntityForm.propTypes = {
  children: PropTypes.node.isRequired,
  "data-testid": PropTypes.string,
  errorOn: PropTypes.oneOf(["snackbar", "alert"]),
  successOn: PropTypes.oneOf(["snackbar", "alert"]),
  entity: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onSubmitError: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
  onReset: PropTypes.func,
  translationKey: PropTypes.string,
  validation: PropTypes.object,
  validateOnChange: PropTypes.bool,
  snackbarOptions: PropTypes.object,
  snackbarTranslationParams: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  validationOnBlur: PropTypes.bool,
};

export default EntityForm;
