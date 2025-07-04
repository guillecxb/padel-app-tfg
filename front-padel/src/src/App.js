/* eslint-disable react/no-multi-comp */
import { useMemo, lazy, Suspense } from "react";

import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { LinearProgress } from "@mui/material";

import { getMe } from "domain/accounts/slices/authSlice";

import { RouterLayout, RequireAuth, ROUTES } from "modules/app/router";
import { RedirectWhenLoggedIn } from "modules/app/router/RedirectWhenLoggedIn";
import { AsCustomerLayout } from "modules/app/router/AsCustomerLayout";
import { Reviews } from "@mui/icons-material";

const Login = lazy(() => import("pages/Login"));
const CustomerDashboard = lazy(() => import("pages/CustomerDashboard"));
const OperatorCustomerAdd = lazy(() => import("pages/OperatorCustomerAdd"));
const OperatorAdd = lazy(() => import("pages/OperatorAdd"));
const OperatorDashboard = lazy(() => import("pages/OperatorDashboard"));
const Operators = lazy(() => import("pages/Operators"));
const Users = lazy(() => import("pages/Users"));
const OperatorEdit = lazy(() => import("pages/OperatorEdit"));
const OperatorView = lazy(() => import("pages/OperatorView"));
const OperatorAddCustomer = lazy(() => import("pages/UserAdd"));

const OperatorAddUser = lazy(() => import("pages/UserAdd"));
const OperatorEditCustomer = lazy(() => import("pages/UserEdit"));
const OperatorViewCustomer = lazy(() => import("pages/UserView"));
const Faqs = lazy(() => import("pages/Faqs"));
const Coaching = lazy(() => import("pages/Coaching"));
const News = lazy(() => import("pages/News"));
const MembersArea = lazy(() => import("pages/MembersArea"));
// const Store = lazy(() => import("pages/Store"));
const AboutUs = lazy(() => import("pages/AboutUs"));
const Booking = lazy(() => import("pages/Booking"));
const OperatorEditUser = lazy(() => import("pages/UserEdit"));
const ReservationsCustomer = lazy(() => import("pages/CustomersReservations"));
const OperatorBooking = lazy(() => import("pages/OperatorBooking"));
const CustomerDashboardForOperator = lazy(() => import("pages/CustomerDashboardForOperator"));
const CreateReview = lazy(() => import("pages/Review"));



// PUNTO DE ENTRADA DE LA APLICACIÓN
const App = () => {
  // useSelector es un hook de react-redux que se utiliza para seleccionar datos del store de Redux. En este caso, se selecciona el usuario actual.
  const { role } = useSelector(getMe); // obtiene el rol del usuario actual, customer u operator

  // Se utiliza para memorizar el componente Home que se renderizará en función del rol del usuario.
  const Home = useMemo(() => {
    // useMemo es un hook de React que memoriza el valor calculado de una expresión y lo recalcula solo si role ha cambiado.
    const homes = {
      operator: OperatorDashboard,
      customer: CustomerDashboard,
    };
    return homes[role];
  }, [role]);

  // Define la función withSuspensor que recibe un componente y devuelve un componente con un Suspense que muestra un LinearProgress mientras se carga el componente.
  const withSuspensor = (comp) => <Suspense fallback={<LinearProgress />}>{comp}</Suspense>;

  return (
    // Define las rutas de la aplicación y sus componentes asociados.
    <Routes>
      {/* Route define una ruta específica. Element es el componente que se rendereiza cuando el path URL coincide. */}
      <Route element={withSuspensor(<RouterLayout />)} path={ROUTES.home}>
        {" "}
        {/* ROUTES.home -> "/". Cuando la URL coincide con el path especificado, el componente Route renderiza el elemento que se le pasa a través de la prop element. */}
        {/* public */}
        <Route element={<RedirectWhenLoggedIn />}>
          <Route element={withSuspensor(<Login />)} path={ROUTES.login} />
        </Route>
        {/* homes */}
        <Route element={<RequireAuth roles={["customer", "operator"]} />}>
          <Route element={withSuspensor(!!Home && <Home />)} path={ROUTES.home} />
        </Route>
        {/* customer */}
        <Route element={<RequireAuth roles={["customer"]} />}>
          <Route element={withSuspensor(<Faqs />)} path={ROUTES.faqs} />
          <Route element={withSuspensor(<Coaching />)} path={ROUTES.coaching} />
          <Route element={withSuspensor(<News />)} path={ROUTES.news} />
          {/* <Route element={withSuspensor(<Store />)} path={ROUTES.store} /> */}
          <Route element={withSuspensor(<MembersArea />)} path={ROUTES.membersArea} />
          <Route element={withSuspensor(<AboutUs />)} path={ROUTES.aboutUs} />
          <Route element={withSuspensor(<Booking />)} path={ROUTES.booking} />
          <Route element={withSuspensor(<CreateReview />)} path={ROUTES.review} />
        </Route>
        {/* operator */}
        <Route element={<RequireAuth roles={["operator"]} />}>
          <Route
            element={withSuspensor(<OperatorCustomerAdd />)}
            path={ROUTES.operatorCustomerAdd}
          />
          <Route element={withSuspensor(<Operators />)} path={ROUTES.operators} />
          <Route element={withSuspensor(<OperatorAdd />)} path={ROUTES.operatorsAdd} />
          <Route element={withSuspensor(<OperatorEdit />)} path={ROUTES.operatorsEdit} />
          <Route element={withSuspensor(<OperatorView />)} path={ROUTES.operatorsView} />
          <Route element={withSuspensor(<Users />)} path={ROUTES.users} />
          <Route element={withSuspensor(<OperatorAddCustomer />)} path={ROUTES.asCustomerUserAdd} />
          <Route element={withSuspensor(<OperatorAddUser />)} path={ROUTES.usersAdd} />
          <Route element={withSuspensor(<OperatorEditCustomer />)} path={ROUTES.usersEdit} />
        </Route>
        {/* Operator as Customer */}
        <Route element={<RequireAuth roles={["operator"]} />}>
          <Route element={<AsCustomerLayout />}>
            <Route element={withSuspensor(<CustomerDashboardForOperator />)} path={ROUTES.asCustomerHome} />
            <Route element={withSuspensor(<Faqs />)} path={ROUTES.asCustomerFaqs} />
            <Route element={withSuspensor(<Coaching />)} path={ROUTES.asCustomerCoaching} />
            <Route element={withSuspensor(<News />)} path={ROUTES.asCustomerNews} />
            {/* <Route element={withSuspensor(<Store />)} path={ROUTES.asCustomerStore} /> */}
            <Route element={withSuspensor(<MembersArea />)} path={ROUTES.asCustomerMembersArea} />
            <Route element={withSuspensor(<AboutUs />)} path={ROUTES.asCustomerAboutUs} />
            <Route element={withSuspensor(<ReservationsCustomer />)} path={ROUTES.asCustomerBooking} />
            <Route element={withSuspensor(<OperatorBooking />)} path={ROUTES.asCustomerCreateBooking} />
          </Route>
        </Route>
        {/* redirect everything else to home */}
        <Route element={<RequireAuth roles={["-"]} />}>
          <Route element={<></>} path={ROUTES.rest} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
