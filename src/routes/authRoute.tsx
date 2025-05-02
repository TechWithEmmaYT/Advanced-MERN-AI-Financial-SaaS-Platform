import { Outlet } from "react-router-dom";
// import { PROTECTED_ROUTES } from "./common/routePath";

const AuthRoute = () => {
//   const { accessToken, user } = useStore();

//   if (!accessToken && !user) return <Outlet />;

//   return <Navigate to={PROTECTED_ROUTES.EVENT_TYPES} replace />;
  return <Outlet />;
};

export default AuthRoute;