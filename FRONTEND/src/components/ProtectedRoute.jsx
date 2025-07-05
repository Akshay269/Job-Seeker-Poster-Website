import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";



const ProtectedRoute = ({ children, requireAuth = false, guestOnly = false, role = null }) => {
  const { isLoggedIn, user } = useAuthStore();
  const location = useLocation();

  // Require login
  if (requireAuth && !isLoggedIn) {
    toast.error("Please login to access this page");
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  // Guest-only page (e.g., /signin, /signup)
  if (guestOnly && isLoggedIn) {
    toast.error("You are already logged in. Please logout first.");
    return <Navigate to="/" replace />;
  }

  // Role check
  if (role && user?.role !== role) {
    toast.error("Unauthorized access");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
