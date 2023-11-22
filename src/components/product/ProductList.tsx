import { useEffect, useState } from 'react';
import useFetchStore from '../../store/useFetchStore';
import Pagination from '../layout/Pagination';
import ProductCard from './ProductCard';
import ProductSearch from './ProductSearch';
import useCartStore from '../../store/useCartStore';
import { useNavigate, useParams } from 'react-router-dom';

function ProductList() {
  const { query = '' } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { totalProducts, productsList, fetchProducts, fetchProductDetails } =
    useFetchStore();
  const { addItemToCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(currentPage, query || '');
  }, [fetchProducts, currentPage, query]);

  const productsPerPage = 28;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProducts(currentPage, query);
  };

  const handleAction = (action: string, productId: number) => {
    switch (action) {
      case 'details':
        fetchProductDetails(productId);
        navigate(`/products/details/${productId}`);
        break;
      case 'addtocart':
        addItemToCart(productId);
        break;
      default:
        console.log('Unknown action');
    }
  };

  return (
    <div className="grid  justify-items-center ">
      <ProductSearch currPage={currentPage} />
      <div className="grid grid-cols-1  justify-items-center m-12 sm:grid-cols-2 first-letter: md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productsList.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAction={handleAction}
          />
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
