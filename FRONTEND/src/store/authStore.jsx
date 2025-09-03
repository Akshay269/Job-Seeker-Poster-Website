import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token"),
  isVerified: JSON.parse(localStorage.getItem("user"))?.isVerified || false,

  setAuth: (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    set({
      user,
      token,
      isLoggedIn: true,
      isVerified: user?.isVerified || false,
    });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({
      user: null,
      token: null,
      isLoggedIn: false,
      isVerified: false,
    });
  },
}));

export default useAuthStore;
