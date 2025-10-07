import { useEffect } from "react";
import API from "../api/axios";
import useAuthStore from "../store/authStore";

const useAuthInit = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const setAuthLoaded = useAuthStore((state) => state.setAuthLoaded);
  const isAuthLoaded = useAuthStore((state) => state.isAuthLoaded);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const { data } = await API.get("/auth/refresh-token", {
          withCredentials: true, // send cookie
        });
        setAuth(data.user, data.accessToken); // optional if backend sends user
      } catch (err) {
        console.log(err);
        setAuthLoaded();
      }
    };

    refreshToken();
  }, []);
  if (!isAuthLoaded) return <div>Loading...</div>;
};

export default useAuthInit;
