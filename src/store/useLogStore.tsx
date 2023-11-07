import { create } from 'zustand';

type Login = {
  isLoggedin: boolean;
  setIsLoggedin: (value: boolean) => void;
};

const useLogStore = create<Login>((set) => ({
  isLoggedin: window.localStorage.getItem('isLoggedIn') === 'true',
  setIsLoggedin: (value: boolean) => {
    set({ isLoggedin: value });
    window.localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
  },
}));

export default useLogStore;
