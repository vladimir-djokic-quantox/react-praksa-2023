import CartProduct from './types/CartProduct';
import Product from './types/Product';

export const isProduct = (
  product: CartProduct | Product
): product is Product => {
  return 'rating' in product;
};

export const isCartProduct = (
  product: CartProduct | Product
): product is CartProduct => {
  return 'quantity' in product;
};
