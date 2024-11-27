import PropTypes from "prop-types";

import { Outlet } from "react-router-dom";

import { useGetMeQuery } from "domain/accounts/apiSlices/usersApiSlice";

import PrivateLayout from "./layouts/PrivateLayout";
import Footer from "./layouts/Footer";

export const RouterLayout = () => {
  const { data: userMe, isLoading, error } = useGetMeQuery();

  return (
    <>
      {!isLoading && !error && !!userMe.role ? (
        <PrivateLayout name={userMe.name} role={userMe.role}>
          <Outlet />
        </PrivateLayout>
      ) : (
        <Outlet />
      )}
      <Footer />
    </>
  );
};

RouterLayout.propTypes = {
  role: PropTypes.string,
};
