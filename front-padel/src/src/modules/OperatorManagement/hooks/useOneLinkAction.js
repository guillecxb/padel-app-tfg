import { useCallback } from "react";

import { useSelector } from "react-redux";


import { getMe } from "domain/accounts/slices/authSlice";

const useOneLinkAction = () => {
  const { obId, language } = useSelector(getMe);

  const onGenerateLink = useCallback(
    async ({ role }) => {
      return operator.id;
    },
    [ language, obId]
  );

  const onUpdateLink = async (operatorId) => {
    return await createOneTimeLink({
      user_id: operatorId,
    }).unwrap();
  };

  const getLink = (token) =>
    window.location.protocol + "//" + window.location.host + "/sign-up?token=" + token;

  return {
    onGenerateLink,
    onUpdateLink,
    getLink,
  };
};

export default useOneLinkAction;
