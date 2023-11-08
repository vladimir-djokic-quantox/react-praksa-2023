import { useEffect, useState } from 'react';
import useFetchStore from '../store/useFetchStore';
import Pagination from './Pagination';
import ProductCard from './ProductCard';

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { totalProducts, productsList, fetchProducts } = useFetchStore();

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
      <div className="grid grid-cols-1  justify-items-center m-12 sm:grid-cols-2 first-letter: md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productsList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ProductList;
