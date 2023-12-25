import create from 'zustand';
import Product from '../types/Product';
import {
  PRODUCT_BASE_URL,
  PRODUCT_CATEGORIES_URL,
  PRODUCT_CATEGORY_URL,
  PRODUCT_SEARCH_URL,
} from '../constants';

type GetProductsOptions = {
  currentPage?: number;
  query?: string;
  category?: string;
  productName?: string;
};

type ProductData = {
  pageSize: number;
  productsList: Product[];
  totalProducts: number;
  categories: string[];
  getProducts: (options?: GetProductsOptions) => Promise<void>;
  fetchCategories: () => Promise<void>;
};

const useProductsStore = create<ProductData>((set, get) => ({
  pageSize: 28,
  productsList: [],
  totalProducts: 0,
  categories: [],
  getProducts: async (options?: GetProductsOptions) => {
    const page = options?.currentPage ?? 1;
    const query = options?.query ?? '';
    const category = options?.category ?? '';
    const productName = options?.productName ?? '';
    const skip = (page - 1) * get().pageSize;

    const fetchUrl = () => {
      if (category) {
        return `${PRODUCT_CATEGORY_URL}/${category}`;
      }

      if (productName || query) {
        return `${PRODUCT_SEARCH_URL}${productName ?? query}`;
      }

      return `${PRODUCT_BASE_URL}?limit=${get().pageSize}&skip=${skip}`;
    };

    const response = await fetch(fetchUrl());
    const data = await response.json();
    set({ productsList: data?.products, totalProducts: data?.total });
  },
  fetchCategories: async () => {
    const response = await fetch(`${PRODUCT_CATEGORIES_URL}`);
    const data = await response.json();
    set({ categories: data });
  },
}));

export default useProductsStore;
