import { useEffect, useState } from 'react';
import useFilterStore from '../../store/useFilterStore';
import useFetchStore from '../../store/useFetchStore';
import { useNavigate } from 'react-router-dom';

function ProductFilter() {
  const [hidden, setHidden] = useState(true);
  const { fetchCategories, categoryList } = useFilterStore();
  const { fetchProductCategory } = useFetchStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleFilterClick = () => {
    setHidden(!hidden);
  };

  return (
    <div className="relative">
      <button
        className="whitespace-nowrap flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        type="button"
        onClick={handleFilterClick}
      >
        All categories
      </button>

      <div
        className={`z-10 ${
          hidden ? 'hidden' : ''
        } absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
      >
        {categoryList.map((category, index) => (
          <button
            key={index}
            type="button"
            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => {
              fetchProductCategory(category);
              navigate(`/products/${category}`);
              setHidden(!hidden);
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
