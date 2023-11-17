import useFetchStore from '../../store/useFetchStore';

function ProductDetails() {
  const { productDetails } = useFetchStore();

  return (
    <div>
      <div className="grid justify-items-start">
        <p>Naslov: {productDetails?.title}</p>
        <p>Opis: {productDetails?.description}</p>
        <p>Cena: {productDetails?.price}</p>
        <p>Popust: {productDetails?.discountPercentage}</p>
        <p>Ocena: {productDetails?.rating}</p>
        <p>Zalihe: {productDetails?.stock}</p>
        <p>Brend: {productDetails?.brand}</p>
        <p>Katgorija: {productDetails?.category}</p>
      </div>
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
