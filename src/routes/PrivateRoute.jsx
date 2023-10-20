import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const PrivateRoute = () => {
  const {user} = useAuth();

  console.log("User is ", user);

  return user ? <>
 
  <Outlet /> 
  </>: <Navigate to={"/login"} />;
};

export default PrivateRoute;
