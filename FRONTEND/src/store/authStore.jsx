import { create } from 'zustand';

const SESSION_TIMEOUT = 6 * 60 * 60 * 1000; 

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  isVerified: false,
  isInitialized: false,

  // Load from localStorage 
  initializeAuth: () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('token');
    const loginTime = parseInt(localStorage.getItem('loginTime'), 10);

    const isExpired = loginTime && Date.now() - loginTime > SESSION_TIMEOUT;

    if (isExpired) {
      // Session expired
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('loginTime');
      set({
        user: null,
        token: null,
        isLoggedIn: false,
        isVerified: false,
        isInitialized: true,
      });
    } else {
      set({
        user: storedUser || null,
        token: storedToken || null,
        isLoggedIn: !!storedToken,
        isVerified: storedUser?.isVerified || false,
        isInitialized: true,
      });
    }
  },

  setAuth: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('loginTime', Date.now().toString()); 
    set({
      user,
      token,
      isLoggedIn: true,
      isVerified: user?.isVerified || false,
      isInitialized: true,
    });
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    set({
      user: null,
      token: null,
      isLoggedIn: false,
      isVerified: false,
      isInitialized: true,
    });
  },
}));

export default useAuthStore;
