import useFetchStore from '../../store/useFetchStore';

function ProductDetails() {
  const { productDetails } = useFetchStore();
  return (
    <div>
      <p>Naslov: {productDetails?.title}</p>
      <p>Opis: {productDetails?.description}</p>
      <p>Cena: {productDetails?.price}</p>
      <p>Popust: {productDetails?.discountPercentage}</p>
      <p>Ocena: {productDetails?.rating}</p>
      <p>Zalihe: {productDetails?.stock}</p>
      <p>Brend: {productDetails?.brand}</p>
      <p>Katgorija: {productDetails?.category}</p>
      <p>Slike...</p>
    </div>
  );
}

export default ProductDetails;
