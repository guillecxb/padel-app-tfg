import { PropTypes } from "prop-types";
import { Suspense } from "react";

import { ErrorBoundary as ReactError } from "react-error-boundary";

import { LinearProgress } from "@mui/material";

import FallbackError from "./FallbackError";

const ErrorBoundary = ({ children }) => {
  return (
    <ReactError FallbackComponent={FallbackError}>
      <Suspense fallback={<LinearProgress />}>{children}</Suspense>
    </ReactError>
  );
};

export default ErrorBoundary;

ErrorBoundary.propTypes = {
  children: PropTypes.any,
};
