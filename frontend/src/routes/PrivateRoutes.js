import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = (props) => {
  return props.user ? <Outlet /> : <Navigate to="/unauthorized" />;
};

export default PrivateRoutes;
