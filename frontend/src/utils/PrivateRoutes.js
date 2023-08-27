import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const PrivateRoutes = () => {
  let { user } = useContext(AuthContext);

  // if token becomes true, the outlet will be processed, in this case, homepage will be accessible
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
