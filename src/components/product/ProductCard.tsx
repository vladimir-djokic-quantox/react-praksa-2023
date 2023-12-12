import CartProduct from '../../types/CartProduct';
import Product from '../../types/Product';
import Button from '../ui/Button';
import { isProduct, isCartProduct } from '../../guards';

type ProductCardProps = {
  product: CartProduct | Product;
  onAction: (action: string, productId: number, productName: string) => void;
};

function ProductCard({ product, onAction }: ProductCardProps) {
  const handleButtonClick = (action: string) => {
    onAction(action, product.id, product.title);
  };

  const renderProductInfo = (product: Product) => (
    <>
      <p>Rating: {product.rating}</p>
      <p>Stock: {product.stock}</p>
      <p>Brand: {product.brand}</p>
      <p>Category: {product.category}</p>
      <div className="mt-2 grid grid-cols-2">
        <div className="mr-2">
          <Button onClick={() => handleButtonClick('details')}>Details</Button>
        </div>
        <div>
          <Button onClick={() => handleButtonClick('addtocart')}>
            Add to Cart
          </Button>
        </div>
      </div>
    </>
  );

  const renderCartProductInfo = (product: CartProduct) => (
    <>
      <p>Quantity: {product.quantity}</p>
      <p>Total: {product.total}</p>
      <p>Price with discount: {product.discountedPrice}</p>
      <Button onClick={() => handleButtonClick('remove')}>Remove</Button>
    </>
  );

  return (
    <div className="grid justify-items-center w-80 h-96 text-center mx-3 my-3 bg-gray-900 shadow-xl rounded-md">
      <h2 className="text-xl font-semibold underline my-2 mx-2">
        {product.title}
      </h2>
      <p>Price: {product.price}$</p>
      <p className="text-red-600">Discount: {product.discountPercentage}%</p>
      {isProduct(product) && renderProductInfo(product)}
      {isCartProduct(product) && renderCartProductInfo(product)}
      <img
        src={product.thumbnail}
        alt={product.title}
        className="rounded-md h-24 w-48 inset-x-0 bottom-0 mb-4"
      />
    </div>
  );
}

export default ProductCard;
