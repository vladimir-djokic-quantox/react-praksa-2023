import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '../../types/ProductDetails';

function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(
    null
  );

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data: ProductDetails) => setProductDetails(data))
      .catch((error) =>
        console.error('Error fetching product details:', error)
      );
  }, [id]);

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

      <p>Kategorija: {productDetails?.category}</p>

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
