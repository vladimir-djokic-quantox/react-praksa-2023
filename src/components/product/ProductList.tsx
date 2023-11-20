import { useEffect, useState } from 'react';
import useFetchStore from '../../store/useFetchStore';
import Pagination from '../layout/Pagination';
import ProductCard from './ProductCard';
import ProductSearch from './ProductSearch';
import useLogStore from '../../store/useLogStore';
import useCartStore from '../../store/useCartStore';
import { useNavigate } from 'react-router-dom';
import CartProduct from '../../types/CartProduct';
import Product from '../../types/Product';

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { totalProducts, productsList, fetchProducts, fetchProductDetails } =
    useFetchStore();
  const { fetchUserCartData, addItemToCart } = useCartStore();
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

  const handleAction = (action: string, product: CartProduct | Product) => {
    switch (action) {
      case 'details':
        fetchProductDetails(product.id);
        navigate(`/details/${product.id}`);
        break;
      case 'addtocart':
        if ('quantity' in product) {
          addItemToCart(product);
        } else {
          console.log('Invalid product type for "addtocart" action');
        }
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
