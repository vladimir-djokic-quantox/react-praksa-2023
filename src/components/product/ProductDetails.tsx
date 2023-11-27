import useFetchStore from '../../store/useFetchStore';

function ProductDetails() {
  const { productDetails } = useFetchStore();
  const productInfo = productDetails[0];

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid justify-items-start">
      <p className="text-left ml-4 mt-8">{productInfo?.brand}</p>
      <h2 className="text-2xl font-medium ml-2">{productInfo?.title}</h2>
      <p>{productInfo?.description}</p>
      <p>Cena: {productInfo?.price}</p>
      <p>Popust: {productInfo?.discountPercentage}</p>
      <p>Ocena: {productInfo?.rating}</p>
      <p>Zalihe: {productInfo?.stock}</p>

      <p>Katgorija: {productInfo?.category}</p>

      {productInfo?.images && (
        <div className="grid grid-cols-4 gap-4 justify-items-end">
          {productInfo.images.map((image, index) => (
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
