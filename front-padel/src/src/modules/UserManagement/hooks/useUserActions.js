import { useCallback } from "react";

import { generatePath, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  useCreateCredentialsMutation,
  useCreateUserMutation,
  useUpdateCredentialsMutation,
  useUpdateUserMutation,
} from "domain/accounts/apiSlices/usersApiSlice";
import { getMe } from "domain/accounts/slices/authSlice";
import { ROLES } from "domain/accounts/roles";

import { ROUTES } from "modules/app/router";

const useUserActions = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { obId, language, role, customerId: currentCustomerId } = useSelector(getMe);

  const [createCredentials] = useCreateCredentialsMutation();
  const [updateCredentials] = useUpdateCredentialsMutation();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const onCreateCustomer = useCallback(
    async ({ username, password }) => {
      const { id: userId } = await createUser({
        ob_id: obId,
        language,
        customer_id: customerId || currentCustomerId,
      }).unwrap();

      await createCredentials({
        userId,
        login: username,
        password,
      });
      await updateUser({ id: userId, body: { name: username } }).unwrap();
    },
    [createCredentials, createUser, currentCustomerId, customerId, language, obId, updateUser]
  );

  const onEditCustomer = useCallback(
    async ({ id, body: { username, password } }) => {
      await updateCredentials({ userId: id, login: username, password }).unwrap();
      await updateUser({ id, body: { name: username } }).unwrap();
    },
    [updateCredentials, updateUser]
  );

  const onGenerateLink = useCallback(async () => {
    const user = await createUser({
      ob_id: obId,
      language,
      customer_id: customerId || currentCustomerId,
    }).unwrap();

    return user.id;
  }, [createUser, currentCustomerId, customerId, language, obId]);

  const onUpdateLink = async (userId) => {
  };

  const goToUsers = useCallback(() => {
    const backRoute = role === ROLES.OPERATOR ? ROUTES.asCustomerUsers : ROUTES.users;
    const path = generatePath(backRoute, { customerId });
    navigate(path);
  }, [customerId, navigate, role]);

  const getLink = (token) =>
    window.location.protocol + "//" + window.location.host + "/sign-up?token=" + token;

  return {
    onCreateCustomer,
    onEditCustomer,
    onGenerateLink,
    onUpdateLink,
    goToUsers,
    getLink,
  };
};

export default useUserActions;
