import useFetchStore from '../store/useFetchStore';

function ProductCard() {
  const { productsList } = useFetchStore();
  return (
    <div className="grid grid-cols-1 mx-4 justify-items-center  my-4 sm:grid-cols-2 first-letter: md:grid-cols-3 lg:grid-cols-4 gap-4">
      {productsList.map((product) => (
        <div
          key={product.id}
          className="grid  justify-items-center w-80 h-96 text-center mx-3 my-3 bg-gray-900 shadow-xl rounded-md"
        >
          <h2 className="text-xl font-semibold underline my-2 mx-2">
            {product.title}
          </h2>
          <p>Price: {product?.price}$</p>
          <p className="text-red-600">
            Discount: {product?.discountPercentage}%
          </p>
          <p>Rating: {product?.rating}</p>
          <p>Stock: {product?.stock}</p>
          <p>Brand: {product?.brand}</p>
          <p>Category: {product?.category}</p>
          <img
            src={product?.thumbnail}
            alt={product?.title}
            className="rounded-md h-24 w-48 inset-x-0 bottom-0 my-4 mx-4"
          />
        </div>
      ))}
    </div>
  );
}

export default ProductCard;
