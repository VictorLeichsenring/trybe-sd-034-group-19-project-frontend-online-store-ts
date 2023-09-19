import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { productId }: any = useParams();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
      const data = await response.json();
      setProduct(data);
    };
    fetchCategoryProducts();
  }, [productId]);
  console.log(product);
  return (
    <div>
      <h1
        data-testid="product-detail-name"
      >
        { product.title }
      </h1>
      <img
        data-testid="product-detail-image"
        src={ product.thumbnail }
        alt={ product.title }
      />
      <p data-testid="product-detail-price">
        {`Preço: ${product.price}`}
      </p>
    </div>
  );
}
// MLB3031276468
// tenis
// https://api.mercadolibre.com/items/MLB3031276468
