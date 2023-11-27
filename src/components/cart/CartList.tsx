import { useEffect } from 'react';
import useSessionStore from '../../store/useSessionStore';
import ProductCard from '../product/ProductCard';

function CartList() {
  const { userCart, fetchUserCartData, removeItemFromCart, userData } =
    useSessionStore();

  useEffect(() => {
    if (userData && !userCart) {
      fetchUserCartData(userData.id);
    }
  }, [fetchUserCartData, userData, userCart]);

  const handleAction = (action: string, productId: number) => {
    switch (action) {
      case 'remove':
        removeItemFromCart(productId);
        break;
      default:
        console.log('Unknown action');
    }
  };

  return (
    <div className="grid grid-cols-1  justify-items-center m-12 sm:grid-cols-2 first-letter: md:grid-cols-3 lg:grid-cols-4 gap-4">
      {userCart?.products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAction={handleAction}
        />
      ))}
    </div>
  );
}

export default CartList;
