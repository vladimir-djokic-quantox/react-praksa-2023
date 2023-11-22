import create from 'zustand';
import Product from '../types/Product';

type ProductData = {
  productsList: Product[];
  productDetails: Product | null;
  totalProducts: number;
  pageSize: number;
  fetchProducts: (page: number, query: string) => Promise<void>;
  fetchProductCategory: (category: string) => Promise<void>;
  fetchProductDetails: (id: number) => Promise<void>;
};

const useFetchStore = create<ProductData>((set, get) => ({
  productsList: [],
  productDetails: null,
  totalProducts: 0,
  pageSize: 28,
  fetchProducts: async (page, query?) => {
    const skip = (page - 1) * get().pageSize;

    const response = await fetch(
      query
        ? `https://dummyjson.com/products/search?q=${query}`
        : `https://dummyjson.com/products?limit=${get().pageSize}&skip=${skip}`
    );

    const data = await response.json();
    set({ productsList: data?.products, totalProducts: data?.total });
  },

  fetchProductCategory: async (category) => {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await response.json();
    set({ productsList: data?.products });
  },
  fetchProductDetails: async (id) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    set({ productDetails: data });
  },
}));

export default useFetchStore;
