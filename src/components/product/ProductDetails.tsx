import { useEffect } from 'react';
import useFetchStore from '../../store/useFetchStore';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { productDetails, fetchProductDetails } = useFetchStore();
  const { id } = useParams();

  const productId = Number(id);

  useEffect(() => {
    fetchProductDetails(productId);
  }, [fetchProductDetails, productId]);

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid justify-items-start">
      <div className="">
        <p className="text-left ml-4 mt-8">{productDetails?.brand}</p>
        <h2 className="text-2xl font-medium ml-2">{productDetails?.title}</h2>
      </div>
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
