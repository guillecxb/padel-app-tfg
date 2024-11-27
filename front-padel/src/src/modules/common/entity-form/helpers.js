export const getDataTestids = (dataTestidPrefix) => {
  const id = (suffix) => `${dataTestidPrefix}${suffix ? `-${suffix}` : ""}`;
  return {
    successNotification: id("success-notification"),
    errorNotification: id("error-notification"),
    form: id(),
    loading: id("loading"),
    submitButton: id("submit-button"),
    error: id("error"),
    alert: id("alert-error"),
    info: id("info"),
  };
};
