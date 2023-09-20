import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Search from './components/Search';
import Layout from './components/Layout';
import Cart from './components/Cart';
import CategoryProducts from './components/CategoryProducts';
import ProductDetails from './components/ProductDetails';

export default function App() {
  return (
    <div className="App">
      <NavLink data-testid="shopping-cart-button" to="/cart">Carrinho</NavLink>
      <Routes>
        <Route
          path="/"
          element={
            <Search />
          }
        />
        <Route element={ <Layout /> }>
          <Route path="/cart" element={ <Cart /> } />
          <Route path="/category/:categoryId" element={ <CategoryProducts /> } />
          <Route
            path="/product/:productId"
            element={
              <ProductDetails data-testid="product-detail-link" />
            }
          />

        </Route>
      </Routes>
    </div>
  );
}
