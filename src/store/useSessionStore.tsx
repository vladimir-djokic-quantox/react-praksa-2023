import { create } from 'zustand';
import User from '../types/User';
import UserCart from '../types/UserCart';

type SessionData = {
  isLoggedin: boolean;
  userData: User | null;
  userCart: UserCart | null;
  setIsLoggedin: (value: boolean) => void;
  fetchAuth: (username: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUserCartData: (userId: number) => Promise<void>;
  removeItemFromCart: (productId: number) => void;
  addItemToCart: (id: number) => void;
};

const useSessionStore = create<SessionData>((set, get) => ({
  isLoggedin: window.localStorage.getItem('isLoggedIn') === 'true',
  userData: JSON.parse(window.localStorage.getItem('userData') || 'null'),
  userCart: JSON.parse(window.localStorage.getItem('userCart') || 'null'),
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
  logout: () => {
    set({ isLoggedin: false });
    set({ userData: null });
    window.localStorage.setItem('isLoggedIn', 'false');
    window.localStorage.removeItem('userData');
    window.localStorage.removeItem('userCart');
  },
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
  removeItemFromCart: (id) => {
    const cartId = get().userCart?.id;
    const cartProducts = get().userCart?.products;

    if (cartId && cartProducts) {
      const updatedProducts = cartProducts.filter(
        (product) => product.id !== id
      );

      fetch(`https://dummyjson.com/carts/${cartId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          merge: false,
          products: updatedProducts,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(
              `Failed to update cart: ${res.status} ${res.statusText}`
            );
          }
          return res.json();
        })
        .then(() => {
          set((state) => {
            if (state.userCart) {
              const updatedCart = {
                ...state.userCart,
                products: updatedProducts,
              };
              return { userCart: updatedCart };
            }
            return state;
          });
          window.localStorage.setItem(
            'userCart',
            JSON.stringify({ id: cartId, products: updatedProducts })
          );
        })
        .catch((error) => {
          console.error('Error updating cart:', error);
        });
    }
  },
  addItemToCart: (id) => {
    const cartId = get().userCart?.id;

    if (cartId) {
      fetch(`https://dummyjson.com/carts/${cartId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          merge: true,
          products: [{ id, quantity: 1 }],
        }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(
              `Failed to update cart: ${res.status} ${res.statusText}`
            );
          }
          return res.json();
        })
        .then((data) => {
          console.log('Cart updated successfully:', data);
          set((state) => {
            if (state.userCart) {
              const updatedCart = {
                ...state.userCart,
                products: data.products,
              };
              return { userCart: updatedCart };
            }
            return state;
          });
          window.localStorage.setItem(
            'userCart',
            JSON.stringify({ id: cartId, products: data.products })
          );
        })
        .catch((error) => {
          console.error('Error updating cart:', error);
        });
    }
  },
}));

export default useSessionStore;
