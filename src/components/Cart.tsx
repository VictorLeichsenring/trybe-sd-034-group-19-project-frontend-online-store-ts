import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imagens from '../imagens/carrinho-vazio.png';
import { CartProduct } from './types';

export default function Cart() {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  // const [quantidade, setQuantidade] = useState(1);
  const navigate = useNavigate();

  // Função para incrementar
  function increment(index: number) {
    const updatedCart = [...cartProducts];
    updatedCart[index].quantity += 1;
    setCartProducts(updatedCart);
  }

  // Função para decrementar
  function decrement(index: number) {
    const updatedCart = [...cartProducts];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartProducts(updatedCart);
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
                onClick={ () => decrement(index) }
              >
                -

              </button>
              <p data-testid="shopping-cart-product-quantity">
                {product.quantity}
              </p>
              <button
                data-testid="product-increase-quantity"
                onClick={ () => increment(index) }
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
          <button
            data-testid="checkout-products"
            onClick={ () => navigate('/checkout') }
          >
            Finalizar
          </button>
        </ul>
      )}
    </div>
  );
}
