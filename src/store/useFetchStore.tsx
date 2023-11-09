import create from 'zustand';
import Product from '../types/Product';

type ProductData = {
  productsList: Product[];
  totalProducts: number;
  pageSize: number;
  fetchProducts: (page: number) => Promise<void>;
};

const useFetchStore = create<ProductData>((set, get) => ({
  productsList: [],
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
}));

export default useFetchStore;
