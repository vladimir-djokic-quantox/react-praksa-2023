import useCartStore from '../../store/useCartStore';
import ProductCard from '../ProductCard';

function CartList() {
  const { userCart } = useCartStore();

  return (
    <div className="grid grid-cols-1  justify-items-center m-12 sm:grid-cols-2 first-letter: md:grid-cols-3 lg:grid-cols-4 gap-4">
      {userCart?.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default CartList;
