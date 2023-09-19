import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, CartProduct } from './types';

export default function ProductDetails() {
  const { productId }: any = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  const addToCart = (selectedProduct: Product) => {
    // Recuperar o carrinho atual do localStorage
    const currentCart = localStorage.getItem('addProducts');

    // Se não houver carrinho no localStorage, inicializamos um array vazio
    let updatedCart: CartProduct[] = [];

    // Se houver um carrinho, convertemos a string JSON do localStorage de volta para um array
    if (currentCart) {
      updatedCart = JSON.parse(currentCart);
    }

    // Verificar se o produto selecionado já existe no carrinho
    const existingProductIndex = updatedCart.findIndex(
      (p) => p.id === selectedProduct.id,
    );
    // Se o produto já existir no carrinho, incrementamos sua quantidade
    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      // Se o produto não existir no carrinho, adicionamos ele com quantidade 1
      updatedCart.push({ ...selectedProduct, quantity: 1 });
    }

    // Salvar o carrinho atualizado de volta no localStorage
    localStorage.setItem('addProducts', JSON.stringify(updatedCart));
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
      const data = await response.json();
      setProduct(data);
    };
    fetchCategoryProducts();
  }, [productId]);

  if (!product) return null;

  return (
    <div>
      <h1 data-testid="product-detail-name">
        { product.title }
      </h1>
      <img
        data-testid="product-detail-image"
        src={ product.thumbnail }
        alt={ product.title }
      />
      <p data-testid="product-detail-price">
        {`Preço: ${product.price}`}
      </p>
      <button
        data-testid="product-detail-add-to-cart"
        onClick={ () => addToCart(product) }
      >
        Adicionar ao Carrinho
      </button>
    </div>
  );
}
