import imagens from '../imagens/carrinho-vazio.png';

export default function Cart() {
  return (
    <div>
      <img src={ imagens } alt="Carrinho de compras" />
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    </div>
  );
}
