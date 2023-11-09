import { create } from 'zustand';
import UserCart from '../types/UserCart';

type CartData = {
  userCart: UserCart | null;
  fetchUserCartData: (userId: number) => Promise<void>;
};

const useCartStore = create<CartData>((set) => ({
  userCart: null,
  usersList: null,
  fetchUserCartData: async (userId) => {
    const response = await fetch(`https://dummyjson.com/carts/user/${userId}`);
    const data = await response.json();
    set({ userCart: data.carts[0] });
  },
}));

export default useCartStore;
