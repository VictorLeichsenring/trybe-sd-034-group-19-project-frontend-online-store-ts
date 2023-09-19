import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getCategories } from '../services/api';
import './Categories.css';
import { Categoria } from './types';

export default function Categories() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
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
            <li key={ categoria.id }>
              <Link to={ `/category/${categoria.id}` } data-testid="category">
                {categoria.name}
              </Link>
            </li>

          ))}
        </ul>
      </div>
    </div>
  );
}
