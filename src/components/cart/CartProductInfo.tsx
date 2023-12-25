import React from 'react';
import Button from '../ui/Button';
import CartProduct from '../../types/CartProduct';

type CartProductInfoProps = {
  cartProduct: CartProduct;
  onButtonClick: (action: string) => void;
};

const CartProductInfo: React.FC<CartProductInfoProps> = ({
  cartProduct,
  onButtonClick,
}) => (
  <>
    <p>Quantity: {cartProduct.quantity}</p>
    <p>Total: {cartProduct.total}</p>
    <p>Price with discount: {cartProduct.discountedPrice}</p>
    <Button onClick={() => onButtonClick('remove')}>Remove</Button>
  </>
);

export default CartProductInfo;
