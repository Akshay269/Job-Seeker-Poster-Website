import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token'),

  setAuth: (user, token) =>{
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({
      user,
      token,
      isLoggedIn: true,
    });
  },

  logout: () =>{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      isLoggedIn: false,
    });
  },

}));

export default useAuthStore;
