import { create } from 'zustand';

type Login = {
  isLoggedin: boolean;
  setIsLoggedin: (value: boolean) => void;
  fetchAuth: (username: string, password: string) => Promise<void>;
};

const useLogStore = create<Login>((set) => ({
  isLoggedin: window.localStorage.getItem('isLoggedIn') === 'true',
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

      if (response.ok) {
        set({ isLoggedin: true });
        window.localStorage.setItem('isLoggedIn', 'true');
      } else {
        console.error('Error response:', response.status, response.statusText);
        set({ isLoggedin: false });
        window.localStorage.setItem('isLoggedIn', 'false');
      }
    } catch (error) {
      console.error('Error while fetching authentication:', error);
      set({ isLoggedin: false });
      window.localStorage.setItem('isLoggedIn', 'false');
    }
  },
}));

export default useLogStore;
