import { useEffect, useState } from 'react';

function BtnCarrinho({ product }: any) {
  const [addProducts, setAddProducts] = useState<any[]>([]);

  function AddCard() {
    // const updatedCart = [...addProducts, product];
    // setAddProducts(updatedCart as any);

    // // adicionando no local storage
    // localStorage.setItem('addProducts', JSON.stringify(updatedCart));

    // navigate('/cart');
    // Recuperar o carrinho atual do localStorage
    const currentCart = JSON.parse(localStorage.getItem('addProducts') || '[]');

    // Verificar se o produto já está no carrinho
    const existingProductIndex = currentCart.findIndex((p: any) => p.id === product.id);

    if (existingProductIndex !== -1) {
      // Se o produto já estiver no carrinho, apenas incrementar a quantidade
      currentCart[existingProductIndex].quantity += 1;
    } else {
      // Se o produto não estiver no carrinho, adicionar com quantidade 1
      const productWithQuantity = { ...product, quantity: 1 };
      currentCart.push(productWithQuantity);
    }

    // Salvar o carrinho atualizado no localStorage
    localStorage.setItem('addProducts', JSON.stringify(currentCart));

    // Atualizar o estado local
    setAddProducts(currentCart);
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
