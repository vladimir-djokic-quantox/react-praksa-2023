import { useEffect, useState } from 'react';
import useFetchStore from '../../store/useFetchStore';
import Pagination from '../layout/Pagination';
import ProductCard from './ProductCard';
import ProductSearch from './ProductSearch';
import useLogStore from '../../store/useLogStore';
import useCartStore from '../../store/useCartStore';
import { useNavigate } from 'react-router-dom';

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { totalProducts, productsList, fetchProducts, fetchProductDetails } =
    useFetchStore();
  const { fetchUserCartData } = useCartStore();
  const { userData } = useLogStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts(currentPage);
    if (userData) fetchUserCartData(userData?.id);
  }, [fetchProducts, currentPage, fetchUserCartData, userData]);

  const productsPerPage = 28;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProducts(currentPage);
  };

  const handleAction = (action: string, id: number) => {
    switch (action) {
      case 'details':
        console.log(id);
        fetchProductDetails(id);
        navigate('/details');
        break;
      case 'addtocart':
        console.log('Action 2 executed');
        // Perform action for button 2
        break;
      case 'remove':
        console.log('Action 3 executed');
        // Perform action for button 3
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
