import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';
import BtnCarrinho from './BtnCarrinho';
import { Product } from './types';

export default function CategoryProducts() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const data = await getProductsFromCategoryAndQuery(categoryId, '');
      setProducts(data.results);
    };

    fetchCategoryProducts();
  }, [categoryId]);

  return (
    <div>
      <h1>Produtos da Categoria</h1>
      <ul>
        {products.map((product) => (
          <li key={ product.id } data-testid="product">
            <img src={ product.thumbnail } alt={ product.title } />
            <Link
              to={ `/product/${product.id}` }
              data-testid="product-detail-link"
            >
              <p>{product.title}</p>
            </Link>
            <p>{product.price}</p>
            <BtnCarrinho
              product={ product }
              data-testid="product-add-to-cart"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
