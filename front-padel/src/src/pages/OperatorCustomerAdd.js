import { Typography } from "@mui/material";

import { ROUTES } from "modules/app/router";
import { BreadcrumbsManager } from "modules/common/BreadcrumbsManager";
import CustomerAddForm from "modules/OperatorCustomer/CustomerAddForm";

import { useOperatorCustomerTranslation } from "translations";

const OperatorCustomerAdd = () => {
  const t = useOperatorCustomerTranslation();

  const breadcrumbs = [
    { text: t("breadcrumbsMain"), route: ROUTES.operators },
    { text: t("breadcrumbView") },
  ];

  return (
    <>
      <BreadcrumbsManager breadcrumbs={breadcrumbs} />
      <Typography color="text.primary" mb={4} variant="h1">
        {t("breadcrumbView")}
      </Typography>
      <CustomerAddForm />
    </>
  );
};

export default OperatorCustomerAdd;
