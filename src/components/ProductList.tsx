import { useState } from 'react';
import useFetchStore from '../store/useFetchStore';
import Pagination from './Pagination';
import ProductLook from './ProductCard';
import useFetchData from '../hooks/useFetchData';

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { totalProducts } = useFetchStore();
  useFetchData();

  const productsPerPage = 28;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (!totalProducts) {
      <span>Loading...</span>;
    }
  };

  return (
    <div className="grid  justify-items-center">
      <ProductLook />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ProductList;
