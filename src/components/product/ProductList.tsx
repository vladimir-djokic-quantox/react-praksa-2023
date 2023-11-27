import { useEffect, useState } from 'react';
import useProductsStore from '../../store/useProductsStore';
import useSessionStore from '../../store/useSessionStore';
import Pagination from '../layout/Pagination';
import ProductCard from './ProductCard';
import ProductSearch from './ProductSearch';
import { useNavigate, useParams } from 'react-router-dom';

function ProductList() {
  const { query = '', category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { totalProducts, productsList, fetchProducts } = useProductsStore();
  const { addItemToCart } = useSessionStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts({ currentPage, query, category });
  }, [fetchProducts, currentPage, query, category]);

  const productsPerPage = 28;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProducts({ currentPage, query, category });
  };

  const handleAction = (
    action: string,
    productId: number,
    productName: string
  ) => {
    switch (action) {
      case 'details':
        fetchProducts({ productName });
        navigate(`/products/details/${productName}`);
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
      <ProductSearch />
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
