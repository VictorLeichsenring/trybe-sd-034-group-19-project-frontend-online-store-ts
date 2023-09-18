import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BtnCarrinho({ product }) {
  const [addProducts, setAddProducts] = useState([]);

  const navigate = useNavigate();

  function AddCard(product) {
    const updatedCart = [...addProducts, product];
    setAddProducts(updatedCart);

    // adicionando no local storage
    localStorage.setItem('addProducts', JSON.stringify(updatedCart));

    navigate('/cart');
  }

  // pegando do logal storage ao regarregar
  useEffect(() => {
    const savedCart = localStorage.getItem('addProducts');
    if (savedCart) {
      setAddProducts(JSON.parse(savedCart));
    }
  }, []);

  return (
    <button
      data-testid="product-add-to-cart"
      onClick={ () => AddCard(product) }
    >
      Adicionar ao Carrinho
    </button>
  );
}
export default BtnCarrinho;
