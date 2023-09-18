import { useEffect, useState } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default function ProductDetails() {
  const { productId }: any = useState();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=&q=${productId}`);
      const data = await response.json();
      setProduct(data.results);
    };
    fetchCategoryProducts();
  }, [productId]);
  // console.log(product[0].id);
  return (
    <div data-testid="product-detail-link">
      <h1 data-testid="produc-detail-name">Product Name</h1>
      <img
        data-testid="product-detail-image"
        src={ product.thumbnail }
        alt={ product.title }
      />
      <p data-testid="product-detail-price">
        {`Preço: ${product.price}`}
      </p>
      <p data-testid="product-detail-name">
        { product.title }
      </p>
    </div>
  );
}
