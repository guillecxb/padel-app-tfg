import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { getMe } from "domain/accounts/slices/authSlice";
import { ROLES } from "domain/accounts/roles";

import { ROUTES } from "./routerConstants";

export const RedirectWhenLoggedIn = () => {
  const userMe = useSelector(getMe);

  return !!userMe.role && Object.values(ROLES).includes(userMe.role) ? (
    <Navigate replace to={ROUTES.home} />
  ) : (
    <Outlet />
  );
};

RedirectWhenLoggedIn.propTypes = {};
