import React, { useState, useEffect } from 'react';
import { getCategories } from '../services/api';
import './Categories.css';

export default function Categories() {
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategorias(data);
    };
    fetchCategories();
  }, []);
  return (
    <div
      className="categories-container"
    >
      <div
        className="sidebar"
      >
        <h1>Categorias</h1>
        <ul
          className="category-list"
        >
          {categorias.map((categoria) => (
            <li
              key={ categoria.id }
              data-testid="category"
              className="category-item"
            >
              <button>{categoria.name}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
