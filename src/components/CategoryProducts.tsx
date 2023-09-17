import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default function CategoryProducts() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);

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
            <p>{product.title}</p>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
