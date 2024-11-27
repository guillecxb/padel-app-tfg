import { useSnackbar } from "notistack";

import { Alert, AlertTitle, IconButton } from "@mui/material";

import { SUCCESS_ALERT } from "modules/enumerations";

import MuisticaIcon from "components/atoms/muistica-icon/MuisticaIcon";

export const useEnqueueSnackbar = () => {
  const snackbar = useSnackbar();

  return (message, options) => {
    const { alertTitle, action, ...rest } = options;

    snackbar.enqueueSnackbar(message, {
      ...rest,
      content: (_key, message) => (
        <Alert
          action={
            action ? (
              <IconButton
                aria-label="close"
                /* eslint-disable-next-line react/jsx-no-bind */
                onClick={() => {
                  snackbar.closeSnackbar(_key);
                }}
                size="small"
                variant="transparent"
              >
                <MuisticaIcon fontSize="medium">close</MuisticaIcon>
              </IconButton>
            ) : undefined
          }
          data-testid={options.data}
          elevation={1}
          severity={options.variant || SUCCESS_ALERT}
        >
          {alertTitle && <AlertTitle>{alertTitle}</AlertTitle>}
          {message}
        </Alert>
      ),
    });
  };
};
