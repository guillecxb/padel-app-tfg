import { useUsersCreateEditTranslation } from "translations";

const useOperatorAdd = () => {
  const t = useUsersCreateEditTranslation();

  const roleOptions = [
    {
      key: "operator",
      value: "operator",
      label: t("operators.operator"),
      disabled: false,
    },
    {
      key: "deploy_operator",
      value: "deploy_operator",
      label: t("operators.deployOperator"),
      disabled: true,
    },
  ];

  return {
    roleOptions,
  };
};

export default useOperatorAdd;
