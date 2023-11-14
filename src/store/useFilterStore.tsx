import create from 'zustand';

type FilterData = {
  categoryList: string[];
  fetchCategories: () => Promise<void>;
};

const useFilterStore = create<FilterData>((set) => ({
  categoryList: [],
  fetchCategories: async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    const data = await response.json();
    set({ categoryList: data });
  },
}));

export default useFilterStore;
