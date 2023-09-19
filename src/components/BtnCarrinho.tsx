import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BtnCarrinho({ product }: any) {
  const [addProducts, setAddProducts] = useState<any[]>([]);

  const navigate = useNavigate();

  function AddCard() {
    // const updatedCart = [...addProducts, product];
    // setAddProducts(updatedCart as any);

    // // adicionando no local storage
    // localStorage.setItem('addProducts', JSON.stringify(updatedCart));

    // navigate('/cart');
    // Recuperar o carrinho atual do localStorage
    const currentCart = JSON.parse(localStorage.getItem('addProducts') || '[]');

    // Adicionar o novo produto ao carrinho
    const updatedCart = [...currentCart, product];

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('addProducts', JSON.stringify(updatedCart));

    // Atualizar o estado local (opcional, já que estamos usando o localStorage como fonte única de verdade)
    setAddProducts(updatedCart);
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
      onClick={ () => AddCard() }
    >
      Adicionar ao Carrinho
    </button>
  );
}
export default BtnCarrinho;
