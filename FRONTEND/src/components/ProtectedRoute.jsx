import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { toast } from "react-hot-toast";
import {useLoading} from "../context/LoadingContext";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";



const ProtectedRoute = ({ children, requireAuth = false, guestOnly = false, role = null }) => {
  const {setIsLoading} = useLoading();
  const { isLoggedIn, user,isInitialized } = useAuthStore();
  const location = useLocation();

   useEffect(() => {
    // Show loading until auth state is initialized
    setIsLoading(!isInitialized);
  }, [isInitialized, setIsLoading]);

  if (!isInitialized) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <Loader2Icon className="w-10 h-10 animate-spin text-white" />
      </div>
    );
  }
  
  // Require login
  if (requireAuth && !isLoggedIn && user==null) {
    toast.error("Please login to access this page");
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  // Guest-only page 
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
