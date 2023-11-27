import create from 'zustand';
import Product from '../types/Product';

const PAGE_SIZE = 28;

type FetchProductsOptions = {
  currentPage?: number;
  query?: string;
  category?: string;
  productName?: string;
};
type ProductData = {
  productsList: Product[];
  totalProducts: number;
  fetchProducts: (options?: FetchProductsOptions) => Promise<void>;
};

const useFetchStore = create<ProductData>((set) => ({
  productsList: [],
  totalProducts: 0,
  fetchProducts: async (options?: FetchProductsOptions) => {
    const page = options?.currentPage ?? 1;
    const query = options?.query ?? '';
    const category = options?.category ?? '';
    const productName = options?.productName ?? '';
    const skip = (page - 1) * PAGE_SIZE;

    const fetchUrl = category
      ? `https://dummyjson.com/products/category/${category}`
      : query
      ? `https://dummyjson.com/products/search?q=${query}`
      : productName
      ? `https://dummyjson.com/products/search?q=${productName}`
      : `https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`;

    const response = await fetch(fetchUrl);
    const data = await response.json();
    set({ productsList: data?.products, totalProducts: data?.total });
  },
}));

export default useFetchStore;
