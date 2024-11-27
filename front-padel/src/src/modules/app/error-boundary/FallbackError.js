import { PropTypes } from "prop-types";

import AlertFull from "modules/common/modals/AlertFull";

const FallbackError = ({ error, resetErrorBoundary }) => {
  return (
    <AlertFull
      action={resetErrorBoundary}
      actionText="Reload"
      description="The page couldn't be loaded due to an unexpected error, please try reloading it again. If the error persists contact our support team."
      icon="warning"
      iconProps={{ color: "error" }}
      isOpen={true}
      pre={error.message}
      title="Unexpected error"
    />
  );
};

export default FallbackError;

FallbackError.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  resetErrorBoundary: PropTypes.func,
};
