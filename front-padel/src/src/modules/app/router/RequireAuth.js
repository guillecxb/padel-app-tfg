import PropTypes from "prop-types";
import { useEffect, useMemo } from "react";

import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { LinearProgress } from "@mui/material";

import { ROLES } from "domain/accounts/roles";
import { useGetMeQuery } from "domain/accounts/apiSlices/usersApiSlice";
import { logOut } from "domain/accounts/slices/authSlice";

import { ROUTES } from "./routerConstants";

export const RequireAuth = ({ roles = [] }) => {
  const { data: userMe, isLoading, isError } = useGetMeQuery();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = useMemo(() => !isLoading && userMe?.role, [isLoading, userMe?.role]);

  useEffect(() => {
    if (isError || (role && !Object.values(ROLES).includes(role))) {
      dispatch(logOut());
      navigate(ROUTES.login);
    }
  }, [dispatch, isError, navigate, role]);

  if (isLoading) {
    return <LinearProgress />;
  }

  if (roles.includes(role)) {
    return <Outlet />;
  } else {
    return <Navigate replace state={{ from: location }} to={ROUTES.home} />;
  }
};

RequireAuth.propTypes = {
  roles: PropTypes.array,
};
