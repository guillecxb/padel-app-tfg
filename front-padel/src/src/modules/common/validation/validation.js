export const validationMessage = (message) => {
  return `${message}`;
};

export const getValidator = (ct, validation, fieldName, options) => {
  return () =>
    validationMessage(
      ct(validation, {
        field: fieldName,
        ...options,
      })
    );
};

export const fieldRequired = (ct, fieldName, options) => {
  return getValidator(ct, "validations.field-required", fieldName, options);
};

export const fieldAlreadyTaken = (ct, fieldName, options) => {
  return getValidator(ct, "validations.field-already-taken", fieldName, options);
};

export const fieldInvalid = (ct, fieldName, options) => {
  return getValidator(ct, "validations.field-invalid", fieldName, options);
};

export const fieldEmailInvalid = (ct, fieldName, options) => {
  return getValidator(ct, "validations.field-email-invalid", fieldName, options);
};

export const fieldMaxLength = (ct, fieldName, options) => {
  return getValidator(ct, "validations.field-max-length", fieldName, options);
};

export const fieldMinLength = (ct, fieldName, options) => {
  return getValidator(ct, "validations.field-min-length", fieldName, options);
};

export const fieldIntegerGreaterThan = (ct, fieldName, options) => {
  return getValidator(ct, "validations.field-integer-greater-than", fieldName, options);
};
