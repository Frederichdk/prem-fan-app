import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) return null;
  if (!isAuthenticated) return null;

  return children;
};

export default ProtectedRoute;
