import { useState, ChangeEvent, FormEvent } from 'react';
import useFetchStore from '../../store/useFetchStore';
import ProductFilter from './ProductFilter';
import { useNavigate } from 'react-router-dom';

type ProductSearchProps = {
  currPage: number;
};

function ProductSearch(props: ProductSearchProps) {
  const [input, setInput] = useState('');
  const { fetchProducts } = useFetchStore();
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetchProducts(props.currPage, input);
    navigate(`/search/${input}`);
  };

  return (
    <div className="mt-12 ">
      <form className="flex" onSubmit={handleSubmit}>
        <ProductFilter />
        <div className="relative w-full">
          <input
            type="search"
            onChange={handleInputChange}
            className="block p-2.5 w-60 z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search for a Product..."
            required
          />
          <button
            type="submit"
            className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductSearch;
