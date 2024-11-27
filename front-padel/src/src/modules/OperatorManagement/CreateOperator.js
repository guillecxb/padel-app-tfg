import { useMemo } from "react";

import OperatorUserPassForm from "./OperatorUserPassForm";

const CreateOperator = () => {
  const entity = useMemo(() => {
    return {
      username: "",
      password: "",
      role: "",
    };
  }, []);

  return <OperatorUserPassForm entity={entity} />;
};

export default CreateOperator;
