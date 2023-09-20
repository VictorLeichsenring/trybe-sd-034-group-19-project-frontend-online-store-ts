import { useEffect, useState } from 'react';

function Checkout() {
  const [pedido, setPedido] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('addProducts');
    if (savedCart) {
      setPedido(JSON.parse(savedCart));
    }
  }, []);

  return (
    <div>
      <h3>Finalizar Pedido</h3>
      {pedido.map((product, index) => (
        <div key={ index }>
          <p data-testid="shopping-cart-product-name">{product.title}</p>
          <p>
            Preço: R$
            {' '}
            {product.price.toFixed(2)}
          </p>
          <p data-testid="shopping-cart-product-quantity">
            {product.quantity}
          </p>
        </div>
      ))}

      <p>Meus Dados:</p>
      <form>
        <input type="text" placeholder="Nome Completo" data-testid="checkout-fullname" />
        <input type="email" placeholder="Email" data-testid="checkout-email" />
        <input type="text" placeholder="CPF" data-testid="checkout-cpf" />
        <input type="text" placeholder="Celular" data-testid="checkout-phone" />
        <p>Endereço:</p>
        <input type="text" placeholder="CEP" data-testid="checkout-cep" />
        <input type="text" placeholder="Endereço:" data-testid="checkout-address" />
        <input type="text" placeholder="Número" />
        <input type="text" placeholder="Bairro" />
        <input type="text" placeholder="Cidade" />
        <div>
          <p>Forma de pagamento</p>
          <label>
            <input type="radio" name="payment" data-testid="ticket-payment" />
            Boleto
          </label>
          <br />
          <label>
            <input type="radio" name="payment" data-testid="visa-payment" />
            Visa
          </label>
          <br />
          <label>
            <input type="radio" name="payment" data-testid="master-payment" />
            MasterCard
          </label>
          <br />
          <label>
            <input type="radio" name="payment" data-testid="elo-payment" />
            Elo
          </label>
        </div>
      </form>
      <button
        type="submit"
        data-testid="checkout-btn"
      >
        Finalizar Compra

      </button>
    </div>
  );
}
export default Checkout;
