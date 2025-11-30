import { Navigate } from "react-router-dom";

function ProtectedPage({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <div>{children}</div>;
}

export default ProtectedPage;
