import { create } from "zustand";

const useAuthStore = create((set) => ({
  user:  null,
  token:  null,
  isLoggedIn: false,
  isVerified: false,

  setAuth: (user, token) => {
    set({
      user,
      token,
      isLoggedIn: true,
      isVerified: user?.isVerified || false,
    });
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isLoggedIn: false,
      isVerified: false,
    });
  },
}));

export default useAuthStore;
