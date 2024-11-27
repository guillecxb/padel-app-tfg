import { Typography } from "@mui/material";

import { useGetMeQuery } from "domain/accounts/apiSlices/usersApiSlice";

import { BreadcrumbsManager } from "modules/common/BreadcrumbsManager";
import { ROUTES } from "modules/app/router";

import { useUsersCreateEditTranslation } from "translations";

const USER_PASS = "USER_PASS";

const OperatorAddUser = () => {
  const t = useUsersCreateEditTranslation();

  const { data: userMe = {}, isLoading, error } = useGetMeQuery({});

  const obData = 1

  const breadcrumbs = [
    { text: t("breadcrumbsMain"), route: ROUTES.operators },
    { text: t("breadcrumbNew") },
  ];

  return (
    <>
      <BreadcrumbsManager breadcrumbs={breadcrumbs} />
      <Typography color="text.primary" variant="h1">
        {t("title")}
      </Typography>
    </>
  );
};

export default OperatorAddUser;
