import PropTypes from "prop-types";

import { SnackbarProvider as MUISnackBarProvider } from "notistack";

const SnackbarProvider = ({ children }) => {
  return (
    <MUISnackBarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      autoHideDuration={3000}
      domRoot={document.querySelector("snackbar-dom-id")}
    >
      {children}
    </MUISnackBarProvider>
  );
};

SnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SnackbarProvider;
