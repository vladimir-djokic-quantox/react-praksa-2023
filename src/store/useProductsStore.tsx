import create from 'zustand';
import Product from '../types/Product';

const PAGE_SIZE = 28;

type GetProductsOptions = {
  currentPage?: number;
  query?: string;
  category?: string;
  productName?: string;
};
type ProductData = {
  productsList: Product[];
  totalProducts: number;
  getProducts: (options?: GetProductsOptions) => Promise<void>;
};

const useProductsStore = create<ProductData>((set) => ({
  productsList: [],
  totalProducts: 0,
  getProducts: async (options?: GetProductsOptions) => {
    const page = options?.currentPage ?? 1;
    const query = options?.query ?? '';
    const category = options?.category ?? '';
    const productName = options?.productName ?? '';
    const skip = (page - 1) * PAGE_SIZE;

    const fetchUrl = () => {
      if (category) {
        return `https://dummyjson.com/products/category/${category}`;
      }

      if (productName || query) {
        return `https://dummyjson.com/products/search?q=${
          productName ?? query
        }`;
      }

      return `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`;
    };

    const response = await fetch(fetchUrl());
    const data = await response.json();
    set({ productsList: data?.products, totalProducts: data?.total });
  },
}));

export default useProductsStore;
