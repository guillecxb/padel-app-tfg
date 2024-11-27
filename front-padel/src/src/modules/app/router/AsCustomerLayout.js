import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

import { setCustomerId } from "domain/accounts/slices/customerIdSlice";

import CustomerLayout from "./layouts/CustomerLayout";

export const AsCustomerLayout = () => {
  const { customerId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCustomerId({ customerId }));
  }, [dispatch, customerId]);

  return (
    <CustomerLayout>
      <Outlet />
    </CustomerLayout>
  );
};

AsCustomerLayout.propTypes = {};
