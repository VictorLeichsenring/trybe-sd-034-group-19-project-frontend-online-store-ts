import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Checkout() {
  const navigate = useNavigate();
  const [pedido, setPedido] = useState([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [dataForm, setDataForm] = useState({
    nomeCompleto: '',
    email: '',
    cpf: '',
    telefone: '',
    cep: '',
    endereco: '',
  // metodoPagamento:
  });
  useEffect(() => {
    const savedCart = localStorage.getItem('addProducts');
    if (savedCart) {
      setPedido(JSON.parse(savedCart));
    }
  }, []);

  const validateForm = () => {
    const { nomeCompleto, email, cep, cpf, endereco, telefone } = dataForm;
    const isName = nomeCompleto !== '';
    const isEmail = email !== '';
    const isCep = cep !== '';
    const isCpf = cpf !== '';
    const isEndereco = endereco !== '';
    const isTelefone = telefone !== '';
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    localStorage.setItem('addProducts', JSON.stringify([]));
    validateForm(); // Certifique-se de chamar a função de validação aqui, se for necessário
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (validateForm()) {
  //     console.log('Formulário submetido com sucesso!');
  //     // setPedido([]);
  //     // console.log('O formulário foi submetido com sucesso!'); // Adicionando o alerta
  //     // // Adicione aqui o redirecionamento para a tela principal
  //   } else {
  //     console.log('Por favor, preencha todos os campos obrigatórios.');
  //   }
  // };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/');
    setDataForm(dataForm);
  };

  const isAnyFieldEmpty = () => {
    const values = Object.values(dataForm);
    return values.every((value) => value === '') && selectedOption !== null;
  };

  const handleConcluirClick = () => {
    setButtonClicked(true);
  };

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
      <form
        onSubmit={ handleSubmit }
      >
        <input
          type="text"
          placeholder="Nome Completo"
          data-testid="checkout-fullname"
          value={ dataForm.nomeCompleto }
          name="nomeCompleto"
          onChange={ handleInputChange }
          required
        />
        <input
          type="email"
          placeholder="Email"
          data-testid="checkout-email"
          value={ dataForm.email }
          name="email"
          onChange={ handleInputChange }
          required
        />
        <input
          type="text"
          placeholder="CPF"
          data-testid="checkout-cpf"
          value={ dataForm.cpf }
          name="cpf"
          onChange={ handleInputChange }
          required
        />
        <input
          type="text"
          placeholder="Celular"
          data-testid="checkout-phone"
          value={ dataForm.telefone }
          name="telefone"
          onChange={ handleInputChange }
          required
        />
        <p>Endereço:</p>
        <input
          type="text"
          placeholder="CEP"
          data-testid="checkout-cep"
          value={ dataForm.cep }
          name="cep"
          onChange={ handleInputChange }
          required
        />
        <input
          type="text"
          placeholder="Endereço:"
          data-testid="checkout-address"
          value={ dataForm.endereco }
          name="endereco"
          onChange={ handleInputChange }
          required
        />
        <div>
          <p>Forma de pagamento</p>
          <label>
            <input
              required
              type="radio"
              name="payment"
              data-testid="ticket-payment"
              value="opcao1"
              checked={ selectedOption === 'opcao1' }
              onChange={ () => setSelectedOption('opcao1') }
            />
            Boleto
          </label>
          <br />
          <label>
            <input
              required
              type="radio"
              value="opcao2"
              name="payment"
              checked={ selectedOption === 'opcao2' }
              data-testid="visa-payment"
              onChange={ () => setSelectedOption('opcao2') }
            />
            Visa
          </label>
          <br />
          <label>
            <input
              required
              type="radio"
              value="opcao3"
              name="payment"
              checked={ selectedOption === 'opcao3' }
              data-testid="master-payment"
              onChange={ () => setSelectedOption('opcao3') }
            />
            MasterCard
          </label>
          <br />
          <label>
            <input
              required
              type="radio"
              value="opcao4"
              name="payment"
              checked={ selectedOption === 'opcao4' }
              data-testid="elo-payment"
              onChange={ () => setSelectedOption('opcao4') }
            />
            Elo
          </label>
        </div>
        <button
          type="submit"
          data-testid="checkout-btn"
          // disabled={ !selectedOption || isAnyFieldEmpty() }
          onClick={ handleConcluirClick }
        >
          Finalizar Compra
        </button>
        {
        buttonClicked
        && !isAnyFieldEmpty()
        && <div data-testid="error-msg">Campos inválidos</div>
        }
      </form>
    </div>
  );
}
export default Checkout;
