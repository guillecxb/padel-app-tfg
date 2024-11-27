import { useCallback } from "react";

import * as Yup from "yup";

import { useValidateCredentialsMutation } from "domain/accounts/apiSlices/usersApiSlice";

import {
  fieldAlreadyTaken,
  fieldMaxLength,
  fieldMinLength,
  fieldRequired,
  LOGIN_MAX_LENGTH,
  LOGIN_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  validationMessage,
} from "modules/common/validation";

import { useUsersCreateEditTranslation, useValidationTranslation } from "translations";

const useUserValidation = ({ entity, isEditMode }) => {
  const t = useUsersCreateEditTranslation();
  const vt = useValidationTranslation();
  const [validateCredentials] = useValidateCredentialsMutation();

  const onValidateCredentials = useCallback(
    async (email) => {
      let data = { valid: false };
      try {
        data = await validateCredentials({ login: email }).unwrap();
      } catch (e) {}

      return data;
    },
    [validateCredentials]
  );

  return Yup.object().shape({
    username: Yup.string()
      .min(
        LOGIN_MIN_LENGTH,
        fieldMinLength(vt, t("fields.username"), {
          count: LOGIN_MIN_LENGTH,
        })
      )
      .max(
        LOGIN_MAX_LENGTH,
        fieldMaxLength(vt, t("fields.username"), {
          count: LOGIN_MAX_LENGTH,
          context: "female",
        })
      )
      .test("checkDuplUsername", fieldAlreadyTaken(vt, t("fields.username")), async (value) => {
        if (value && value.length >= LOGIN_MIN_LENGTH) {
          if (isEditMode && value === entity?.username) {
            return true;
          }

          const { valid } = await onValidateCredentials(value);
          return valid;
        }
        return true;
      })
      .required(fieldRequired(vt, t("fields.username"))),
    password: Yup.string()
      .min(
        PASSWORD_MIN_LENGTH,
        fieldMinLength(vt, t("fields.password"), {
          count: PASSWORD_MIN_LENGTH,
        })
      )
      .max(
        PASSWORD_MAX_LENGTH,
        fieldMaxLength(vt, t("fields.password"), {
          count: PASSWORD_MAX_LENGTH,
          context: "female",
        })
      )
      .matches(PASSWORD_REGEX, validationMessage(t("form.passwordError")))
      .required(fieldRequired(vt, t("fields.password"))),
  });
};

export default useUserValidation;
