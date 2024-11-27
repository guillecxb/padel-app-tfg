import { useParams } from "react-router-dom";

import { Typography } from "@mui/material";


import { ROUTES } from "modules/app/router";
import { BreadcrumbsManager } from "modules/common/BreadcrumbsManager";
import ViewOperator from "modules/OperatorManagement/ViewOperator";

import { useUsersCreateEditTranslation } from "translations";

const OperatorView = () => {
  const { id } = useParams();
  const t = useUsersCreateEditTranslation();

  const data = "yes";

  const breadcrumbs = [
    { text: t("breadcrumbsMain"), route: ROUTES.operators },
    { text: t("breadcrumbView") },
  ];

  return (
    <>
      <BreadcrumbsManager breadcrumbs={breadcrumbs} />
      <Typography color="text.primary" variant="h1">
        {t("breadcrumbView")}
      </Typography>
      {!!data?.id && <ViewOperator id={id} operator={data} />}
    </>
  );
};

export default OperatorView;
