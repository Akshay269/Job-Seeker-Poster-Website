import { create } from "zustand";

const useAuthStore = create((set) => ({
  user:  null,
  accessToken:  null,
  isLoggedIn: false,
  isVerified: false,
  isAuthLoaded: false,

  setAuth: (user, token) => {
    set({
      user,
      accessToken:token,
      isLoggedIn: true,
      isVerified: user?.isVerified || false,
      isAuthLoaded: true
    });
  },

  setAuthLoaded:()=>set({isAuthLoaded:true}),

  logout: () => {
    set({
      user: null,
      accessToken: null,
      isLoggedIn: false,
      isVerified: false,
    });
  },
}));

export default useAuthStore;
