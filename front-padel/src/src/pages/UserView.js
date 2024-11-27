import { useMemo } from "react";

import { generatePath, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Typography } from "@mui/material";

import { useGetUserByIdQuery } from "domain/accounts/apiSlices/usersApiSlice";
import { getCustomerId } from "domain/accounts/slices/customerIdSlice";

import { ROUTES } from "modules/app/router";
import { BreadcrumbsManager } from "modules/common/BreadcrumbsManager";
import ViewUserForm from "modules/UserManagement/ViewUserForm";

import { useUsersCreateEditTranslation } from "translations";

const UserView = () => {
  const { userId } = useParams();
  const customerId = useSelector(getCustomerId);
  const t = useUsersCreateEditTranslation();

  const { data } = useGetUserByIdQuery({ id: userId }, { skip: !userId });

  const breadcrumbs = useMemo(() => {
    return [
      {
        text: t("breadcrumbsMain"),
        route: generatePath(ROUTES.asCustomerUsers, { customerId }),
      },
      { text: t("breadcrumbView") },
    ];
  }, [customerId, t]);

  return (
    <>
      <BreadcrumbsManager breadcrumbs={breadcrumbs} />
      <Typography color="text.primary" variant="h1">
        {t("customer.viewUser")}
      </Typography>
      {!!data?.id && <ViewUserForm id={userId} user={data} />}
    </>
  );
};

export default UserView;
