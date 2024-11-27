import { useCallback } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  useCreateCredentialsMutation,
  useCreateOperatorMutation,
  useUpdateCredentialsMutation,
  useUpdateOperatorMutation,
  useValidateCredentialsMutation,
} from "domain/accounts/apiSlices/usersApiSlice";
import { getMe } from "domain/accounts/slices/authSlice";

import { ROUTES } from "modules/app/router";

const useOperatorAddActions = () => {
  const navigate = useNavigate();
  const { obId, language } = useSelector(getMe);

  const [createOperator] = useCreateOperatorMutation();
  const [updateOperator] = useUpdateOperatorMutation();
  const [validateCredentials] = useValidateCredentialsMutation();
  const [createCredentials] = useCreateCredentialsMutation();
  const [updateCredentials] = useUpdateCredentialsMutation();

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

  const onCreateOperator = useCallback(
    async (data) => {
      const { username, password } = data;
      const { id: userId } = await createOperator({ payload: { ob_id: obId, language } }).unwrap();

      await createCredentials({
        userId,
        login: username,
        password,
      }).unwrap();
      await updateOperator({ id: userId, fields: { name: username } }).unwrap();
    },
    [createCredentials, createOperator, language, obId, updateOperator]
  );

  const onEditOperator = useCallback(
    async ({ data, id }) => {
      const { role, username, password } = data;
      await updateCredentials({ userId: id, login: username, password }).unwrap();
      await updateOperator({ id, fields: { name: username, role } }).unwrap();
    },
    [updateCredentials, updateOperator]
  );

  const goToOperators = useCallback(() => {
    navigate(ROUTES.operators);
  }, [navigate]);

  return {
    onValidateCredentials,
    onCreateOperator,
    onEditOperator,
    goToOperators,
  };
};

export default useOperatorAddActions;
