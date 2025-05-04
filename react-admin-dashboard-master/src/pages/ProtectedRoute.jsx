import { Navigate } from "react-router-dom";

function ProtectedRoute({ allowedRoles, userRole, children }) {
    console.log(userRole)

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/not-authorized" replace />;
  }
  return children;
}
export default ProtectedRoute;