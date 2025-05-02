import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
//   const { accessToken } = useStore();

//   if (accessToken) return <Outlet />;

//   return <Navigate to="/" replace />;
  return <Outlet />;
};

export default ProtectedRoute;