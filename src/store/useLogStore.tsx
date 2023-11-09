import { create } from 'zustand';
import User from '../types/User';

type Login = {
  isLoggedin: boolean;
  userData: User;
  setIsLoggedin: (value: boolean) => void;
  fetchAuth: (username: string, password: string) => Promise<void>;
};

const useLogStore = create<Login>((set) => ({
  isLoggedin: window.localStorage.getItem('isLoggedIn') === 'true',
  userData: JSON.parse(window.localStorage.getItem('userData') || 'null'),
  setIsLoggedin: (value: boolean) => {
    set({ isLoggedin: value });
    window.localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
  },
  fetchAuth: async (username, password) => {
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        set({ userData: data });
        set({ isLoggedin: true });
        window.localStorage.setItem('isLoggedIn', 'true');
        window.localStorage.setItem('userData', JSON.stringify(data));
      } else {
        console.error('Error response:', response.status, response.statusText);
        set({ isLoggedin: false });
        window.localStorage.setItem('isLoggedIn', 'false');
        window.localStorage.removeItem('userData');
      }
    } catch (error) {
      console.error('Error while fetching authentication:', error);
      set({ isLoggedin: false });
      window.localStorage.setItem('isLoggedIn', 'false');
      window.localStorage.removeItem('userData');
    }
  },
}));

export default useLogStore;
