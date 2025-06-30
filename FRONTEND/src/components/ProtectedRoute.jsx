
import { Navigate,useLocation } from "react-router-dom";
import useAuthStore from "../store/authStore";
import {toast} from "react-hot-toast";

const ProtectedRoute = ({ children, role }) => {
  const { isLoggedIn, user } = useAuthStore();
  const location = useLocation();

  if (!isLoggedIn) {
    toast.dismiss();
    toast.error("Please login to access this page");
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (role && user?.role !== role){
     toast.dismiss();
    toast.error("Unauthorized access");
     return <Navigate to="/" replace />;
  }

  return children;
};
export default ProtectedRoute;