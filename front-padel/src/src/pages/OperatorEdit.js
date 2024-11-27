import { Skeleton, Typography } from "@mui/material";

import { useGetMeQuery } from "domain/accounts/apiSlices/usersApiSlice";

import { BreadcrumbsManager } from "modules/common/BreadcrumbsManager";
import { ROUTES } from "modules/app/router";
import LoadingError from "modules/common/loading-error/LoadingError";

import { useUsersCreateEditTranslation } from "translations";

const USER_PASS = "USER_PASS";

const OperatorEdit = () => {
  const t = useUsersCreateEditTranslation();

  const { data: userMe = {}, isLoading, error } = useGetMeQuery({});

  const obData = 1
  const isObLoading = false

  const breadcrumbs = [
    { text: t("breadcrumbsMain"), route: ROUTES.operators },
    { text: t("breadcrumbEdit") },
  ];

  return (
    <>
      <BreadcrumbsManager breadcrumbs={breadcrumbs} />
      <Typography color="text.primary" variant="h1">
        {t("editTitle")}
      </Typography>
    </>
  );
};

export default OperatorEdit;