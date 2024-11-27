import PropTypes from "prop-types";
import { useMemo } from "react";

import { Alert, AlertTitle, LinearProgress } from "@mui/material";

import { useNotificationsTranslation } from "translations";

const LoadingError = ({
  "data-testid": dataTestid,
  isLoading,
  error,
  Skeleton,
  Error,
  skeletonProps,
  translationKey = "default",
  children,
}) => {
  const t = useNotificationsTranslation();

  const errorComponent = useMemo(() => {
    const translations = t(translationKey, { returnObjects: true });
    const errorMessage = translations[error?.status] || translations.error;
    return (
      <>
        {Error || (
          <>
            {typeof errorMessage === "object" ? (
              <Alert data-testid={`${dataTestid}-error`} elevation={1} severity="error">
                <AlertTitle>{errorMessage.title}</AlertTitle>
                {errorMessage.description}
                {/* ojo aqui salta el error */}
              </Alert>
            ) : (
              <Alert data-testid={`${dataTestid}-error`} elevation={1} severity="error">
                {errorMessage}
              </Alert>
            )}
          </>
        )}
      </>
    );
  }, [Error, dataTestid, error?.status, t, translationKey]);

  if (isLoading && Skeleton) {
    return <Skeleton data-testid={`${dataTestid}-skeleton`} {...skeletonProps} />;
  } else if (isLoading) {
    return <LinearProgress data-testid={`${dataTestid}-loading`} />;
  } else if (error) {
    return errorComponent;
  } else {
    return children;
  }
};

LoadingError.propTypes = {
  "data-testid": PropTypes.string,
  isLoading: PropTypes.bool,
  error: PropTypes.shape({
    status: PropTypes.any,
  }),
  Skeleton: PropTypes.any,
  Error: PropTypes.any,
  skeletonProps: PropTypes.object,
  translationKey: PropTypes.string,
  children: PropTypes.any,
};

export default LoadingError;
