import React from 'react';
import Button from '../ui/Button';
import Product from '../../types/Product';

type ProductInfoProps = {
  product: Product;
  onButtonClick: (action: string) => void;
};

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  onButtonClick,
}) => (
  <>
    <p>Rating: {product.rating}</p>
    <p>Stock: {product.stock}</p>
    <p>Brand: {product.brand}</p>
    <p>Category: {product.category}</p>
    <div className="mt-2 grid grid-cols-2">
      <div className="mr-2">
        <Button onClick={() => onButtonClick('details')}>Details</Button>
      </div>
      <div>
        <Button onClick={() => onButtonClick('addtocart')}>Add to Cart</Button>
      </div>
    </div>
  </>
);

export default ProductInfo;
