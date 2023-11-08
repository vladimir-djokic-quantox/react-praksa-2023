import { create } from 'zustand';
import UserCart from '../types/UserCart';

type CartData = {
  userCart: UserCart | null;
  fetchUserCartData: () => Promise<void>;
};

const useCartStore = create<CartData>((set) => ({
  userCart: null,
  fetchUserCartData: async () => {
    const response = await fetch('https://dummyjson.com/carts/user/5');
    const data = await response.json();
    set({ userCart: data.carts[0] });
  },
}));

export default useCartStore;
