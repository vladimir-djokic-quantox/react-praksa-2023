import useCartStore from '../../store/useCartStore';
import CartProduct from '../../types/CartProduct';
import Product from '../../types/Product';
import ProductCard from '../product/ProductCard';

function CartList() {
  const { userCart, removeItemFromCart } = useCartStore();

  const handleAction = (action: string, product: CartProduct | Product) => {
    switch (action) {
      case 'remove':
        removeItemFromCart(product.id);
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
