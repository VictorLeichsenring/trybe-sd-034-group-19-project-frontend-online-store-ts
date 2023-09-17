import Categories from './Categories';

export default function Search() {
  return (
    <div>
      <input
        type="text"
        name=""
        id="pesquisa"
      />
      <h2 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h2>
      <Categories />
    </div>
  );
}
