import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({
  children,
  requireAuth = false,
  guestOnly = false,
}) => {
  const { isLoggedIn, user, isAuthLoaded } = useAuthStore();
  const location = useLocation();

  if (!isAuthLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-300 text-lg">
        Checking session...
      </div>
    );
  }

  if (requireAuth && !isLoggedIn && !user) {
    toast.error("Please login to access this page");
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

 if (isAuthLoaded && guestOnly && isLoggedIn) {
  // just redirect silently, no toast
  return <Navigate to="/jobs" replace />;
}


  return children;
};

export default ProtectedRoute;
