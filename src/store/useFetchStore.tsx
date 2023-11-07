import create from 'zustand';
import Product from '../types/Product';
import User from '../types/User';

type ProductData = {
  productsList: Product[];
  usersList: User[];
  totalProducts: number;
  pageSize: number;
  fetchProducts: (page: number) => Promise<void>;
  fetchUsers: () => Promise<void>;
};

const useFetchStore = create<ProductData>((set, get) => ({
  productsList: [],
  usersList: [],
  totalProducts: 0,
  pageSize: 28,
  fetchProducts: async (page) => {
    const skip = (page - 1) * get().pageSize;
    const response = await fetch(
      `https://dummyjson.com/products?limit=${get().pageSize}&skip=${skip}`
    );
    const data = await response.json();
    set({ productsList: data?.products, totalProducts: data?.total });
  },

  fetchUsers: async () => {
    const response = await fetch('https://dummyjson.com/users');
    const data = await response.json();
    set({ usersList: data?.users });
  },
}));

export default useFetchStore;
