import { create } from "zustand";
import API from "../api/axios";

const useAuthStore = create((set, get) => ({
  user: null,
  accessToken: null,
  isLoggedIn: false,
  isVerified: false,
  isAuthLoaded: false, // renamed from loading for clarity

  // ✅ Called when login or refresh succeeds
  setAuth: (user, token) => {
    set({
      user,
      accessToken: token,
      isLoggedIn: true,
      isVerified: user?.isVerified || false,
      isAuthLoaded: true,
    });
  },

  // ✅ For marking auth check complete even if no user
  setAuthLoaded: () => set({ isAuthLoaded: true }),

  // ✅ Clears user on logout
  logout: async () => {
    try {
      await API.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    }
    set({
      user: null,
      accessToken: null,
      isLoggedIn: false,
      isVerified: false,
      isAuthLoaded: true,
    });
  },

  // ✅ On app load: restore session using refresh + /me
  initAuth: async () => {
    try {
      // 1️⃣ Try refresh (refresh cookie auto-sent)
      const refreshRes = await API.post("/auth/refresh", {}, { withCredentials: true });
      const { accessToken } = refreshRes.data;

      if (accessToken) {
        // 2️⃣ Fetch user info with new accessToken
        const meRes = await API.get("/auth/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const user = meRes.data.user;
        get().setAuth(user, accessToken);
      } else {
        set({ isAuthLoaded: true });
      }
    } catch (err) {
      console.log("initAuth error:", err.response?.data || err.message);
      set({ isAuthLoaded: true });
    }
  },
}));

export default useAuthStore;
