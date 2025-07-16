import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  isVerified: false,

  // Load from localStorage (call once on app load)
  initializeAuth: () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');

    set({
      user: storedUser || null,
      token: storedToken || null,
      isLoggedIn: !!storedToken,
      isVerified: storedUser?.isVerified || false,
    });
  },

  setAuth: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({
      user,
      token,
      isLoggedIn: true,
      isVerified: user?.isVerified || false,
    });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      isLoggedIn: false,
      isVerified: false,
    });
  },
}));

export default useAuthStore;
