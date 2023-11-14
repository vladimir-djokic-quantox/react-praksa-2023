import { create } from 'zustand';
import UserCart from '../types/UserCart';

type CartData = {
  userCart: UserCart | null;
  fetchUserCartData: (userId: number) => Promise<void>;
};

const useCartStore = create<CartData>((set) => ({
  userCart: JSON.parse(window.localStorage.getItem('userCart') || 'null'),
  fetchUserCartData: async (userId) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/carts/user/${userId}`
      );
      const data = await response.json();

      if (response.ok && data.carts.length > 0) {
        set({ userCart: data.carts[0] });
        window.localStorage.setItem('userCart', JSON.stringify(data.carts[0]));
      } else {
        console.error('Error response:', response.status, response.statusText);
        set({ userCart: null });
        window.localStorage.removeItem('userCart');
      }
    } catch (error) {
      console.error('Error while fetching user cart data:', error);
      set({ userCart: null });
      window.localStorage.removeItem('userCart');
    }
  },
}));

export default useCartStore;
