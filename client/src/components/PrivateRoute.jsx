import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";

function PrivateRoute({ children }) {
  const { currentUser, jwt } = useContext(AuthContext);
  console.log("currenUser", currentUser);
  return currentUser && jwt ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
