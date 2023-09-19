import { useEffect, useState } from 'react';
import imagens from '../imagens/carrinho-vazio.png';
import { Product } from './types';

export default function Cart() {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  // Pegar os produtos do localStorage ao carregar a página
  useEffect(() => {
    const savedCart = localStorage.getItem('addProducts');
    if (savedCart) {
      setCartProducts(JSON.parse(savedCart));
    }
  }, []);

  return (
    <div>
      <h2>Seu carrinho de compras</h2>
      {cartProducts.length === 0 ? (
        <div>
          <img src={ imagens } alt="Carrinho de compras" />
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        </div>
      ) : (
        <ul>
          {cartProducts.map((product, index) => (
            <li key={ index }>
              <p data-testid="shopping-cart-product-name">{product.title}</p>
              <p>
                Preço: R$
                {' '}
                {product.price.toFixed(2)}
              </p>
              <p data-testid="shopping-cart-product-quantity">
                Quantidade: 1
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
