import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from './types';

export default function ProductDetails() {
  const { productId }: any = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
      const data = await response.json();
      setProduct(data);
    };
    fetchCategoryProducts();
  }, [productId]);

  if (!product) return null;

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
