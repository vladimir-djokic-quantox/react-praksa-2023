import { create } from 'zustand';

type Login = {
  isLoggedin: boolean;
  setIsLoggedin: () => void;
};

const useLogStore = create<Login>((set) => ({
  isLoggedin: false,
  setIsLoggedin: () => set({ isLoggedin: true }),
}));

export default useLogStore;
