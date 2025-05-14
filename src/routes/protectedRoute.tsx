import { Outlet } from "react-router-dom";
import { useTypedSelector } from "@/app/hook";
import { Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { accessToken } = useTypedSelector((state) => state.auth);

  if (!accessToken) return <Outlet />;

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;