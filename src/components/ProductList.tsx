import { useEffect, useState } from 'react';
import useFetchStore from '../store/useFetchStore';
import Pagination from './Pagination';
import ProductLook from './ProductCard';

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { totalProducts, fetchProducts } = useFetchStore();

  useEffect(() => {
    fetchProducts(currentPage);
  }, [fetchProducts, currentPage]);

  const productsPerPage = 28;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProducts(currentPage);
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
