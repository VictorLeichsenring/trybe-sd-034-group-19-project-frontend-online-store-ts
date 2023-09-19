import { useEffect, useState } from 'react';
import imagens from '../imagens/carrinho-vazio.png';
import { Product } from './types';

export default function Cart() {
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [carrinho, setCarrinho] = useState([]);
  const [quantidade, setQuantidade] = useState(1);

  // Função para incrementar
  function increment() {
    setQuantidade(quantidade + 1);
  }

  // Função para decrementar
  function decrement() {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  }

  // Função para remover produtos
  function handleRemove(index: number) {
    const novosServicos = [...cartProducts];
    novosServicos.splice(index, 1);
    setCartProducts(novosServicos);
  }

  // Pegar os produtos do localStorage ao carregar a página
  useEffect(() => {
    const savedCart = localStorage.getItem('addProducts');
    if (savedCart) {
      setCartProducts(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Atualizar o localStorage sempre que o carrinho for modificado
    localStorage.setItem('addProducts', JSON.stringify(cartProducts));
  }, [cartProducts]);

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
              <button
                data-testid="product-decrease-quantity"
                onClick={ decrement }
              >
                -

              </button>
              <p data-testid="shopping-cart-product-quantity">
                {quantidade}
              </p>
              <button
                data-testid="product-increase-quantity"
                onClick={ increment }
              >
                +

              </button>
              <button
                data-testid="remove-product"
                onClick={ () => handleRemove(index) }
              >
                X

              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
