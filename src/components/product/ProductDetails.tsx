import useProductsStore from '../../store/useProductsStore';

function ProductDetails() {
  const { productsList } = useProductsStore();
  const productDetails = productsList[0];

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid justify-items-start">
      <p className="text-left ml-4 mt-8">{productDetails?.brand}</p>
      <h2 className="text-2xl font-medium ml-2">{productDetails?.title}</h2>
      <p>{productDetails?.description}</p>
      <p>Cena: {productDetails?.price}</p>
      <p>Popust: {productDetails?.discountPercentage}</p>
      <p>Ocena: {productDetails?.rating}</p>
      <p>Zalihe: {productDetails?.stock}</p>

      <p>Katgorija: {productDetails?.category}</p>

      {productDetails?.images && (
        <div className="grid grid-cols-4 gap-4 justify-items-end">
          {productDetails.images.map((image, index) => (
            <img
              className="object-scale-down h-48 w-96"
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
