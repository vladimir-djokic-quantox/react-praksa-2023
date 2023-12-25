import CartProduct from '../../types/CartProduct';
import Product from '../../types/Product';
import { isProduct, isCartProduct } from '../../guards';
import ProductInfo from './ProducntInfo';
import CartProductInfo from '../cart/CartProductInfo';

type ProductCardProps = {
  product: CartProduct | Product;
  onAction: (action: string, productId: number, productName: string) => void;
};

function ProductCard({ product, onAction }: ProductCardProps) {
  const handleButtonClick = (action: string) => {
    onAction(action, product.id, product.title);
  };

  return (
    <div className="grid justify-items-center w-80 h-96 text-center mx-3 my-3 bg-gray-900 shadow-xl rounded-md">
      <h2 className="text-xl font-semibold underline my-2 mx-2">
        {product.title}
      </h2>
      <p>Price: {product.price}$</p>
      <p className="text-red-600">Discount: {product.discountPercentage}%</p>
      {isProduct(product) && (
        <ProductInfo
          product={product as Product}
          onButtonClick={handleButtonClick}
        />
      )}
      {isCartProduct(product) && (
        <CartProductInfo
          cartProduct={product as CartProduct}
          onButtonClick={handleButtonClick}
        />
      )}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="rounded-md h-24 w-48 inset-x-0 bottom-0 mb-4"
      />
    </div>
  );
}

export default ProductCard;
