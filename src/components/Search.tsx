import React, { useState } from 'react';
import Categories from './Categories';
import BtnCarrinho from './BtnCarrinho';

export default function Search() {
  const [termo, setTermo] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  function hangleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setTermo(value);
  }

  async function searchCategories() {
    try {
      const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=&q=${termo}`);
      const data = await response.json();

      if (data.results.length === 0) {
        setNoResults(true);
        setSearchResults([]);
      } else {
        setNoResults(false);
        setSearchResults(data.results);
      }
    } catch (error) {
      console.error('Erro na busca:', error);
    }
  }

  return (
    <div>
      <input
        type="text"
        name=""
        value={ termo }
        id="pesquisa"
        data-testid="query-input"
        onChange={ hangleChange }
      />
      <button
        data-testid="query-button"
        onClick={ searchCategories }
      >
        Pesquisar
      </button>
      <h2 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h2>
      {noResults ? (
        <p>Nenhum produto foi encontrado.</p>
      ) : (
        <ul>
          {searchResults.map((product) => (
            <li key={ product.id } data-testid="product">
              <h2>{product.title}</h2>
              <img src={ product.thumbnail } alt={ product.title } />
              <p>
                Preço: R$
                {' '}
                {product.price.toFixed(2)}
              </p>
              <BtnCarrinho product={ product } />
            </li>
          ))}
        </ul>
      )}

      <Categories />

    </div>
  );
}
